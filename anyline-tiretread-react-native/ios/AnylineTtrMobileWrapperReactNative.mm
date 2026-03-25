#import "AnylineTtrMobileWrapperReactNative.h"
#import "AnylineTtrPlugin.h"

@interface AnylineTtrMobileWrapperReactNative ()

@property(nonatomic, strong) AnylineTtrPlugin *plugin;

@end

@implementation AnylineTtrMobileWrapperReactNative

RCT_EXPORT_MODULE()

- (instancetype)init
{
  self = [super init];
  if (self) {
    _plugin = [AnylineTtrPlugin new];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(initialize:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin initializeWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(scan:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin scanWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getResult:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin getResultWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getHeatmap:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin getHeatmapWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setTestingConfig:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin setTestingConfigWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(clearTestingConfig:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin clearTestingConfigWithResolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(sendCommentFeedback:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin sendCommentFeedbackWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(sendTreadDepthResultFeedback:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin sendTreadDepthResultFeedbackWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(sendTireIdFeedback:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin sendTireIdFeedbackWithOptions:options resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getSdkVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin getSdkVersionWithResolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getWrapperVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.plugin getWrapperVersionWithResolver:resolve rejecter:reject];
}

@end
