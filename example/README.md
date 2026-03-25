# Anyline Tire Tread React Native Example

Minimal React Native app demonstrating the [@anyline/tire-tread-react-native-module](../anyline-tiretread-react-native/README.md) module.

## Prerequisites

- Anyline license key from [anyline.com](https://anyline.com)
- Node 22+
- Android Studio for Android builds
- Xcode and CocoaPods for iOS builds
- Physical device with a camera

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create `.env` from the template:

```sh
cp .env.example .env
```

3. Edit `.env` and set your license key:

```dotenv
TTR_LICENSE_KEY=your-license-key-here
```

4. Install iOS pods:

```sh
cd ios && pod install
```

The license key is loaded automatically at runtime on both iOS and Android.

## Run

### Android

```sh
npm run android
```

### iOS

```sh
npm run ios
```

Run on a physical device, since the scan flow requires camera access.

## What It Demonstrates

1. Initialize the SDK with a license key
2. Open the scanner UI to capture tire tread frames
3. Retrieve tread depth results in mm, inches, and 32nds

See `App.tsx` for the complete implementation.
