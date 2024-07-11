---
title: 'Browser: Authentication'
---

Authenticate an existing [Passkey](../../guides/concepts#passkeys) with the [Service](../../server/introduction).

### Who is this for?

- **dApps** logging back into the service without connecting to another client
- **Browser Wallets** that want to communicate with other clients

## Client

Sign in with an existing account using an instance of the `SignalClient`
```typescript
//app.ts
await client.assertion(
    credentialId, // Some known credential ID
    {requestId: 12345} // Optional requestId to link
)
```

## Stateless

Using the stateless method without a `SignalClient`

```typescript
//app.ts
import {assertion} from '@algorandfoundation/liquid-auth/assertion'
await assertion(
  "https://my-liquid-service.com",
  credentialId, // Some known credential ID
  {requestId: 12345} // Optional requestId to link
)
```
