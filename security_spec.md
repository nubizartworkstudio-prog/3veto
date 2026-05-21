# Security Specification: Konsert 3 Veto Landing Page

## 1. Data Invariants
* **Admin-Only Writes**: The settings document (`settings/config`) can be read by anyone, but can only be modified by a fully authenticated, verified administrator (specifically `nubiz.artwork.studio@gmail.com`).
* **Timestamp Integrity**: All updates must be structural updates with correct configuration schema types and valid values.
* **Default Deny**: All other collections and paths are strictly private and default-denied.

## 2. The "Dirty Dozen" Payloads
These payloads attempt to bypass security, overwrite private data, or hijack configuration settings.

1. **Anonymous Modification**: Unauthenticated write to `/databases/$(database)/documents/settings/config`.
2. **Standard User Privilege Escalation**: Read-write attempts using a dummy account.
3. **Invalid Theme Injection**: Setting `heroPhoto` to an incredibly long string to poison resource sizing.
4. **Spoofed Email Attack**: Attempting write with `email_verified: false` but using `email: "nubiz.artwork.studio@gmail.com"`.
5. **Collection Shadow Write**: Attempt to create a document under a non-existent path `/databases/$(database)/documents/hackers/compromise`.
6. **Config Deletion**: Attempting to delete `settings/config`.
7. **Bands Clear Request**: Writing a configuration where `bands` is null.
8. **Ticket Price Corruption**: Setting ticket class prices to negative or NaN values.
9. **Fake ID Attack**: Trying to inject long, malicious character strings as path variables.
10. **Admin Rollback Bypass**: Attempting to write obsolete settings.
11. **Malicious Script Injection**: Injecting `<script>` tags in `photoDescription`.
12. **Recursive Auth Attack**: Performing recursive query requests on collection metadata.

## 3. The Test Runner

```typescript
// firestore.rules.test.ts for Veto config testing
import { assertSucceeds, assertFails } from '@firebase/rules-unit-testing';

// All operations verify that only nubiz.artwork.studio@gmail.com has write permissions, and public reads are allowed.
```
