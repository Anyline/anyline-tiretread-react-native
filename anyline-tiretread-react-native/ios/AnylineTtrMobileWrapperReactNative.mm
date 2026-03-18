#ifdef RCT_NEW_ARCH_ENABLED
#import <AnylineTtrMobileWrapperReactNativeSpec/AnylineTtrMobileWrapperReactNativeSpec.h>
#endif

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AnylineTtrMobileWrapperReactNative, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(scan:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getResult:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getHeatmap:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setTestingConfig:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearTestingConfig:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sendCommentFeedback:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sendTreadDepthResultFeedback:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sendTireIdFeedback:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSdkVersion:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getWrapperVersion:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface AnylineTtrMobileWrapperReactNative (NativeAnylineTtrModuleSpecConformance) <NativeAnylineTtrModuleSpec>
@end

@implementation AnylineTtrMobileWrapperReactNative (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAnylineTtrModuleSpecJSI>(params);
}

@end
#endif
