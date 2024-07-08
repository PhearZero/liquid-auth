---
title: 'Browser: Peer Answer'
---

The answer client is used to respond to a remote client's offer. The remote client will have sent an offer to the answer client, which will then respond with an answer. The answer client can then be used to communicate with the remote client.

## Request ID

```typescript
import { SignalClient } from '@algorandfoundation/liquid-client';
const requestId = SignalClient.generateRequestId();
```

## Peer Offer

```typescript
client
    .peer(requestId, 'offer')
    .then((dataChannel: RTCDataChannel)=>{
        // Handle the data channel
        dataChannel.onmessage = (event: MessageEvent) => {
            console.log(event.data)
        }
    })
const blob = await client.qrCode()
```
