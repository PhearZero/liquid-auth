---
title: "Android: Get Service Passkey"
---

```kotlin
// MainActivity.kt
val request = PendingIntentHandler.retrieveProviderCreateCredentialRequest(intent)
if (request.callingRequest is CreatePublicKeyCredentialRequest) {
    val result = viewModel.processCreatePasskey(this@CreatePasskeyActivity, request)
} else {
    binding.createPasskeyMessage.text = resources.getString(R.string.get_passkey_error)
}
```
