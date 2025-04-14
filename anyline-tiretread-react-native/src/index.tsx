import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
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
            throw new Error(LINKING_ERROR);
          },
        }
      );

export function initTireTread(licenseKey: string): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey);
}

export function startTireTreadScanActivity(
  config: string,
  tireWidth?: number
): Promise<string> {
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
export function getTreadDepthReportResult(
  measurementUuid: string
): Promise<string> {
  return AnylineTtrMobileWrapperReactNative.getTreadDepthReportResult(
    measurementUuid
  );
}
