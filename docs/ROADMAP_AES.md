# Roadmap: Crypto-JS Encryption Strategy

## Objective
Enable secure delivery of paid learning materials by accepting encrypted `.json` strings/files and decrypting them client-side using a user-supplied license key via `crypto-js`.

## Planned Implementation Steps
1. **Dependency:** Install `crypto-js`.
2. **Schema Update:** Support encrypted payload envelopes:
   ```json
   {
     "isEncrypted": true,
     "payload": "U2FsdGVkX1+..."
   }
3. **UI Flow:**
   - Detect isEncrypted === true inside DropZone.jsx or App.jsx.
   - Prompt user with a Key Modal (<KeyInputModal />).
   - Decrypt payload using CryptoJS.AES.decrypt(payload, userKey).toString(CryptoJS.enc.Utf8).
   - Parse decrypted string back into standard Course JSON object.
   - Handle decryption failures (invalid key) gracefully with UI alerts.