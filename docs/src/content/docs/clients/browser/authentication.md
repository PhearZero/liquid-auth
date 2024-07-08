---
title: 'Browser: Authentication'
---

Sign in with an existing account
```typescript
await client.assertion(
    credentialId, // Some known credential ID
    {requestId: 12345} // Optional requestId to link
)
```
