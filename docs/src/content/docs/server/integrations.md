---
title: "Server: Integrations"
sidebar:
  order: 3
  label: 'Integrations'
  badge:
    text: "WIP"
    variant: caution
next: false
---

### Vite

```typescript
//vite.config.ts

const DEFAULT_PROXY_URL = 'http://localhost:3000';
const DEFAULT_WSS_PROXY_URL = 'ws://localhost:3000';
export default defineConfig({
  server: {
    proxy: {
      '^/auth/.*': process.env.PROXY_URL || DEFAULT_PROXY_URL,
      '^/.well-known/.*': process.env.PROXY_URL || DEFAULT_PROXY_URL,
      '^/attestation/.*': process.env.PROXY_URL || DEFAULT_PROXY_URL,
      '^/assertion/.*': process.env.PROXY_URL || DEFAULT_PROXY_URL,
      '/socket.io': {
        target: process.env.WSS_PROXY_SERVER || DEFAULT_WSS_PROXY_URL,
        ws: true,
      },
    }
  },
})
```

### Nest.js[WIP]

```javascript
//server.js
// import {AppModule} from '@algorandfoundation/liquid-auth-api'
```

### Next.js[WIP]

```javascript
//next.config.js
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/blog',
//         destination: 'https://acme.com/blog',
//       },
//     ]
//   },
// }
```

### Express.js[WIP]

```javascript
//server.js
// import {AppModule} from '@algorandfoundation/liquid-auth-api'
```

### Vercel[WIP]

```json
//vercel.json
{
  "rewrites": [
    {
      "source": "/blog",
      "destination": "https://acme.com/blog"
    }
  ]
}
```

### Cloudflare[WIP]

```toml
#wrangler.toml

```

### NGINX [WIP]
```nginx
//default.conf
#todo Add Nginx proxy configuration
```
