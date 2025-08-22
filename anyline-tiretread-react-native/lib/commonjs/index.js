"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeatMap = getHeatMap;
exports.getResult = getResult;
exports.initialize = initialize;
exports.isDeviceSupported = isDeviceSupported;
exports.scan = scan;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'anyline-ttr-mobile-wrapper-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const AnylineTtrMobileWrapperReactNative = _reactNative.NativeModules.AnylineTtrMobileWrapperReactNative ? _reactNative.NativeModules.AnylineTtrMobileWrapperReactNative : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function initialize(licenseKey) {
  return AnylineTtrMobileWrapperReactNative.initTireTread(licenseKey);
}
function scan(config, tireWidth) {
  if (tireWidth !== undefined) {
    return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, tireWidth);
  } else {
    return AnylineTtrMobileWrapperReactNative.startTireTreadScanActivity(config, 0);
  }
}
function isDeviceSupported() {
  if (_reactNative.Platform.OS !== 'ios') {
    return AnylineTtrMobileWrapperReactNative.isAndroidDeviceSupported();
  }
  return Promise.resolve(parseFloat(_reactNative.Platform.Version) >= 16.4);
}
function getResult(measurementUuid) {
  return AnylineTtrMobileWrapperReactNative.getTreadDepthReportResult(measurementUuid);
}
function getHeatMap(measurementUuid) {
  return AnylineTtrMobileWrapperReactNative.getHeatMap(measurementUuid);
}
//# sourceMappingURL=index.js.map