---
title: Getting Started
sidebar:
  order: 0
---

Liquid Auth is composed of two main components, the **Liquid Auth Server** and the **Liquid Auth Client**.
They are used together to provide authentication and signaling services for decentralized applications.

### Server

Authentication is handled using `PublicKeyCredentials` with a custom `Liquid Extension` 
which attests an additional KeyPair and allows [Peer to Peer](../peer-to-peer/offer) signaling.

#### Who should use this service?

The service should be deployed by decentralized applications and wallets
that want to leverage `Passkeys` and `Signaling` between peers.
See the [Server Introduction](../../server/introduction) for more information
on how to integrate the service with an application.

### Client

The clients are libraries that provide a simple way to interact with the service.
Clients use the service to authenticate and broker a connection between peers.


#### Who should use the clients?

The clients should be used by developers who want to integrate the Liquid Auth Service into their applications.
