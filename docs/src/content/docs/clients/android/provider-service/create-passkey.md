---
title: "Android: Create Service Passkey"
---


```kotlin
val request = PendingIntentHandler.retrieveProviderGetCredentialRequest(intent)
if (request != null) {
    lifecycleScope.launch {
        val result = viewModel.processGetPasskey(this@GetPasskeyActivity, request, intent.getBundleExtra("CREDENTIAL_DATA"))
        Log.d(TAG, "result: $result")
        setResult(Activity.RESULT_OK, result)
        finish()
    }
} else {
    binding.getPasskeyMessage.text = resources.getString(R.string.get_passkey_error)
}
```
