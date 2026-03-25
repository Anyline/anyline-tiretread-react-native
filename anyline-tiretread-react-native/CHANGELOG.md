# Release Notes (Changelog)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-25

This release marks the first stable 1.0 version of the Anyline Tire Tread React Native wrapper.

### Changed

- Improved compatibility across supported React Native platform versions.
- Stabilized the native integration layer for iOS and Android.
- Prepared the package for public 1.0 release.

## [0.7.0] - 2026-03-18

Complete rewrite of the Anyline Tire Tread React Native module with a new promise-based API, full TypeScript support, and Expo compatibility. This release replaces the 0.6.0 API entirely.

### Breaking Changes

- **Complete API rewrite — all 0.6.0 APIs have been removed and replaced**

  The module now uses a promise-based architecture. The previous activity/event-based scanning model has been completely replaced with typed async functions.

  **Migration Required**:
  - Replace event listener patterns with `await scan()`, which returns a `ScanOutcome`
  - Replace error callbacks with `SdkResult<T>` checks (`result.ok === true / false`)
  - Update `initialize()` to accept a license key string and optional `InitOptions`
  - See the [README](./README.md) and [example app](./example) for the complete new API

- **New error handling model**: All functions return typed results instead of throwing. `scan()` returns a `ScanOutcome` discriminated union (`ScanCompleted | ScanAborted | ScanFailed`). All other functions return `SdkResult<T>` — promises never reject.

- **New configuration model**: Scan configuration uses a structured `TireTreadConfig` object with `scanConfig`, `uiConfig`, and `additionalContext` properties.

- **Minimum React Native version raised to 0.75+** (was 0.71+)

- **[iOS] Minimum deployment target raised to 13.4+** (was 13.0+)

### Added

- Full TypeScript type definitions generated from the SDK schema
- Expo config plugin for automatic camera permissions and Maven repository setup
- Feedback API: `sendCommentFeedback()`, `sendTreadDepthResultFeedback()`, `sendTireIdFeedback()`
- `getSdkVersion()` and `getWrapperVersion()` utility functions
- `additionalContext` with `correlationId` and `tirePosition` for fleet integration use cases
- Structured error codes (18 codes across 6 error types) for programmatic error handling

### Dependencies

Tire Tread SDK 15.0.0: [Release Notes](https://documentation.anyline.com/tiretreadsdk-component/latest/release-notes.html#15-0-0-2026-03-17)

## [0.6.0] - 2026-02-27

### Changed

- First release
