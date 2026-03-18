# Anyline Tire Tread React Native SDK

[![npm version](https://img.shields.io/npm/v/@anyline%2Ftire-tread-react-native-module.svg)](https://www.npmjs.com/package/@anyline/tire-tread-react-native-module)
[![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)]()
[![license](https://img.shields.io/npm/l/@anyline%2Ftire-tread-react-native-module.svg)](./LICENSE.md)

Measure tire tread depth from a smartphone camera. The SDK captures frames on-device, uploads them to Anyline's servers, and returns per-region tread depth measurements.

## Requirements

- React Native 0.75+
- Node 18+
- Camera with autofocus and 1080p capability
- Stable internet connection
- **Android** 6.0+ (API 23)
- **iOS** 13.4+

## Installation

```sh
yarn add @anyline/tire-tread-react-native-module
# or
npm install @anyline/tire-tread-react-native-module
```

### Android

Add the Anyline Maven repository to your project-level `build.gradle` (or `settings.gradle` for newer projects):

```gradle
allprojects {
  repositories {
    maven { url "https://europe-maven.pkg.dev/anyline-ttr-sdk/maven" }
  }
}
```

### iOS

```sh
cd ios && pod install
```

### Camera Permissions

The scan UI requires camera access. Configure permissions before calling `scan`.

**Android** — add to `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

**iOS** — add to `Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is needed to scan tire tread depth.</string>
```

## Usage

> See the [`example/`](./example) app for a complete working integration.

Every API call returns a result object — promises never reject. Check `ok` to distinguish success from failure.

```typescript
import {
  initialize,
  scan,
  getResult,
  sendCommentFeedback,
  sendTreadDepthResultFeedback,
  sendTireIdFeedback,
  type TireTreadConfig,
  type ScanOutcome,
  type TreadDepthResult,
} from '@anyline/tire-tread-react-native-module';
```

### 1. Initialize

Call once at app startup. Requires a valid Anyline license key.

```typescript
const init = await initialize('YOUR_LICENSE_KEY');
if (!init.ok) {
  // init.error.type is the category (LICENSE_ERROR, CONFIG_ERROR, NETWORK_ERROR, ...)
  // init.error.code is the specific detail (INVALID_LICENSE, NO_CONNECTION, ...)
  console.error(init.error.type, init.error.code, init.error.message);
  return;
}
```

You can pass an optional `InitOptions` object as the second argument:

```typescript
const init = await initialize('YOUR_LICENSE_KEY', {
  customTag: 'warehouse-scanner-3',   // optional tag to tell apart different devices (max 50 chars)
});
```

### 2. Scan

Opens a full-screen camera UI. The user positions the phone near the tire and the SDK captures frames automatically.

```typescript
const config: TireTreadConfig = {
  uiConfig: {
    measurementSystem: 'Metric',
  },
};

const outcome: ScanOutcome = await scan(config);

switch (outcome.kind) {
  case 'ScanCompleted':
    console.log('Measurement UUID:', outcome.measurementUUID);
    break;
  case 'ScanAborted':
    // User closed the scanner
    return;
  case 'ScanFailed':
    console.error(outcome.error?.type, outcome.error?.code, outcome.error?.message);
    return;
}
```

#### Scan Outcomes

| `kind` | Meaning | Fields |
|--------|---------|--------|
| `ScanCompleted` | Frames captured and uploaded | `measurementUUID` |
| `ScanAborted` | User closed the scanner | `measurementUUID?` (present if session was created) |
| `ScanFailed` | Scan could not complete | `error`, `measurementUUID?` |

### 3. Get Results

Poll the backend for tread depth measurements. You can pass an optional timeout override in seconds if needed.

```typescript
const result = await getResult(outcome.measurementUUID!);
if (!result.ok) {
  console.error(result.error.type, result.error.code, result.error.message);
  return;
}

const { global, regions } = result.value;
console.log(`Global depth: ${global.value_mm} mm`);
for (const region of regions) {
  if (region.available) {
    console.log(`  Region: ${region.value_mm} mm (${region.value_inch_32nds}/32")`);
  }
}
```

### 4. Send Feedback

After reviewing results, you can submit corrections to improve future measurements.

```typescript
// Attach a comment
await sendCommentFeedback(measurementUUID, 'Tire was wet during scan');

// Submit corrected tread depth values
await sendTreadDepthResultFeedback(measurementUUID, [
  { available: true, value_mm: 5.2 },
  { available: true, value_mm: 4.8 },
  { available: true, value_mm: 5.0 },
]);

// Submit a tire identifier
await sendTireIdFeedback(measurementUUID, 'FL-001');
```

All feedback functions return `SdkResult<MeasurementInfo>`.

## API Reference

All functions are fully typed. Return types and error shapes are available via TypeScript autocompletion.

### Scan

- `initialize(licenseKey, options?)` — Initialize the SDK
- `scan(config?, options?)` — Open scanner, returns `ScanOutcome`
- `getResult(measurementUUID, timeout?)` — Fetch tread depth results

### Feedback

- `sendCommentFeedback(measurementUUID, comment)` — Attach a text comment to a measurement
- `sendTreadDepthResultFeedback(measurementUUID, treadResultRegions)` — Submit corrected tread depth values
- `sendTireIdFeedback(measurementUUID, tireId)` — Submit a corrected tire identifier

### Utility

- `getSdkVersion()` — Native SDK version
- `getWrapperVersion()` — Module version

## Scan Configuration

Pass a `TireTreadConfig` object to `scan`. All fields are optional.

```typescript
const config: TireTreadConfig = {
  scanConfig: {
    // Only set tireWidth if you know the exact width in mm beforehand.
    // If omitted, the SDK will prompt the user to enter it before scanning.
    // Passing an incorrect value will reduce measurement accuracy.
    tireWidth: 225,
  },
  uiConfig: {
    measurementSystem: 'Metric',       // 'Metric' | 'Imperial'
  },
  additionalContext: {
    correlationId: 'fleet-inspection-42',
    tirePosition: { axle: 1, positionOnAxle: 1, side: 'Left' },
  },
};
```

Full configuration reference: [Scan Configuration](https://documentation.anyline.com/tiretreadsdk-component/latest/scan-configuration.html) | [Default UI](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/overview.html)

## Error Handling

All errors follow a structured format with a `type` category and a specific `code`:

```typescript
interface SdkError {
  type: ErrorType;
  code: ErrorCode;
  message: string;
  debug?: Record<string, string>;
}
```

### Error Types and Codes

<details>
<summary><code>LICENSE_ERROR</code> — license validation failures</summary>

| Code | When |
|------|------|
| `INVALID_LICENSE` | License key is malformed or expired |
| `LICENSE_KEY_FORBIDDEN` | License not authorized for this app/bundle ID |
| `SDK_NOT_VERIFIED` | License verification failed (network or server issue) |

</details>

<details>
<summary><code>CONFIG_ERROR</code> — invalid configuration</summary>

| Code | When |
|------|------|
| `INVALID_ARGUMENT` | Invalid config value passed to an API call |

</details>

<details>
<summary><code>NETWORK_ERROR</code> — connectivity issues</summary>

| Code | When |
|------|------|
| `NO_CONNECTION` | Device is offline or cannot reach Anyline servers |
| `UPLOAD_FAILED` | Frame upload to backend failed |
| `TIMEOUT` | Server did not respond within the timeout period |

</details>

<details>
<summary><code>SCAN_ERROR</code> — scan lifecycle failures</summary>

| Code | When |
|------|------|
| `SDK_NOT_INITIALIZED` | API called before `initialize` completed |
| `INITIALIZATION_FAILED` | SDK startup failed (missing permissions, resources) |
| `SESSION_CREATION_FAILED` | Backend rejected the scan session |
| `MEASUREMENT_ERROR` | Backend could not process the scan |
| `ALREADY_RUNNING` | A scan is already in progress |
| `INTERNAL_ERROR` | Unexpected native SDK error |
| `UNKNOWN_ERROR` | Unclassified error |

</details>

<details>
<summary><code>RESULT_ERROR</code> — result retrieval failures</summary>

| Code | When |
|------|------|
| `INVALID_UUID` | Measurement UUID not found |
| `RESULT_ERROR` | Failed to retrieve tread depth results |

</details>

## Result Structure

A successful `getResult` call returns a `TreadDepthResult`. Here's what you get back:

```typescript
// result.value: TreadDepthResult
{
  global: TreadResultRegion,        // overall tire depth
  regions: TreadResultRegion[],     // per-region measurements (typically 3)
  measurementInfo: {
    measurementUUID: string,
    status: MeasurementStatus,      // see below
    additionalContext?: {           // echoes back what you passed to scan()
      correlationId?: string,
      tirePosition?: { axle, positionOnAxle, side },
    },
  },
  measurementMetadata?: {
    movementDirection?: 'LeftToRight' | 'RightToLeft' | 'Unknown',
  },
}

// Each TreadResultRegion:
{
  available: boolean,               // false if this region couldn't be measured
  value_mm: number,                 // depth in millimeters
  value_inch: number,               // depth in inches
  value_inch_32nds: number,         // depth in 32nds of an inch
}

// MeasurementStatus:
'Unknown' | 'WaitingForImages' | 'Processing'
  | 'ResultReady' | 'ResultAndReportReady'
  | 'Completed' | 'Aborted' | 'Failed'
```

## Troubleshooting

<details>
<summary>Camera permission denied at runtime</summary>

Request camera permission before calling `scan`. On iOS, the first call triggers the system prompt. On Android, use `PermissionsAndroid.request()` or a library like `react-native-permissions`.
</details>

<details>
<summary>Scan fails immediately with <code>INITIALIZATION_FAILED</code></summary>

Ensure `initialize` completed with `ok: true` before scanning. Check that the device has autofocus — tablets and some low-end devices without autofocus are not supported.
</details>

<details>
<summary><code>NO_CONNECTION</code> or <code>TIMEOUT</code> during result retrieval</summary>

The SDK uploads frames and retrieves results over HTTPS. Verify the device has a stable internet connection and can reach `anyline.com` endpoints. Increase the timeout if processing takes longer than expected.
</details>

<details>
<summary><code>LICENSE_KEY_FORBIDDEN</code> on one platform but not the other</summary>

License keys are bound to app identifiers. Verify the bundle ID (iOS) and application ID (Android) match what was configured in your Anyline account.
</details>

<details>
<summary>Android build fails: "Could not resolve io.anyline.tiretread.sdk"</summary>

The Anyline Maven repository is not in your Gradle config. Add `maven { url "https://europe-maven.pkg.dev/anyline-ttr-sdk/maven" }` to your repositories block.
</details>

<details>
<summary>iOS build fails: pod not found</summary>

Run `pod repo update` then `pod install` again. Ensure your Podfile's platform is set to iOS 13.4 or higher.
</details>

## Expo

This module includes an Expo config plugin that automatically:

- adds `NSCameraUsageDescription` to your iOS `Info.plist`
- adds `CAMERA` permission to your Android `AndroidManifest.xml`
- adds the Anyline Android Maven repository to the project repositories

```json
{
  "plugins": [
    "@anyline/tire-tread-react-native-module"
  ]
}
```

> **Note:** This module uses native code and is not compatible with Expo Go. You must use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) (`npx expo run:android` / `npx expo run:ios`).

## Support

For issues or questions, open a support request at the [Anyline Helpdesk](https://support.anyline.com).

## License

See [LICENSE.md](./LICENSE.md) for licensing information.
