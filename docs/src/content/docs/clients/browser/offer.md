---
title: 'Browser: Peer Offer'
sidebar:
    order: 3
    label: 'Peer Offer'
---

Ensure both clients have a valid session before attempting to create peer connections.
See the [Authentication](/docs/clients/browser/authentication) and [Registration]() guides for more information.


#### Peering with a remote client


```typescript
import { SignalClient } from "./signal";
const client = new SignalClient("<ORIGIN OF SERVICE>")


// Create the Peer Connection and await the remote client's answer
client.peer(
  // Request ID from the Peer, 
  // usually displayed as a Deep Link or QR Code
  12345,
  // Type of remote client
  'answer'
).then((dataChannel: RTCDataChannel) => {
  // Handle the data channel
  dataChannel.onmessage = (event: MessageEvent) => {
    console.log(event.data)
  }
})
```
