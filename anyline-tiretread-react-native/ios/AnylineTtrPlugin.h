#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface AnylineTtrPlugin : NSObject

- (void)initializeWithOptions:(NSDictionary *)options
                     resolver:(RCTPromiseResolveBlock)resolve
                     rejecter:(RCTPromiseRejectBlock)reject;

- (void)scanWithOptions:(NSDictionary *)options
               resolver:(RCTPromiseResolveBlock)resolve
               rejecter:(RCTPromiseRejectBlock)reject;

- (void)getResultWithOptions:(NSDictionary *)options
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject;

- (void)getHeatmapWithOptions:(NSDictionary *)options
                     resolver:(RCTPromiseResolveBlock)resolve
                     rejecter:(RCTPromiseRejectBlock)reject;

- (void)setTestingConfigWithOptions:(NSDictionary *)options
                           resolver:(RCTPromiseResolveBlock)resolve
                           rejecter:(RCTPromiseRejectBlock)reject;

- (void)clearTestingConfigWithResolver:(RCTPromiseResolveBlock)resolve
                               rejecter:(RCTPromiseRejectBlock)reject;

- (void)sendCommentFeedbackWithOptions:(NSDictionary *)options
                              resolver:(RCTPromiseResolveBlock)resolve
                              rejecter:(RCTPromiseRejectBlock)reject;

- (void)sendTreadDepthResultFeedbackWithOptions:(NSDictionary *)options
                                       resolver:(RCTPromiseResolveBlock)resolve
                                       rejecter:(RCTPromiseRejectBlock)reject;

- (void)sendTireIdFeedbackWithOptions:(NSDictionary *)options
                             resolver:(RCTPromiseResolveBlock)resolve
                             rejecter:(RCTPromiseRejectBlock)reject;

- (void)getSdkVersionWithResolver:(RCTPromiseResolveBlock)resolve
                         rejecter:(RCTPromiseRejectBlock)reject;

- (void)getWrapperVersionWithResolver:(RCTPromiseResolveBlock)resolve
                             rejecter:(RCTPromiseRejectBlock)reject;

@end
