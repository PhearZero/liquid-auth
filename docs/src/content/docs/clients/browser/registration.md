---
title: "Browser: Registration"
sidebar:
  order: 1
---

Register a passkey with the service and attest the knowledge of a KeyPair

```typescript
// browser.client.ts
const testAccount = algosdk.generateAccount();
// Sign in to the service with a new credential and wallet
await client.attestation(
  // Callback when a challenge is received, return a signed challenge
  async (challenge: Uint8Array) => ({
    // The type of signature and public key
    type: 'algorand',
    // The address of the account
    address: testAccount.addr,
    // The signature of the challenge, signed by the account
    signature: toBase64URL(nacl.sign.detached(challenge, testAccount.sk)),
    // Optionally authenticate a remote peer
    requestId: 12345,
    // Optional device name
    device: 'Demo Web Wallet' 
  })
)

```
