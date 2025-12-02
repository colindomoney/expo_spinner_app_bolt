# EAS Build Configuration Guide

This document describes the EAS (Expo Application Services) build configuration for the Spinner App, covering both Ad-Hoc and TestFlight/App Store distribution.

## Current App Configuration

| Setting | Value |
|---------|-------|
| App Name | spinner-app |
| Bundle Identifier | com.spinner-app.com |
| EAS Project ID | 8bf91f8f-8c66-49cb-929f-7b1b9e1838e8 |
| Expo Owner | thinking-of-u |

## Build Profiles

### Ad-Hoc (Internal) Distribution

Ad-Hoc builds allow installation on pre-registered test devices without going through TestFlight.

**eas.json profile:**
```json
{
  "build": {
    "dev": {
      "distribution": "internal",
      "credentialsSource": "local"
    }
  }
}
```

**Build command:**
```bash
eas build --platform ios --profile dev
```

**Requirements:**
- Ad-Hoc provisioning profile (`Spinner_App_AdHoc.mobileprovision`)
- Distribution certificate (`ios_distribution.p12`)
- Test devices must be registered in Apple Developer Portal and included in the provisioning profile

---

### TestFlight / App Store Distribution

TestFlight builds are uploaded to App Store Connect for beta testing or App Store submission.

**eas.json profile:**
```json
{
  "build": {
    "production": {
      "distribution": "store",
      "credentialsSource": "local"
    }
  }
}
```

**Build command:**
```bash
eas build --platform ios --profile production
```

**Requirements:**
- App Store provisioning profile (`Spinner_App_AppStore.mobileprovision`)
- Distribution certificate (`ios_distribution.p12`) - same certificate works for both Ad-Hoc and App Store

---

## Complete eas.json Example

```json
{
  "build": {
    "dev": {
      "distribution": "internal",
      "credentialsSource": "local"
    },
    "production": {
      "distribution": "store",
      "credentialsSource": "local"
    }
  }
}
```

---

## Credentials Configuration

### credentials.json Structure

**Option A: Separate credentials per profile (recommended)**
```json
{
  "ios": {
    "dev": {
      "provisioningProfilePath": "certs/Spinner_App_AdHoc.mobileprovision",
      "distributionCertificate": {
        "path": "certs/ios_distribution.p12",
        "password": "YOUR_PASSWORD"
      }
    },
    "production": {
      "provisioningProfilePath": "certs/Spinner_App_AppStore.mobileprovision",
      "distributionCertificate": {
        "path": "certs/ios_distribution.p12",
        "password": "YOUR_PASSWORD"
      }
    }
  }
}
```

**Option B: Single credential set**
```json
{
  "ios": {
    "provisioningProfilePath": "certs/Spinner_App_AppStore.mobileprovision",
    "distributionCertificate": {
      "path": "certs/ios_distribution.p12",
      "password": "YOUR_PASSWORD"
    }
  }
}
```

---

## Certificate Files

All certificates are stored in the `certs/` directory:

| File | Purpose |
|------|---------|
| `ios_distribution.p12` | Distribution certificate (works for both Ad-Hoc and App Store) |
| `Spinner_App_AdHoc.mobileprovision` | Ad-Hoc provisioning profile for internal testing |
| `Spinner_App_AppStore.mobileprovision` | App Store provisioning profile for TestFlight/App Store |

---

## Creating Provisioning Profiles

### Ad-Hoc Profile

1. Go to [Apple Developer Portal - Profiles](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create a new profile
3. Select **Ad Hoc** (under Distribution)
4. Select app ID: `com.spinner-app.com`
5. Select your distribution certificate
6. Select test devices to include
7. Download and save as `certs/Spinner_App_AdHoc.mobileprovision`

### App Store Profile

1. Go to [Apple Developer Portal - Profiles](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create a new profile
3. Select **App Store Connect** (under Distribution)
4. Select app ID: `com.spinner-app.com`
5. Select your distribution certificate
6. Download and save as `certs/Spinner_App_AppStore.mobileprovision`

---

## Key Differences: Ad-Hoc vs App Store

| Aspect | Ad-Hoc | App Store / TestFlight |
|--------|--------|------------------------|
| Distribution type | `internal` | `store` |
| Provisioning profile type | Ad Hoc | App Store Connect |
| Device registration | Required (max 100 devices) | Not required |
| Installation method | Direct download / QR code | TestFlight app |
| Apple review | Not required | Required for App Store (optional for TestFlight) |

---

## Submitting to TestFlight

After building with `eas build --platform ios --profile production`:

1. Build completes and is available on EAS
2. Submit to App Store Connect:
   ```bash
   eas submit --platform ios
   ```
3. Or download the `.ipa` file and upload via Transporter app
4. In App Store Connect, add the build to TestFlight for testing

---

## Troubleshooting

### Certificate/Profile Mismatch
Ensure the distribution certificate used to sign the provisioning profile matches the `.p12` file in your `certs/` directory.

### Bundle Identifier Mismatch
The bundle identifier in `app.json` must exactly match the App ID in your provisioning profile.

### Expired Certificates
Provisioning profiles expire after 1 year. Regenerate them in Apple Developer Portal when needed.
