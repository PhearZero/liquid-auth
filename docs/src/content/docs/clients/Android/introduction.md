---
title: "Introduction"
sidebar:
  order: 0
prev: false
---

The Android Client is a library that allows you to interact with the Liquid Auth Service.

### Pre-requisites

Install [Android Studio]() and create or open an application. 


#### SHA256 Fingerprint

Get the SHA256 fingerprint of your application. You can use the following command to get the SHA256 fingerprint of your application. 

```bash
keytool -list -v -keystore <path> -alias <alias> -storepass <store_password> -keypass <key password>
```



Run a local instance or deploy the Liquid Auth Service[Liquid Auth Service](../../../server/running-locally)
