---
title: 'Android: Registration'
sidebar:
  order: 1
  label: 'Registration'
  badge:
      text: "WIP"
      variant: caution
---

### Android

```kotlin
//MainActivity.kt
import foundation.algorand.auth.fido2.*

class MainActivity {
    private var httpClient = OkHttpClient.Builder()
        .cookieJar(cookieJar) // Use Cookie jar to share cookies between requests
        .build()
    private var attestationApi = AttestationApi(httpClient)
    
    private fun onCreate(){
        val origin = "https://my-liquid-auth-service.com"
        
        val options = attestationApi.postAttestationOptions(
            origin, // Origin Server
            "User-Agent-String", // Required for checking the authenticator fingerprint
            JSONObject() // Additional Request Options
        )
        
        // Handle the FIDO2 Intent in FIDO2Client or CredentialManager
        // This is a simplified version of the code
        val credential = PublicKeyCredential()
        
        val response = attestationApi.postAttestationResponse(
            origin, // Origin Server
            "User-Agent-String", // Required for checking the authenticator fingerprint
            credential // PublicKeyCredential
        )
    }
    
}

```
