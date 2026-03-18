import NativeAnylineTtrModule from './specs/NativeAnylineTtrModule';

if (!NativeAnylineTtrModule) {
  throw new Error(
    'The native module AnylineTtrMobileWrapperReactNative is not available. ' +
      'This could be because:\n' +
      '- You have not run "pod install" after installing the package\n' +
      '- You need to rebuild the native project (npx react-native run-android / run-ios)\n' +
      '- The native project has not picked up React Native autolinking yet; try reinstalling dependencies and rebuilding the app\n' +
      '- You are running in Expo Go which does not support native modules (use a dev client instead)\n'
  );
}

import type { Heatmap } from './generated/heatmap_payload';
import type { InitOptions } from './generated/init_options';
import type {
  TreadDepthResult,
  TreadResultRegion,
  TreadDepthFeedbackRegion,
  MeasurementInfo,
  MeasurementMetadata,
  MovementDirection,
  MeasurementStatus,
} from './generated/result_payload';
import type {
  ScanOutcome,
  CompletedOutcome,
  AbortedOutcome,
  FailedOutcome,
  SdkError,
  ErrorCode,
  ErrorType,
} from './generated/scan_outcome';
import type { ScanOptions } from './generated/scan_options';
import type { SdkResult } from './generated/sdk_result';
import type {
  TireTreadConfig,
  UIConfig,
  AdditionalContext,
  TirePosition,
  TireSide,
  MeasurementSystem,
  Appearance,
  ScanSpeed,
  DistanceIndicatorConfig,
  FocusPointTooltipConfig,
  TapToStartScanningTooltipConfig,
  UploadViewConfig,
  OrientationWarningConfig,
  TireWidthInputConfig,
  TireWidthRange,
  MissingPermissionConfig,
  ScanConfig,
  HeatmapStyle,
} from './generated/tire_tread_config';

export type { Heatmap };

export type { InitOptions };

export type {
  TreadDepthResult,
  TreadResultRegion,
  TreadDepthFeedbackRegion,
  MeasurementInfo,
  MeasurementMetadata,
  MeasurementStatus,
  MovementDirection,
};

export type {
  ScanOutcome,
  CompletedOutcome,
  AbortedOutcome,
  FailedOutcome,
  SdkError,
  ErrorCode,
  ErrorType,
};

export type { SdkResult };

export type { ScanOptions };

export type {
  TireTreadConfig,
  UIConfig,
  AdditionalContext,
  TirePosition,
  TireSide,
  MeasurementSystem,
  Appearance,
  ScanSpeed,
  DistanceIndicatorConfig,
  FocusPointTooltipConfig,
  TapToStartScanningTooltipConfig,
  UploadViewConfig,
  OrientationWarningConfig,
  TireWidthInputConfig,
  TireWidthRange,
  MissingPermissionConfig,
  ScanConfig,
  HeatmapStyle,
};

const AnylineTtrMobileWrapperReactNative = NativeAnylineTtrModule;

export function initialize(
  licenseKey: string,
  options?: InitOptions | null
): Promise<SdkResult<null>> {
  return AnylineTtrMobileWrapperReactNative.initialize({
    licenseKey,
    customTag: options?.customTag ?? null,
  });
}

export function scan(
  config?: TireTreadConfig | null,
  options?: ScanOptions | null
): Promise<ScanOutcome> {
  return AnylineTtrMobileWrapperReactNative.scan({
    configJson: config == null ? null : JSON.stringify(config),
    optionsJson: options ? JSON.stringify(options) : null,
  });
}

export function getResult(
  measurementUUID: string,
  timeoutSeconds?: number
): Promise<SdkResult<TreadDepthResult>> {
  return AnylineTtrMobileWrapperReactNative.getResult({
    measurementUUID,
    timeoutSeconds: timeoutSeconds ?? null,
  });
}

export function getHeatmap(
  measurementUUID: string,
  timeoutSeconds?: number
): Promise<SdkResult<Heatmap>> {
  return AnylineTtrMobileWrapperReactNative.getHeatmap({
    measurementUUID,
    timeoutSeconds: timeoutSeconds ?? null,
  });
}

export function setTestingConfig(config: Record<string, unknown>): Promise<void> {
  return AnylineTtrMobileWrapperReactNative.setTestingConfig(config);
}

export function clearTestingConfig(): Promise<void> {
  return AnylineTtrMobileWrapperReactNative.clearTestingConfig();
}

export function sendCommentFeedback(
  measurementUUID: string,
  comment: string
): Promise<SdkResult<MeasurementInfo>> {
  return AnylineTtrMobileWrapperReactNative.sendCommentFeedback({
    measurementUUID,
    comment,
  });
}

export function sendTreadDepthResultFeedback(
  measurementUUID: string,
  treadResultRegions: TreadDepthFeedbackRegion[]
): Promise<SdkResult<MeasurementInfo>> {
  return AnylineTtrMobileWrapperReactNative.sendTreadDepthResultFeedback({
    measurementUUID,
    treadResultRegions,
  });
}

export function sendTireIdFeedback(
  measurementUUID: string,
  tireId: string
): Promise<SdkResult<MeasurementInfo>> {
  return AnylineTtrMobileWrapperReactNative.sendTireIdFeedback({
    measurementUUID,
    tireId,
  });
}

export function getSdkVersion(): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getSdkVersion();
}

export function getWrapperVersion(): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getWrapperVersion();
}
