"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreadDepthReportResult = getTreadDepthReportResult;
exports.initTireTread = initTireTread;
exports.isDeviceSupported = isDeviceSupported;
exports.startTireTreadScanActivity = startTireTreadScanActivity;
var _reactNative = require("react-native");
const AnylineTtrMobileWrapperReactNative = _reactNative.NativeModules.AnylineTtrMobileWrapperReactNative;
if (!AnylineTtrMobileWrapperReactNative) {
  console.warn('Anyline TTR native module not found. Make sure the app is rebuilt after installation.');
}
function initTireTread(licenseKey) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey);
}
function startTireTreadScanActivity(config, tireWidth) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  const width = tireWidth !== undefined ? tireWidth : 0;
  return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, width);
}
function isDeviceSupported() {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.isDeviceSupported();
}
function getTreadDepthReportResult(measurementUuid) {
  if (!AnylineTtrMobileWrapperReactNative) {
    return Promise.reject(new Error('Anyline native module not found'));
  }
  return AnylineTtrMobileWrapperReactNative.getTreadDepthReportResult(measurementUuid);
}
//# sourceMappingURL=index.js.map