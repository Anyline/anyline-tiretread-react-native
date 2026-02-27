# Anyline Tire Tread React Native SDK

[![npm version](https://img.shields.io/npm/v/anyline-ttr-react-native.svg)](https://www.npmjs.com/package/anyline-ttr-react-native)
[![license](https://img.shields.io/npm/l/anyline-ttr-react-native.svg)](./LICENSE.md)

React Native SDK for Anyline Tire Tread scanning and depth measurement.

## Getting Started

### Requirements
- Stable internet connection
- Flash capability
- Camera functionality (required: 1080p with autofocus)

#### Android
- Android 6.0+ (Marshmallow) - API level 23+

#### iOS
- iOS 13+

Reference: [Anyline Tire Tread SDK documentation](https://documentation.anyline.com/tiretreadsdk-component/latest/index.html)

### Installation

```sh
yarn add anyline-ttr-react-native
# or
npm install anyline-ttr-react-native
```

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
} from 'anyline-ttr-react-native';
```

### Initialization

```typescript
try {
  const response = await initialize('your_license_key');
  console.log('Initialization successful:', response);
} catch (error) {
  console.error('Initialization failed:', error);
}
```

### Device Compatibility Check

```typescript
const supported = await isDeviceSupported();
if (!supported) {
  console.warn('Device not supported');
}
```

### Scanning

Use `scanWithEvents` to start a scan and receive real-time events:

```typescript
const config = JSON.stringify(require('./assets/config/sample_config_default.json'));

try {
  const { measurementUUID, cameraDirection } = await scanWithEvents(
    config,
    undefined,
    (event) => {
      console.log('Scan event:', event);
    }
  );
  console.log('Scan complete:', measurementUUID, cameraDirection);
} catch (error) {
  console.error('Scanning failed:', error);
}
```

**Parameters:**
- `config` (string): JSON configuration for the scanning activity.
- `tireWidth` (number, optional): Tire width for improved accuracy.
- `onEvent` (function, optional): Callback for scan events (`scanStarted`, `scanStopped`, `imageUploaded`, `distanceChanged`).

**Returns:** `Promise<ScanResult>` with `measurementUUID` and `cameraDirection`.

### Getting Results

```typescript
try {
  const result = await getResult(measurementUUID);
  console.log('Report:', result);
} catch (error) {
  console.error('Getting report failed:', error);
}
```

### Getting Heatmap

```typescript
try {
  const heatmapUrl = await getHeatMap(measurementUUID);
  console.log('Heatmap URL:', heatmapUrl);
} catch (error) {
  console.error('Getting heatmap failed:', error);
}
```

## Configuration

The scanning activity is configured via a JSON object. For complete documentation:
- [Scan Configuration](https://documentation.anyline.com/tiretreadsdk-component/latest/scan-configuration.html)
- [Default UI Overview](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/overview.html)
- [Customizing the Default UI](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/customizing.html)

## Troubleshooting

### Camera permissions not granted
Ensure your app requests camera permissions before starting a scan. On Android, add `android.permission.CAMERA` to your `AndroidManifest.xml`. On iOS, add `NSCameraUsageDescription` to your `Info.plist`.

### Scan fails with autofocus error
The SDK requires a camera with autofocus capability. Devices without autofocus (e.g. some tablets) are not supported. Use `isDeviceSupported()` to check before scanning.

### Network timeout during result retrieval
The SDK requires a stable internet connection to upload frames and retrieve results. Ensure the device has connectivity and can reach `anyline.com` endpoints.

## Support

For issues or questions, please open a support request using the [Anyline Helpdesk](https://support.anyline.com).

## License

See the [LICENSE.md](./LICENSE.md) file for licensing information.
