import { NativeModules } from 'react-native';
const AnylineTtrMobileWrapperReactNative = NativeModules.AnylineTtrMobileWrapperReactNative;
if (!AnylineTtrMobileWrapperReactNative) {
  console.warn('Anyline TTR native module not found. Make sure the app is rebuilt after installation.');
}
export function initTireTread(licenseKey) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey);
}
export function startTireTreadScanActivity(config, tireWidth) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  const width = tireWidth !== undefined ? tireWidth : 0;
  return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, width);
}
export function isDeviceSupported() {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.isDeviceSupported();
}
export function getTreadDepthReportResult(measurementUuid) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.getTreadDepthReportResult(measurementUuid);
}
//# sourceMappingURL=index.js.map