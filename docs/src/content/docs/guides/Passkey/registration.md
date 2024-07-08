---
title: Registration Guide
sidebar:
  order: 11
  badge:
    text: "WIP"
    variant: caution
  label: Registration
tags:
  - Passkey
  - Registration
  - Wallet
  - Android
  - Browser
  - Server
---

The first step to registering a Passkey is fetching the `PublicKeyCredentialCreationOptions` from the [service]().

The standard URI for this request is `/attestation/request` using the `POST` method.


- `POST /attestation/response` - Register a new Passkey using an AuthenticatorAttestationResponse

Find out more in the [typescript client](../../../clients/browser/registration) documentation.



Find out more in the [kotlin client](../../../clients/android/registration) documentation.

