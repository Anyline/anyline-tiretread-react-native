import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  type EmitterSubscription,
} from 'react-native';

const getLinkingError = () =>
  `The package 'anyline-ttr-mobile-wrapper-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AnylineTtrMobileWrapperReactNative =
  NativeModules.AnylineTtrMobileWrapperReactNative
    ? NativeModules.AnylineTtrMobileWrapperReactNative
    : new Proxy(
        {},
        {
          get() {
            throw new Error(getLinkingError());
          },
        }
      );

const eventEmitter = new NativeEventEmitter(AnylineTtrMobileWrapperReactNative);

export type CameraDirection = 'LEFT' | 'RIGHT' | 'UNKNOWN';

export interface ScanEvent {
  type: 'scanStarted' | 'scanStopped' | 'imageUploaded' | 'distanceChanged';
  measurementUUID?: string;
  cameraDirection?: CameraDirection;
  uploaded?: number;
  total?: number;
  distanceStatus?: string;
}

export interface ScanResult {
  measurementUUID: string;
  cameraDirection?: CameraDirection;
}

export type ErrorType =
  | 'LICENSE_ERROR'
  | 'CONFIG_ERROR'
  | 'NETWORK_ERROR'
  | 'SCAN_ERROR'
  | 'RESULT_ERROR'
  | 'CANCELLED';

const ERROR_TYPE_BY_CODE: Record<string, ErrorType> = {
  INVALID_LICENSE: 'LICENSE_ERROR',
  LICENSE_KEY_FORBIDDEN: 'LICENSE_ERROR',
  SDK_NOT_VERIFIED: 'LICENSE_ERROR',
  E_LICENSE_KEY_INVALID: 'LICENSE_ERROR',

  INVALID_ARGUMENT: 'CONFIG_ERROR',
  CONFIG_ABORT: 'CONFIG_ERROR',

  NO_CONNECTION: 'NETWORK_ERROR',
  TIMEOUT: 'NETWORK_ERROR',

  INVALID_UUID: 'RESULT_ERROR',
  RESULT_ERROR: 'RESULT_ERROR',
  HEATMAP_ERROR: 'RESULT_ERROR',

  CANCELLED: 'CANCELLED',
  SCAN_ABORT: 'CANCELLED',

  SDK_NOT_INITIALIZED: 'SCAN_ERROR',
  SESSION_CREATION_FAILED: 'SCAN_ERROR',
  UPLOAD_FAILED: 'SCAN_ERROR',
  MEASUREMENT_ERROR: 'SCAN_ERROR',
  ALREADY_RUNNING: 'SCAN_ERROR',
  INITIALIZATION_FAILED: 'SCAN_ERROR',
  E_INITIALIZATION_FAILED: 'SCAN_ERROR',
  INTERNAL_ERROR: 'SCAN_ERROR',
  UNKNOWN_ERROR: 'SCAN_ERROR',
};

function addErrorType(error: unknown): unknown {
  if (!error || typeof error !== 'object') {
    return error;
  }

  const errorRecord = error as {
    code?: unknown;
    type?: unknown;
  };

  if (typeof errorRecord.type === 'string' && errorRecord.type.length > 0) {
    return error;
  }

  const code =
    typeof errorRecord.code === 'string'
      ? errorRecord.code
      : typeof errorRecord.code === 'number'
        ? String(errorRecord.code)
        : undefined;

  const mappedType = code ? ERROR_TYPE_BY_CODE[code] ?? 'SCAN_ERROR' : 'SCAN_ERROR';

  try {
    (errorRecord as { type: ErrorType }).type = mappedType;
    return error;
  } catch {
    return {
      ...errorRecord,
      type: mappedType,
    };
  }
}

export function initialize(licenseKey: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey).catch((error: unknown) => {
    throw addErrorType(error);
  });
}

export function scan(config: string, tireWidth?: number): Promise<string> {
  const scanPromise = tireWidth !== undefined
    ? AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, tireWidth)
    : AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, 0);

  return scanPromise.then((result: any) => {
    // Handle both old format (string) and new format (object)
    // This maintains backward compatibility
    if (typeof result === 'string') {
      return result;
    }
    return result.uuid;
  }).catch((error: unknown) => {
    throw addErrorType(error);
  });
}

// Internal function that returns full scan result with metadata
function scanInternal(config: string, tireWidth?: number): Promise<{ uuid: string; cameraDirection?: string }> {
  if (tireWidth !== undefined) {
    return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(
      config,
      tireWidth
    );
  } else {
    return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(
      config,
      0
    );
  }
}

export function isDeviceSupported(): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    return AnylineTtrMobileWrapperReactNative.isAndroidDeviceSupported();
  }
  return Promise.resolve(parseFloat(Platform.Version) >= 16.4);
}
export function getResult(measurementUuid: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getTreadDepthReportResult(
    measurementUuid
  ).catch((error: unknown) => {
    throw addErrorType(error);
  });
}
export function getHeatMap(measurementUuid: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getHeatMap(measurementUuid).catch((error: unknown) => {
    throw addErrorType(error);
  });
}

export function addScanEventListener(
  callback: (event: ScanEvent) => void
): EmitterSubscription {
  return eventEmitter.addListener('TireTreadScanEvent', callback);
}

export function removeScanEventListener(
  subscription: EmitterSubscription
): void {
  subscription.remove();
}

export enum OrientationLock {
  Landscape = 'landscape',
  None = 'none',
}

export function setOrientationLock(orientation: OrientationLock): void {
  AnylineTtrMobileWrapperReactNative.setOrientationLock(orientation);
}

export function scanWithEvents(
  config: string,
  tireWidth?: number,
  onEvent?: (event: ScanEvent) => void
): Promise<ScanResult> {
  let subscription: EmitterSubscription | null = null;
  let capturedCameraDirection: CameraDirection | undefined;

  if (onEvent) {
    subscription = addScanEventListener((event) => {
      if (event.type === 'scanStarted' && event.cameraDirection) {
        capturedCameraDirection = event.cameraDirection;
      }
      onEvent(event);
    });
  }

  return scanInternal(config, tireWidth)
    .then((result) => {
      subscription?.remove();
      return {
        measurementUUID: result.uuid,
        cameraDirection: (result.cameraDirection as CameraDirection) || capturedCameraDirection,
      };
    })
    .catch((error) => {
      subscription?.remove();
      throw addErrorType(error);
    });
}
