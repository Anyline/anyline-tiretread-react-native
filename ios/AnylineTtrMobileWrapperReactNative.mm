#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AnylineTtrMobileWrapperReactNative, NSObject)

RCT_EXTERN_METHOD(initTireTread:(NSString)licenseKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(startTireTreadScanActivity:(NSString)config
                 tireWidth:(NSInteger)tireWidth
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getTreadDepthReportResult:(NSString)measurementUuid
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
