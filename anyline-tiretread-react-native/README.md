# Anyline TTR Mobile Wrapper React Native Plugin

The Anyline TTR Mobile Wrapper for React Native enables integration with the Anyline Tire Tread SDK, allowing for tire tread scanning and depth report generation in your React Native applications.

## License
See the [LICENSE.md](./LICENSE.md) file for licensing information.

## Getting Started

### Requirements
- A device with a camera (minimum 1080p resolution with autofocus)

#### Android
- Android 8.0+ (Oreo) - API level 26+

#### iOS
- iOS 16.4+
- Add Camera Permissions to `Info.plist`

### React Native Compatibility
- React: `>=18.2.0 <20`
- React Native: `>=0.73.0`

### Installation
Install the package from npm:

```sh
yarn add anyline-ttr-mobile-wrapper-react-native
# or
npm install anyline-ttr-mobile-wrapper-react-native
```

This package contains native code and is not supported in Expo Go. Use a development build (or bare React Native).

### Android Setup
Add the custom maven repository to your `build.gradle`:
```gradle
maven { url "https://europe-maven.pkg.dev/anyline-ttr-sdk/maven" }
```

### iOS Setup
Run `pod install` after installing the package:
```sh
cd ios && pod install
```

## Usage

### Importing
```typescript
import {
  initialize,
  scanWithEvents,
  getResult,
  getHeatMap,
  isDeviceSupported,
  setOrientationLock,
  OrientationLock,
} from 'anyline-ttr-mobile-wrapper-react-native';
```

### Initialization
```typescript
initialize('your_license_key')
  .then((response) => {
    console.log('Initialization successful:', response);
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
  });
```

### Device Compatibility Check
```typescript
isDeviceSupported()
  .then((supported) => {
    if (!supported) {
      console.warn('Device not supported');
    }
  });
```

### Scanning
Use `scanWithEvents` to start a scan and receive real-time events:

```typescript
const config = JSON.stringify(require('./assets/config/sample_config_default.json'));

scanWithEvents(config, undefined, (event) => {
  console.log('Scan event:', event);
})
  .then(({ measurementUUID, cameraDirection }) => {
    console.log('Scan complete:', measurementUUID, cameraDirection);
  })
  .catch((error) => {
    console.error('Scanning failed:', error);
  });
```

**Parameters:**
- `config` (string): JSON configuration for the scanning activity.
- `tireWidth` (number, optional): Tire width for improved accuracy.
- `onEvent` (function, optional): Callback for scan events (`scanStarted`, `scanStopped`, `imageUploaded`, `distanceChanged`).

**Returns:** `Promise<ScanResult>` with `measurementUUID` and `cameraDirection`.

### Getting Results
```typescript
getResult(measurementUUID)
  .then((result) => {
    console.log('Report:', result);
  })
  .catch((error) => {
    console.error('Getting report failed:', error);
  });
```

### Getting Heatmap
```typescript
getHeatMap(measurementUUID)
  .then((heatmapUrl) => {
    console.log('Heatmap URL:', heatmapUrl);
  })
  .catch((error) => {
    console.error('Getting heatmap failed:', error);
  });
```

## Configuration

The scanning activity is configured via a JSON object. For complete documentation:
- [Scan Configuration](https://documentation.anyline.com/tiretreadsdk-component/latest/scan-configuration.html)
- [Default UI Overview](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/overview.html)
- [Customizing the Default UI](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/customizing.html)

## Example
See the example app in the repository:
- https://github.com/Anyline/anyline-tiretread-react-native/tree/main/example

## Troubleshooting
- If Android build fails to resolve `io.anyline.tiretread.sdk:shared`, verify the Anyline Maven repository is configured in your project's repositories.
- If iOS reports the native module is missing, run `cd ios && pod install`, then rebuild the app.
- If you run in Expo Go, the native module will not load. Use a development build instead.

## Support
For issues or questions, please open a support request using the [Anyline Helpdesk](https://support.anyline.com).
