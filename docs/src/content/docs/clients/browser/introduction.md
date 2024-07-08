---
title: "Browser: Introduction"
prev: false
---

Get started with the reference [SignalClient](./reference/classes/signalclient/) for TypeScript.

The `SignalClient` is a EventEmitter interface that can be used to communicate with the [Service](../../server/introduction) API to facilitate authentication and peer-to-peer communications.


## Install

```bash
npm install algorandfoundation/liquid-auth-js --save
````

## Usage

```typescript
import {SignalClient} from '@algorandfoundation/liquid-client';
const client = new SignalClient(window.origin);
```

## Methods

### attestation
Registering a new credential.

```typescript
client.attestation
```

### assertion

### peer

### signal

### link

## Events

### connect

Socket.io Connection

```typescript
client.on('connect', ()=>{
  console.log('Connected to the Service')
})

```

### disconnect

Socket.io Disconnect

### link

Acknowledgement of a successful device linking.

Emit the request id to the service and wait for a response from
a remote wallet.

```typescript
client.socket.emit(
  'link', 
  {requestId: 12345}, (response)=>{
  // Handle the Message from the Remote Client
  client.emit('link-message', response)
})
```

### link-message


### signal


### (offer|answer)-description

### (offer|answer)-candidate

### data-channel



See the [Service](../../server/introduction) documentation for more information on the API.
