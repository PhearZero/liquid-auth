---
title: Getting Started
sidebar:
  order: 0
---

Liquid Auth is composed of two main components, the **Liquid Auth Server** and the **Liquid Auth Clients**.
They are used together to provide authentication and signaling services for decentralized applications (dApps).

### Server

The responsibilities of the service are limited to authentication and brokering connections between peers.
Authentication is handled using [Passkeys](../concepts#passkeys) with a custom `Liquid Extension` 
which attests an additional KeyPair (ie Algorand Account). 
Once a client is authenticated, the service can be used to broker a [Peer to Peer](../concepts#peer-to-peer) connection.

See the [Server Introduction](../../server/introduction) for more information.

#### Who should use this service?

The service should be deployed by decentralized applications
that want to leverage `Passkeys` and `Signaling` between peers.

#### Why should I deploy this service?

The majority of communications on the internet are centralized. 
**Liquid Auth Server** offloads communication from the server and allows for direct communication between peers.
Not only is this generally more secure and decentralized, it also reduces the load on the server.

### Clients

The **Liquid Auth Clients** are libraries that provide a simple way to interact with the service and other peers.
Clients use the service to authenticate and broker a connection between peers.

Get started building with the [Android](../../clients/android/introduction) or [Browser](../../clients/browser/introduction) client

#### Who should use the clients?

The clients should be used by developers who want to integrate the **Liquid Auth Service** into their applications and wallets.
