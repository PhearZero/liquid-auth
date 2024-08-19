import {SignalClient} from "@algorandfoundation/liquid-client";
import { useEffect, useState } from "react";

const url = "liquid-auth.onrender.com"

const INITIAL = "Initializing 🚀"
const PEER_CONNECTED = "Peer connected 🎉"
const LINK_REQUEST = "Link Requested 🚚"
const WAITING = "Waiting for Link ⌛"
const LINKED = "Linked 🔗"
const CLOSED = "Closed 🚪"

export function QrCodeDemo(){
    const [client] = useState<SignalClient>(new SignalClient(url));
    const [requestId, setRequestId] = useState<string>(SignalClient.generateRequestId());
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [status, setStatus] = useState<string>(INITIAL);

    // @ts-expect-error, ignoring the private field
    client.qrCodeOptions.image = "/logo.png"

    useEffect(() => {
        setStatus(LINK_REQUEST)
        client.on("link-message", () => {
            setStatus(LINKED)
        })
        client.peer(requestId, "offer").then(() => {
            setStatus(PEER_CONNECTED)
        })
        client.qrCode().then((url) => {
            setQrCodeUrl(url);
            setStatus(WAITING)
        })
        return ()=>{
            client.close()
            setStatus(CLOSED)
        }
    }, [requestId]);

    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
        <h6>{status}</h6>
        {qrCodeUrl && PEER_CONNECTED &&
          <div className="relative max-w-80">
              <img
                alt="QR Code for Liquid Auth"
                className="absolute left-[40%] top-[40%] w-[4rem] h-auto m-0 rounded-full"
                src="/logo.png"
              />
              <img className="!mt-0" src={qrCodeUrl} alt="Algorand QRCode" />
          </div>
        }
        {status === PEER_CONNECTED && <button onClick={() => {
            setRequestId(SignalClient.generateRequestId())
        }}>Regenerate
        </button>}

    </div>
}
