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

export function initialize(licenseKey: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey);
}

export function scan(config: string, tireWidth?: number): Promise<string> {
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
  );
}
export function getHeatMap(measurementUuid: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getHeatMap(measurementUuid);
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

  return scan(config, tireWidth)
    .then((uuid) => {
      subscription?.remove();
      return {
        measurementUUID: uuid,
        cameraDirection: capturedCameraDirection,
      };
    })
    .catch((error) => {
      subscription?.remove();
      throw error;
    });
}
