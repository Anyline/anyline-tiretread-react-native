# Anyline TTR Mobile Wrapper React Native Plugin

The Anyline TTR Mobile Wrapper for React Native enables integration with the Anyline Tire Tread Recognition (TTR) functionality, allowing for tire tread scanning and depth report generation in your React Native applications.

## File Summary
- **example**: Example app source code demonstrating plugin integration.
- **README.md**: This readme file.
- **LICENSE.md**: The license file.

## License
See the [LICENSE.md](./LICENSE.md) file for licensing information.

## Getting Started
If you want to quickly integrate and start using the Anyline TTR Mobile Wrapper in your React Native project, follow these steps. 

### Requirements
#### Android
- Android SDK Level >= 26
- A device with a decent camera (recommended: 720p resolution with good autofocus)

#### iOS
- Minimum OS version: 16.4
- Disable bitcode in your project if enabled.
- Add Camera Permissions to `Info.plist`.

### Installation
To add the plugin you have to download or clone this repository and add the plugin source to your project using yarn or npm:

```sh
$ yarn add $(path_to_anyline-ttr-mobile-wrapper-react-native)
```

## Linking
Ensure the package is linked correctly. If you face linking issues, ensure you have run `pod install` (for iOS) and rebuilt your app after installation.
You also might have to link the project:
```sh
npx react-native link anyline-ttr-mobile-wrapper-react-native
```

## Android Example Source
You will also have to add the custom maven repository path to your build.gradle.
```gradle
maven { url "https://europe-maven.pkg.dev/anyline-ttr-sdk/maven" }
```

## Example
Please have a look at the working example in the repository. It provides you with sample code for the full integration.

## Importing the Plugin
Import the required functions from the plugin in your React Native project:

```javascript
import {
  initTireTread,
  startTireTreadScanActivity,
  getTreadDepthReportResult,
} from 'anyline-ttr-mobile-wrapper-react-native';
```

## Initialization
Initialize the Anyline TTR SDK by calling the `initTireTread` method with your license key:

```javascript
initTireTread('your_license_key')
  .then((response) => {
    console.log('Initialization successful:', response);
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
  });
```

## startTireTreadScanActivity
Starts the tire tread scanning activity with the provided configuration. If you use an empty config string the default configuration will be loaded.

```javascript
startTireTreadScanActivity(config)
  .then((response) => {
    console.log('Scanning successful:', response);
  })
  .catch((error) => {
    console.error('Scanning failed:', error);
  });
```
**Parameters:**

- `config` (string): The JSON configuration for the scanning activity.
- `tireWidth` (number): Optional TireWidth for more accurate scanning on Android

**Returns:**

- Promise<string>: A promise that resolves to the scanning result.

## getTreadDepthReportResult
Gets the tread depth report result for the given measurement UUID as an json result.


```javascript
Copy code
getTreadDepthReportResult(measurementUuid)
  .then((response) => {
    console.log('Report retrieval successful:', response);
  })
  .catch((error) => {
    console.error('Getting report failed:', error);
  });
```
**Parameters:**

- `measurementUuid` (string): The UUID of the measurement.

**Returns:**

- Promise<string>: A promise that resolves to the report result as json.

## Result JSON Structure
The result string from `getTreadDepthReportResult` is a JSON string containing the tire tread depth results. Below is a sample JSON structure and an explanation of each field.

### Sample JSON Result
```json
{
  "global": {
    "available": true,
    "value_mm": 6.0,
    "value_inch": 0.236,
    "value_inch_32nds": 7
  },
  "regions": [
    {
      "available": true,
      "value_mm": 7.5,
      "value_inch": 0.295,
      "value_inch_32nds": 9
    },
    {
      "available": true,
      "value_mm": 6.5,
      "value_inch": 0.256,
      "value_inch_32nds": 8
    },
    {
      "available": true,
      "value_mm": 6.5,
      "value_inch": 0.256,
      "value_inch_32nds": 8
    }
  ],
  "measurementInfo": {
    "measurementUuid": "123e4567-e89b-12d3-a456-426614174000",
    "status": "completed",
    "additionalContext": null
  }
}
```
## JSON Fields Description
- `global` (object): The global tread depth result.
  - `available` (boolean): Indicates if the global result is available.
  - `value_mm` (double): The tread depth value in millimeters.
  - `value_inch` (double): The tread depth value in inches.
  - `value_inch_32nds` (int): The tread depth value in inches (32nds).

- `regions` (array of objects): The tread depth results for 3 different regions of the tire.
  - Each region object contains:
    - `available` (boolean): Indicates if the region result is available.
    - `value_mm` (double): The tread depth value in millimeters.
    - `value_inch` (double): The tread depth value in inches.
    - `value_inch_32nds` (int): The tread depth value in inches (32nds).

- `measurementInfo` (object): Information about the measurement.
  - `measurementUuid` (string): The UUID identifying the measurement.
  - `status` (string): The status of the measurement. Possible values:
    - `unknown`
    - `waiting_for_images`
    - `processing`
    - `result_ready`
    - `result_and_report_ready`
    - `completed`
    - `aborted`
    - `failed`
  - `additionalContext` (object|null): Additional context about the measurement (if any).

## Configuration
The Anyline TTR Mobile Wrapper uses a JSON configuration to define the behavior and appearance of the tire tread scanning activity. 

For complete documentation on all available configuration options, please refer to:
- [Scan Configuration](https://documentation.anyline.com/tiretreadsdk-component/latest/scan-configuration.html) - Complete configuration schema and options
- [Default UI Overview](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/overview.html) - Overview of the default UI components
- [Customizing the Default UI](https://documentation.anyline.com/tiretreadsdk-component/latest/default-ui/customizing.html) - Detailed customization options for UI elements

## Get Help (Support)
For any issues or questions, please open a support request using the [Anyline Helpdesk](https://support.anyline.com). We don't actively monitor issues raised on GitHub.
