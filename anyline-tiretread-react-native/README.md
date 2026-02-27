# Anyline TTR Mobile Wrapper React Native Plugin

The Anyline TTR Mobile Wrapper for React Native enables integration with the Anyline Tire Tread SDK, allowing for tire tread scanning and depth report generation in your React Native applications.

## License
See the [LICENSE.md](./LICENSE.md) file for licensing information.

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
Install the package from npm:

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

## Internal GitLab Release (Playground)

Use this for internal testing before public npm release.

### Local Publish To GitLab Package Registry
```sh
cd anyline-tiretread-react-native
npm ci
npm version --no-git-tag-version 1.0.1-internal.0
export INTERNAL_NPM_REGISTRY="https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/"
export NPM_TOKEN="<TOKEN_WITH_write_package_registry>"
npm run release:internal
```

### Local Install From GitLab Package Registry
```sh
echo "//gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/:_authToken=<TOKEN_WITH_read_package_registry>" > .npmrc
npm install anyline-ttr-react-native@internal --registry "https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/"
```

### GitLab CI Publish
This repository includes a manual GitLab pipeline job `publish_internal_npm` in [`.gitlab-ci.yml`](../.gitlab-ci.yml).
It publishes with tag `internal`, uses `CI_JOB_TOKEN`, and stamps a unique prerelease version:
`<base-version>-internal.<CI_PIPELINE_IID>`.

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

## Support
For issues or questions, please open a support request using the [Anyline Helpdesk](https://support.anyline.com).
