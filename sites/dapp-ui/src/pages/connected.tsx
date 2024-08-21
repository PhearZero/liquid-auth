import { useEffect, useMemo, useState } from "react";
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import {
  // TODO: Migrate to algo-models
  encodeUnsignedTransaction,
  // TODO: Migrate to algo-fetch
  waitForConfirmation,
  // TODO: Migrate to algo-models
  makePaymentTxnWithSuggestedParamsFromObject,
} from 'algosdk';

import { RequestMessage, toSignTransactionsParamsRequestMessage, toBase64URL } from "@algorandfoundation/algo-models/provider";
import { SignalClient } from "@algorandfoundation/liquid-client";
import {
  attachSignedTransactionsFromResult,
  fromResult,
} from "@/lib/provider.js";

import { EmptyAccountCard } from '@/components/EmptyAccountCard.tsx';
import { ArcMessage } from "@/components/ArcMessage.tsx";

import { useDataChannel } from '@/hooks/useDataChannel.ts';
import { useAlgod } from '@/hooks/useAlgod.ts';
import { useAccountInfo } from '@/hooks/useAccountInfo.ts';

import {
  useAddressStore, useARC27MessageStore,
} from "@/store.ts";


export function ConnectedPage() {
  const navigate = useNavigate();

  // Algorand Specific State
  const algod = useAlgod();
  // TODO: migrate to Use-Wallet-Liquid
  const wallet = useAddressStore((state) => state.address);
  const [suggestedParams, setSuggestedParams] = useState<any | null>(null)

  // Account
  const accountInfo = useAccountInfo(wallet, 3000);

  // Payment Transaction Form
  const [from, setFrom] = useState<string>(wallet);
  const [to, setTo] = useState<string>(wallet);
  const [amount, setAmount] = useState<number>(0);
  const [count, setCount] = useState<number>(1);

  // Sending indicator
  const [progress, setProgress] = useState<number>(0);
  const [buffer, setBuffer] = useState<number>(0);

  // Message Store
  const addArcMessage = useARC27MessageStore((state) => state.addMessage);
  const arcMessages = useARC27MessageStore((state) => state.messages);
  const updateArcMessage = useARC27MessageStore((state) => state.updateMessage);

  // Receive response
  const datachannel = useDataChannel((event) => {
    async function handleMessage() {
      try{
        // Ignore JSON messages
        JSON.parse(event.data);
      } catch (e) {

        // Fetch ResultMessage from the encoded string
        let data = fromResult(event.data);
        // Add the incoming message
        addArcMessage({status: 'received', message: data})
        // Get matching request
        const matchingRequests = arcMessages.filter((msg) => msg.message.id === data.requestId)
        if(matchingRequests.length !== 1) throw new Error('Invalid request')
        const request = matchingRequests[0]
        updateArcMessage(request.message.id, 'received')

        // Get the transaction strings
        const msgTxns = (request.message as RequestMessage).params.txns

        // Attach the signatures
        let stxns = attachSignedTransactionsFromResult(wallet, data.result, msgTxns)
        updateArcMessage(request.message.id, 'signed');

        const confirmationPromises = await batchSignTransactions(stxns)
        updateArcMessage(request.message.id, 'submitted');
        await Promise.all(confirmationPromises)
        setProgress(0)
        setBuffer(0)
        updateArcMessage(request.message.id, 'confirmed');
      }

    }
    async function batchSignTransactions(stxns: Uint8Array[]) {
      let confirmationPromises = [];
      for (let i = 0; i < stxns.length; i++) {
        const { txId } = await algod.sendRawTransaction(stxns[i]).do();
        setBuffer((i+1)/stxns.length * 100)
        confirmationPromises.push(waitForConfirmation(algod, txId, 4).then(()=>{
          setProgress((i+1)/stxns.length * 100)
        }));
      }
      return confirmationPromises
    }
    handleMessage();
  });

  // Redirect when there is no datachannel or wallet
  useEffect(() => {
    if (!datachannel || wallet === '') navigate('/');
  }, [datachannel, wallet, navigate]);

  // Load Suggested Params
  useEffect(()=>{
    algod.getTransactionParams().do().then((params)=>{
      setSuggestedParams(params)
    });
  }, [])

  // Max Account Spend
  const maxSpend = useMemo(()=>{
    if(typeof accountInfo.data === 'undefined' || !suggestedParams) return 0;
    const txnCost = (amount + suggestedParams.minFee) * count;
    return Math.round(accountInfo.data.amount / txnCost)
  }, [count, accountInfo.data, suggestedParams])

  if (accountInfo.data && accountInfo.data.amount === 0) {
    return <EmptyAccountCard address={wallet} />;
  }
  return (
    <>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4">Send Payment Transaction</Typography>
        <FormControl sx={{ margin: 2 }}>
          <Typography gutterBottom>From</Typography>
          <Input
            id="from"
            aria-label="send from address"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ margin: 2 }}>
          <Typography gutterBottom>To</Typography>
          <Input
            id="to"
            aria-label="send to address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </FormControl>
        <Box sx={{ margin: 2 }}>
          <Typography gutterBottom sx={{ margin: '0px 0px 1em' }}>
            Amount (in microalgos)
          </Typography>
          <Slider
            valueLabelDisplay="on"
            defaultValue={0}
            max={maxSpend}
            aria-label="Amount"
            value={amount}
            onChange={(_, value) => setAmount(value as number)}
          />
        </Box>
        <Box sx={{ margin: 2 }}>
          <Typography gutterBottom sx={{ margin: '0px 0px 1em' }}>
            Amount of Transactions
          </Typography>
          <Slider
            valueLabelDisplay="on"
            defaultValue={1}
            min={1}
            max={750}
            aria-label="Transactions"
            value={count}
            onChange={(_, value) => setCount(value as number)}
          />
        </Box>
      </Box>

      <Button
        sx={{ float: 'right' }}
        variant="contained"
        disabled={!datachannel || accountInfo.isLoading}
        onClick={async () => {
          const suggestedParams = await algod.getTransactionParams().do();
          setSuggestedParams(suggestedParams)
          let txns= []
          const encoder = new TextEncoder();
          for(var i = 0; i < count; i++){
            txns.push(makePaymentTxnWithSuggestedParamsFromObject({
              from,
              suggestedParams,
              to,
              amount,
              note: encoder.encode(`Transaction ${i}`)
            }));
          }
          const messageId = SignalClient.generateRequestId()
          addArcMessage({
            status: "created",
            message: {
              id: messageId,
              reference: "arc0027:sign_transactions:request",
              params: {
                providerId: '02657eaf-be17-4efc-b0a4-19d654b2448e',
                txns: txns.map((txn) => ({txn: toBase64URL(encodeUnsignedTransaction(txn))}))
              }
            }
          })
          const encodedStr = toSignTransactionsParamsRequestMessage(messageId, '02657eaf-be17-4efc-b0a4-19d654b2448e', txns.map((txn) => ({txn: toBase64URL(encodeUnsignedTransaction(txn))})))
          datachannel?.send(encodedStr)
          updateArcMessage(messageId, 'sent')
        }}
      >
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary"/>
        Send Transactionz
      </Button>
      <Box><LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary"/></Box>
      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        ARC27 Messages
      </Typography>

        <Paper>
          {arcMessages.map((message, i) => (
            <ArcMessage key={i} {...message}/>
          ))}
        </Paper>
    </>
  );
}
