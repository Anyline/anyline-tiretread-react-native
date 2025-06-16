#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSError.h>
#import <Foundation/NSObject.h>
#import <Foundation/NSSet.h>
#import <Foundation/NSString.h>
#import <Foundation/NSValue.h>

@class ATTSAnylineTireTreadSdk, ATTSKotlinThrowable, ATTSKotlinArray<T>, ATTSKotlinException, ATTSResponse<T>, ATTSKotlinEnumCompanion, ATTSKotlinEnum<E>, ATTSHeatmapStyle, ATTSScanConfigCompanion, ATTSTireTreadConfigCompanion, ATTSAdditionalContext, ATTSScanConfig, ATTSUIConfig, ATTSUIConfigCompanion, ATTSCountdownConfig, ATTSDistanceIndicatorConfig, ATTSFocusPointTooltipConfig, ATTSMeasurementSystem, ATTSMissingPermissionConfig, ATTSOrientationWarningConfig, ATTSScanDirectionConfig, ATTSScanSpeed, ATTSTapToStartScanningTooltipConfig, ATTSTireOverlayConfig, ATTSTireWidthInputConfig, ATTSUploadViewConfig, ATTSDistanceStatus, ATTSScanEvent, ATTSScanSpeedCompanion, ATTSTireTreadScannerCompanion, ATTSTireTreadConfig, ATTSTireTreadScanner, ATTSAdditionalContextCompanion, ATTSTirePosition, ATTSHeatmapCompanion, ATTSMeasurementInfoCompanion, ATTSMeasurementStatus, ATTSMeasurementStatusCompanion, ATTSTireSide, ATTSTirePositionCompanion, ATTSTireSideCompanion, ATTSTreadDepthResultCompanion, ATTSTreadResultRegion, ATTSMeasurementInfo, ATTSTreadResultRegionCompanion, ATTSWrapperInfo, ATTSCountdownConfigCompanion, ATTSDistanceIndicatorConfigCompanion, ATTSFocusPointTooltipConfigCompanion, ATTSMissingPermissionConfigCompanion, ATTSOrientationWarningConfigCompanion, ATTSScanDirectionConfigCompanion, ATTSTapToStartScanningTooltipConfigCompanion, ATTSTireOverlayConfigCompanion, ATTSTireWidthInputConfigCompanion, ATTSTireWidthRange, ATTSTireWidthRangeCompanion, ATTSUploadViewConfigCompanion, ATTSHeatmap, ATTSKotlinByteArray, ATTSTreadDepthResult, ATTSKotlinByteIterator, NSData, UIViewController, ATTSKotlinRuntimeException, ATTSKotlinx_serialization_coreSerializersModule, ATTSKotlinx_serialization_coreSerialKind, ATTSKotlinNothing;

@protocol ATTSKotlinComparable, ATTSKotlinx_serialization_coreKSerializer, ATTSKotlinIterator, ATTSKotlinx_serialization_coreEncoder, ATTSKotlinx_serialization_coreSerialDescriptor, ATTSKotlinx_serialization_coreSerializationStrategy, ATTSKotlinx_serialization_coreDecoder, ATTSKotlinx_serialization_coreDeserializationStrategy, ATTSKotlinx_serialization_coreCompositeEncoder, ATTSKotlinAnnotation, ATTSKotlinx_serialization_coreCompositeDecoder, ATTSKotlinx_serialization_coreSerializersModuleCollector, ATTSKotlinKClass, ATTSKotlinKDeclarationContainer, ATTSKotlinKAnnotatedElement, ATTSKotlinKClassifier;

NS_ASSUME_NONNULL_BEGIN
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunknown-warning-option"
#pragma clang diagnostic ignored "-Wincompatible-property-type"
#pragma clang diagnostic ignored "-Wnullability"

#pragma push_macro("_Nullable_result")
#if !__has_feature(nullability_nullable_result)
#undef _Nullable_result
#define _Nullable_result _Nullable
#endif

__attribute__((swift_name("KotlinBase")))
@interface ATTSBase : NSObject
- (instancetype)init __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
+ (void)initialize __attribute__((objc_requires_super));
@end

@interface ATTSBase (ATTSBaseCopying) <NSCopying>
@end

__attribute__((swift_name("KotlinMutableSet")))
@interface ATTSMutableSet<ObjectType> : NSMutableSet<ObjectType>
@end

__attribute__((swift_name("KotlinMutableDictionary")))
@interface ATTSMutableDictionary<KeyType, ObjectType> : NSMutableDictionary<KeyType, ObjectType>
@end

@interface NSError (NSErrorATTSKotlinException)
@property (readonly) id _Nullable kotlinException;
@end

__attribute__((swift_name("KotlinNumber")))
@interface ATTSNumber : NSNumber
- (instancetype)initWithChar:(char)value __attribute__((unavailable));
- (instancetype)initWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
- (instancetype)initWithShort:(short)value __attribute__((unavailable));
- (instancetype)initWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
- (instancetype)initWithInt:(int)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
- (instancetype)initWithLong:(long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
- (instancetype)initWithLongLong:(long long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
- (instancetype)initWithFloat:(float)value __attribute__((unavailable));
- (instancetype)initWithDouble:(double)value __attribute__((unavailable));
- (instancetype)initWithBool:(BOOL)value __attribute__((unavailable));
- (instancetype)initWithInteger:(NSInteger)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
+ (instancetype)numberWithChar:(char)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
+ (instancetype)numberWithShort:(short)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
+ (instancetype)numberWithInt:(int)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
+ (instancetype)numberWithLong:(long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
+ (instancetype)numberWithLongLong:(long long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
+ (instancetype)numberWithFloat:(float)value __attribute__((unavailable));
+ (instancetype)numberWithDouble:(double)value __attribute__((unavailable));
+ (instancetype)numberWithBool:(BOOL)value __attribute__((unavailable));
+ (instancetype)numberWithInteger:(NSInteger)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
@end

__attribute__((swift_name("KotlinByte")))
@interface ATTSByte : ATTSNumber
- (instancetype)initWithChar:(char)value;
+ (instancetype)numberWithChar:(char)value;
@end

__attribute__((swift_name("KotlinUByte")))
@interface ATTSUByte : ATTSNumber
- (instancetype)initWithUnsignedChar:(unsigned char)value;
+ (instancetype)numberWithUnsignedChar:(unsigned char)value;
@end

__attribute__((swift_name("KotlinShort")))
@interface ATTSShort : ATTSNumber
- (instancetype)initWithShort:(short)value;
+ (instancetype)numberWithShort:(short)value;
@end

__attribute__((swift_name("KotlinUShort")))
@interface ATTSUShort : ATTSNumber
- (instancetype)initWithUnsignedShort:(unsigned short)value;
+ (instancetype)numberWithUnsignedShort:(unsigned short)value;
@end

__attribute__((swift_name("KotlinInt")))
@interface ATTSInt : ATTSNumber
- (instancetype)initWithInt:(int)value;
+ (instancetype)numberWithInt:(int)value;
@end

__attribute__((swift_name("KotlinUInt")))
@interface ATTSUInt : ATTSNumber
- (instancetype)initWithUnsignedInt:(unsigned int)value;
+ (instancetype)numberWithUnsignedInt:(unsigned int)value;
@end

__attribute__((swift_name("KotlinLong")))
@interface ATTSLong : ATTSNumber
- (instancetype)initWithLongLong:(long long)value;
+ (instancetype)numberWithLongLong:(long long)value;
@end

__attribute__((swift_name("KotlinULong")))
@interface ATTSULong : ATTSNumber
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value;
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value;
@end

__attribute__((swift_name("KotlinFloat")))
@interface ATTSFloat : ATTSNumber
- (instancetype)initWithFloat:(float)value;
+ (instancetype)numberWithFloat:(float)value;
@end

__attribute__((swift_name("KotlinDouble")))
@interface ATTSDouble : ATTSNumber
- (instancetype)initWithDouble:(double)value;
+ (instancetype)numberWithDouble:(double)value;
@end

__attribute__((swift_name("KotlinBoolean")))
@interface ATTSBoolean : ATTSNumber
- (instancetype)initWithBool:(BOOL)value;
+ (instancetype)numberWithBool:(BOOL)value;
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("AnylineTireTreadSdk")))
@interface ATTSAnylineTireTreadSdk : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)anylineTireTreadSdk __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSAnylineTireTreadSdk *shared __attribute__((swift_name("shared")));
- (void)clearExperimentalFlags __attribute__((swift_name("clearExperimentalFlags()")));
- (void)setExperimentalFlagsNewFlags:(NSArray<NSString *> *)newFlags __attribute__((swift_name("setExperimentalFlags(newFlags:)")));
@property BOOL isInitialized __attribute__((swift_name("isInitialized")));
@property (readonly) NSString *sdkVersion __attribute__((swift_name("sdkVersion")));
@end

__attribute__((swift_name("KotlinThrowable")))
@interface ATTSKotlinThrowable : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.experimental.ExperimentalNativeApi
*/
- (ATTSKotlinArray<NSString *> *)getStackTrace __attribute__((swift_name("getStackTrace()")));
- (void)printStackTrace __attribute__((swift_name("printStackTrace()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) ATTSKotlinThrowable * _Nullable cause __attribute__((swift_name("cause")));
@property (readonly) NSString * _Nullable message __attribute__((swift_name("message")));
- (NSError *)asError __attribute__((swift_name("asError()")));
@end

__attribute__((swift_name("KotlinException")))
@interface ATTSKotlinException : ATTSKotlinThrowable
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("FractionDenominatorLessThanOrEqualZeroException")))
@interface ATTSFractionDenominatorLessThanOrEqualZeroException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("InvalidUuidException")))
@interface ATTSInvalidUuidException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("NoConnectionException")))
@interface ATTSNoConnectionException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("NotFractionStringException")))
@interface ATTSNotFractionStringException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("NotInchStringException")))
@interface ATTSNotInchStringException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("NullFeedbackApiException")))
@interface ATTSNullFeedbackApiException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("NullTreadDepthApiException")))
@interface ATTSNullTreadDepthApiException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((swift_name("Response")))
@interface ATTSResponse<T> : ATTSBase
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ResponseError")))
@interface ATTSResponseError<T> : ATTSResponse<T>
@property (readonly) T _Nullable data __attribute__((swift_name("data")));
@property (readonly) NSString * _Nullable errorCode __attribute__((swift_name("errorCode")));
@property (readonly) NSString * _Nullable errorMessage __attribute__((swift_name("errorMessage")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ResponseException")))
@interface ATTSResponseException<T> : ATTSResponse<T>
@property (readonly) ATTSKotlinException *exception __attribute__((swift_name("exception")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ResponseSuccess")))
@interface ATTSResponseSuccess<T> : ATTSResponse<T>
@property (readonly) T data __attribute__((swift_name("data")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanProcessNotCompletedException")))
@interface ATTSScanProcessNotCompletedException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("SdkInstanceInvalidException")))
@interface ATTSSdkInstanceInvalidException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("SdkIsNotVerifiedException")))
@interface ATTSSdkIsNotVerifiedException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("SdkLicenseKeyForbiddenException")))
@interface ATTSSdkLicenseKeyForbiddenException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("SdkLicenseKeyInvalidException")))
@interface ATTSSdkLicenseKeyInvalidException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ServerMeasurementErrorException")))
@interface ATTSServerMeasurementErrorException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((swift_name("KotlinComparable")))
@protocol ATTSKotlinComparable
@required
- (int32_t)compareToOther:(id _Nullable)other __attribute__((swift_name("compareTo(other:)")));
@end

__attribute__((swift_name("KotlinEnum")))
@interface ATTSKotlinEnum<E> : ATTSBase <ATTSKotlinComparable>
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) ATTSKotlinEnumCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(E)other __attribute__((swift_name("compareTo(other:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int32_t ordinal __attribute__((swift_name("ordinal")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("HeatmapStyle")))
@interface ATTSHeatmapStyle : ATTSKotlinEnum<ATTSHeatmapStyle *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) ATTSHeatmapStyle *colored __attribute__((swift_name("colored")));
@property (class, readonly) ATTSHeatmapStyle *grayscale __attribute__((swift_name("grayscale")));
+ (ATTSKotlinArray<ATTSHeatmapStyle *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSHeatmapStyle *> *entries __attribute__((swift_name("entries")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanConfig")))
@interface ATTSScanConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSScanConfigCompanion *companion __attribute__((swift_name("companion")));
@property ATTSHeatmapStyle *heatmapStyle __attribute__((swift_name("heatmapStyle")));
@property BOOL showMeasuringSpots __attribute__((swift_name("showMeasuringSpots")));
@property ATTSInt * _Nullable tireWidth __attribute__((swift_name("tireWidth")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanConfig.Companion")))
@interface ATTSScanConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSScanConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireTreadConfig")))
@interface ATTSTireTreadConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTireTreadConfigCompanion *companion __attribute__((swift_name("companion")));
@property ATTSAdditionalContext * _Nullable additionalContext __attribute__((swift_name("additionalContext")));
@property ATTSScanConfig *scanConfig __attribute__((swift_name("scanConfig")));
@property ATTSUIConfig *uiConfig __attribute__((swift_name("uiConfig")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireTreadConfig.Companion")))
@interface ATTSTireTreadConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireTreadConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("UIConfig")))
@interface ATTSUIConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSUIConfigCompanion *companion __attribute__((swift_name("companion")));
@property ATTSCountdownConfig *countdownConfig __attribute__((swift_name("countdownConfig")));
@property ATTSDistanceIndicatorConfig *distanceIndicatorConfig __attribute__((swift_name("distanceIndicatorConfig")));
@property ATTSFocusPointTooltipConfig *focusPointTooltipConfig __attribute__((swift_name("focusPointTooltipConfig")));
@property ATTSMeasurementSystem *measurementSystem __attribute__((swift_name("measurementSystem")));
@property ATTSMissingPermissionConfig *missingPermissionConfig __attribute__((swift_name("missingPermissionConfig")));
@property ATTSOrientationWarningConfig *orientationWarningConfig __attribute__((swift_name("orientationWarningConfig")));
@property ATTSScanDirectionConfig *scanDirectionConfig __attribute__((swift_name("scanDirectionConfig")));
@property ATTSScanSpeed *scanSpeed __attribute__((swift_name("scanSpeed")));
@property ATTSTapToStartScanningTooltipConfig *tapToStartScanningTooltipConfig __attribute__((swift_name("tapToStartScanningTooltipConfig")));
@property ATTSTireOverlayConfig *tireOverlayConfig __attribute__((swift_name("tireOverlayConfig")));
@property ATTSTireWidthInputConfig *tireWidthInputConfig __attribute__((swift_name("tireWidthInputConfig")));
@property ATTSUploadViewConfig *uploadViewConfig __attribute__((swift_name("uploadViewConfig")));
@property BOOL useDefaultHaptic __attribute__((swift_name("useDefaultHaptic")));
@property BOOL useDefaultUi __attribute__((swift_name("useDefaultUi")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("UIConfig.Companion")))
@interface ATTSUIConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSUIConfigCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("DistanceStatus")))
@interface ATTSDistanceStatus : ATTSKotlinEnum<ATTSDistanceStatus *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) ATTSDistanceStatus *ok __attribute__((swift_name("ok")));
@property (class, readonly) ATTSDistanceStatus *tooClose __attribute__((swift_name("tooClose")));
@property (class, readonly) ATTSDistanceStatus *tooFar __attribute__((swift_name("tooFar")));
@property (class, readonly) ATTSDistanceStatus *unknown __attribute__((swift_name("unknown")));
+ (ATTSKotlinArray<ATTSDistanceStatus *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSDistanceStatus *> *entries __attribute__((swift_name("entries")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MeasurementSystem")))
@interface ATTSMeasurementSystem : ATTSKotlinEnum<ATTSMeasurementSystem *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) ATTSMeasurementSystem *metric __attribute__((swift_name("metric")));
@property (class, readonly) ATTSMeasurementSystem *imperial __attribute__((swift_name("imperial")));
+ (ATTSKotlinArray<ATTSMeasurementSystem *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSMeasurementSystem *> *entries __attribute__((swift_name("entries")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((swift_name("ScanEvent")))
@interface ATTSScanEvent : ATTSBase
@property (readonly) NSString * _Nullable measurementUUID __attribute__((swift_name("measurementUUID")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OnDistanceChanged")))
@interface ATTSOnDistanceChanged : ATTSScanEvent
- (instancetype)initWithMeasurementUUID:(NSString * _Nullable)measurementUUID previousStatus:(ATTSDistanceStatus *)previousStatus newStatus:(ATTSDistanceStatus *)newStatus previousDistance:(float)previousDistance newDistance:(float)newDistance __attribute__((swift_name("init(measurementUUID:previousStatus:newStatus:previousDistance:newDistance:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable measurementUUID __attribute__((swift_name("measurementUUID")));
@property (readonly, getter=doNewDistance) float newDistance __attribute__((swift_name("newDistance")));
@property (readonly, getter=doNewStatus) ATTSDistanceStatus *newStatus __attribute__((swift_name("newStatus")));
@property (readonly) float previousDistance __attribute__((swift_name("previousDistance")));
@property (readonly) ATTSDistanceStatus *previousStatus __attribute__((swift_name("previousStatus")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OnFocusFound")))
@interface ATTSOnFocusFound : ATTSScanEvent
- (instancetype)initWithMeasurementUUID:(NSString * _Nullable)measurementUUID __attribute__((swift_name("init(measurementUUID:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable measurementUUID __attribute__((swift_name("measurementUUID")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OnImageUploaded")))
@interface ATTSOnImageUploaded : ATTSScanEvent
- (instancetype)initWithMeasurementUUID:(NSString *)measurementUUID uploaded:(int32_t)uploaded total:(int32_t)total __attribute__((swift_name("init(measurementUUID:uploaded:total:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *measurementUUID __attribute__((swift_name("measurementUUID")));
@property (readonly) int32_t total __attribute__((swift_name("total")));
@property (readonly) int32_t uploaded __attribute__((swift_name("uploaded")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OnScanStarted")))
@interface ATTSOnScanStarted : ATTSScanEvent
- (instancetype)initWithMeasurementUUID:(NSString *)measurementUUID __attribute__((swift_name("init(measurementUUID:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *measurementUUID __attribute__((swift_name("measurementUUID")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OnScanStopped")))
@interface ATTSOnScanStopped : ATTSScanEvent
- (instancetype)initWithMeasurementUUID:(NSString *)measurementUUID __attribute__((swift_name("init(measurementUUID:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *measurementUUID __attribute__((swift_name("measurementUUID")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanSpeed")))
@interface ATTSScanSpeed : ATTSKotlinEnum<ATTSScanSpeed *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) ATTSScanSpeedCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) ATTSScanSpeed *fast __attribute__((swift_name("fast")));
@property (class, readonly) ATTSScanSpeed *slow __attribute__((swift_name("slow")));
+ (ATTSKotlinArray<ATTSScanSpeed *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSScanSpeed *> *entries __attribute__((swift_name("entries")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanSpeed.Companion")))
@interface ATTSScanSpeedCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSScanSpeedCompanion *shared __attribute__((swift_name("shared")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializerTypeParamsSerializers:(ATTSKotlinArray<id<ATTSKotlinx_serialization_coreKSerializer>> *)typeParamsSerializers __attribute__((swift_name("serializer(typeParamsSerializers:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireTreadScanner")))
@interface ATTSTireTreadScanner : ATTSBase
@property (class, readonly, getter=companion) ATTSTireTreadScannerCompanion *companion __attribute__((swift_name("companion")));
- (void)abortScanning __attribute__((swift_name("abortScanning()")));
- (void)startScanning __attribute__((swift_name("startScanning()")));
- (void)stopScanning __attribute__((swift_name("stopScanning()")));
@property ATTSDistanceStatus *captureDistanceStatus __attribute__((swift_name("captureDistanceStatus")));
@property (readonly) BOOL isScanning __attribute__((swift_name("isScanning")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireTreadScanner.Companion")))
@interface ATTSTireTreadScannerCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireTreadScannerCompanion *shared __attribute__((swift_name("shared")));

/**
 * @note This method converts instances of IllegalArgumentException, SdkIsNotVerifiedException, SdkInstanceInvalidException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (BOOL)doInitConfig:(ATTSTireTreadConfig *)config error:(NSError * _Nullable * _Nullable)error onScanAborted:(void (^)(NSString * _Nullable))onScanAborted onScanProcessCompleted:(void (^)(NSString *))onScanProcessCompleted callback:(void (^ _Nullable)(ATTSScanEvent *))callback onError:(void (^)(NSString * _Nullable, ATTSKotlinException *))onError __attribute__((swift_name("doInit(config:onScanAborted:onScanProcessCompleted:callback:onError:)")));
- (void)doInitConfig:(NSString *)config onScanAborted:(void (^)(NSString * _Nullable))onScanAborted onScanProcessCompleted:(void (^)(NSString *))onScanProcessCompleted callback:(void (^ _Nullable)(ATTSScanEvent *))callback onError:(void (^)(NSString * _Nullable, ATTSKotlinException *))onError __attribute__((swift_name("doInit(config:onScanAborted:onScanProcessCompleted:callback:onError_:)")));
@property ATTSTireTreadScanner *instance __attribute__((swift_name("instance")));
@property BOOL isInitialized __attribute__((swift_name("isInitialized")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("AdditionalContext")))
@interface ATTSAdditionalContext : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSAdditionalContextCompanion *companion __attribute__((swift_name("companion")));
@property NSString * _Nullable correlationId __attribute__((swift_name("correlationId")));
@property ATTSTirePosition * _Nullable tirePosition __attribute__((swift_name("tirePosition")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("AdditionalContext.Companion")))
@interface ATTSAdditionalContextCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSAdditionalContextCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScannerFileHandle")))
@interface ATTSScannerFileHandle : ATTSBase
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Heatmap")))
@interface ATTSHeatmap : ATTSBase
@property (class, readonly, getter=companion) ATTSHeatmapCompanion *companion __attribute__((swift_name("companion")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *url __attribute__((swift_name("url")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Heatmap.Companion")))
@interface ATTSHeatmapCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSHeatmapCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MeasurementInfo")))
@interface ATTSMeasurementInfo : ATTSBase
@property (class, readonly, getter=companion) ATTSMeasurementInfoCompanion *companion __attribute__((swift_name("companion")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) ATTSAdditionalContext * _Nullable additionalContext __attribute__((swift_name("additionalContext")));
@property (readonly) NSString *measurementUuid __attribute__((swift_name("measurementUuid")));
@property (readonly) ATTSMeasurementStatus *status __attribute__((swift_name("status")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MeasurementInfo.Companion")))
@interface ATTSMeasurementInfoCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSMeasurementInfoCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MeasurementStatus")))
@interface ATTSMeasurementStatus : ATTSKotlinEnum<ATTSMeasurementStatus *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) ATTSMeasurementStatusCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) ATTSMeasurementStatus *unknown __attribute__((swift_name("unknown")));
@property (class, readonly) ATTSMeasurementStatus *waitingforimages __attribute__((swift_name("waitingforimages")));
@property (class, readonly) ATTSMeasurementStatus *processing __attribute__((swift_name("processing")));
@property (class, readonly) ATTSMeasurementStatus *resultready __attribute__((swift_name("resultready")));
@property (class, readonly) ATTSMeasurementStatus *resultandreportready __attribute__((swift_name("resultandreportready")));
@property (class, readonly) ATTSMeasurementStatus *completed __attribute__((swift_name("completed")));
@property (class, readonly) ATTSMeasurementStatus *aborted __attribute__((swift_name("aborted")));
@property (class, readonly) ATTSMeasurementStatus *failed __attribute__((swift_name("failed")));
+ (ATTSKotlinArray<ATTSMeasurementStatus *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSMeasurementStatus *> *entries __attribute__((swift_name("entries")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MeasurementStatus.Companion")))
@interface ATTSMeasurementStatusCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSMeasurementStatusCompanion *shared __attribute__((swift_name("shared")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializerTypeParamsSerializers:(ATTSKotlinArray<id<ATTSKotlinx_serialization_coreKSerializer>> *)typeParamsSerializers __attribute__((swift_name("serializer(typeParamsSerializers:)")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TirePosition")))
@interface ATTSTirePosition : ATTSBase
- (instancetype)initWithAxle:(int32_t)axle side:(ATTSTireSide *)side positionOnAxle:(int32_t)positionOnAxle __attribute__((swift_name("init(axle:side:positionOnAxle:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) ATTSTirePositionCompanion *companion __attribute__((swift_name("companion")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
@property (readonly) int32_t axle __attribute__((swift_name("axle")));
@property (readonly) int32_t positionOnAxle __attribute__((swift_name("positionOnAxle")));
@property (readonly) ATTSTireSide *side __attribute__((swift_name("side")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TirePosition.Companion")))
@interface ATTSTirePositionCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTirePositionCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireSide")))
@interface ATTSTireSide : ATTSKotlinEnum<ATTSTireSide *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) ATTSTireSideCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) ATTSTireSide *left __attribute__((swift_name("left")));
@property (class, readonly) ATTSTireSide *right __attribute__((swift_name("right")));
@property (class, readonly) ATTSTireSide *center __attribute__((swift_name("center")));
+ (ATTSKotlinArray<ATTSTireSide *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<ATTSTireSide *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireSide.Companion")))
@interface ATTSTireSideCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireSideCompanion *shared __attribute__((swift_name("shared")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializerTypeParamsSerializers:(ATTSKotlinArray<id<ATTSKotlinx_serialization_coreKSerializer>> *)typeParamsSerializers __attribute__((swift_name("serializer(typeParamsSerializers:)")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TreadDepthResult")))
@interface ATTSTreadDepthResult : ATTSBase
@property (class, readonly, getter=companion) ATTSTreadDepthResultCompanion *companion __attribute__((swift_name("companion")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) ATTSTreadResultRegion *global __attribute__((swift_name("global")));
@property (readonly) ATTSMeasurementInfo *measurementInfo __attribute__((swift_name("measurementInfo")));
@property (readonly) ATTSTreadResultRegion *minimumValue __attribute__((swift_name("minimumValue")));
@property (readonly) NSArray<ATTSTreadResultRegion *> *regions __attribute__((swift_name("regions")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TreadDepthResult.Companion")))
@interface ATTSTreadDepthResultCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTreadDepthResultCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TreadResultRegion")))
@interface ATTSTreadResultRegion : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTreadResultRegionCompanion *companion __attribute__((swift_name("companion")));
- (NSString *)toJson __attribute__((swift_name("toJson()")));
@property (readonly) BOOL isAvailable __attribute__((swift_name("isAvailable")));
@property (readonly) double valueInch __attribute__((swift_name("valueInch")));
@property (readonly) int32_t valueInch32nds __attribute__((swift_name("valueInch32nds")));
@property (readonly) double valueMm __attribute__((swift_name("valueMm")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TreadResultRegion.Companion")))
@interface ATTSTreadResultRegionCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTreadResultRegionCompanion *shared __attribute__((swift_name("shared")));
- (ATTSTreadResultRegion *)fromJsonJson:(NSString *)json __attribute__((swift_name("fromJson(json:)")));
- (ATTSTreadResultRegion *)doInitGlobalInchValue:(double)value __attribute__((swift_name("doInitGlobalInch(value:)")));
- (ATTSTreadResultRegion *)doInitGlobalMmValue:(double)value __attribute__((swift_name("doInitGlobalMm(value:)")));
- (ATTSTreadResultRegion *)doInitInchIsAvailable:(BOOL)isAvailable value:(double)value __attribute__((swift_name("doInitInch(isAvailable:value:)")));
- (ATTSTreadResultRegion *)doInitInch32ndsIsAvailable:(BOOL)isAvailable value:(int32_t)value __attribute__((swift_name("doInitInch32nds(isAvailable:value:)")));
- (ATTSTreadResultRegion *)doInitMmIsAvailable:(BOOL)isAvailable value:(double)value __attribute__((swift_name("doInitMm(isAvailable:value:)")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((swift_name("WrapperInfo")))
@interface ATTSWrapperInfo : ATTSBase
@property (readonly) NSString *version __attribute__((swift_name("version")));
@property (readonly) NSString *wrapperType __attribute__((swift_name("wrapperType")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("WrapperInfo.Cordova")))
@interface ATTSWrapperInfoCordova : ATTSWrapperInfo
- (instancetype)initWithVersion:(NSString *)version __attribute__((swift_name("init(version:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("WrapperInfo.DotNet")))
@interface ATTSWrapperInfoDotNet : ATTSWrapperInfo
- (instancetype)initWithVersion:(NSString *)version __attribute__((swift_name("init(version:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("WrapperInfo.Flutter")))
@interface ATTSWrapperInfoFlutter : ATTSWrapperInfo
- (instancetype)initWithVersion:(NSString *)version __attribute__((swift_name("init(version:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("WrapperInfo.InstantApp")))
@interface ATTSWrapperInfoInstantApp : ATTSWrapperInfo
- (instancetype)initWithVersion:(NSString *)version __attribute__((swift_name("init(version:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("WrapperInfo.ReactNative")))
@interface ATTSWrapperInfoReactNative : ATTSWrapperInfo
- (instancetype)initWithVersion:(NSString *)version __attribute__((swift_name("init(version:)"))) __attribute__((objc_designated_initializer));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("CountdownConfig")))
@interface ATTSCountdownConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSCountdownConfigCompanion *companion __attribute__((swift_name("companion")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("CountdownConfig.Companion")))
@interface ATTSCountdownConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSCountdownConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("DistanceIndicatorConfig")))
@interface ATTSDistanceIndicatorConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSDistanceIndicatorConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *textMoveAway __attribute__((swift_name("textMoveAway")));
@property NSString *textMoveCloser __attribute__((swift_name("textMoveCloser")));
@property NSString *textOk __attribute__((swift_name("textOk")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("DistanceIndicatorConfig.Companion")))
@interface ATTSDistanceIndicatorConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSDistanceIndicatorConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("FocusPointTooltipConfig")))
@interface ATTSFocusPointTooltipConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSFocusPointTooltipConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *smallText __attribute__((swift_name("smallText")));
@property NSString *text __attribute__((swift_name("text")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("FocusPointTooltipConfig.Companion")))
@interface ATTSFocusPointTooltipConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSFocusPointTooltipConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MissingPermissionConfig")))
@interface ATTSMissingPermissionConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSMissingPermissionConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *text __attribute__((swift_name("text")));
@property NSString *title __attribute__((swift_name("title")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("MissingPermissionConfig.Companion")))
@interface ATTSMissingPermissionConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSMissingPermissionConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OrientationWarningConfig")))
@interface ATTSOrientationWarningConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSOrientationWarningConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *rotationLockHint __attribute__((swift_name("rotationLockHint")));
@property NSString *text __attribute__((swift_name("text")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OrientationWarningConfig.Companion")))
@interface ATTSOrientationWarningConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSOrientationWarningConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanDirectionConfig")))
@interface ATTSScanDirectionConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSScanDirectionConfigCompanion *companion __attribute__((swift_name("companion")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ScanDirectionConfig.Companion")))
@interface ATTSScanDirectionConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSScanDirectionConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TapToStartScanningTooltipConfig")))
@interface ATTSTapToStartScanningTooltipConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTapToStartScanningTooltipConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *textNotOkImperial __attribute__((swift_name("textNotOkImperial")));
@property NSString *textNotOkMetric __attribute__((swift_name("textNotOkMetric")));
@property NSString *textOk __attribute__((swift_name("textOk")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TapToStartScanningTooltipConfig.Companion")))
@interface ATTSTapToStartScanningTooltipConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTapToStartScanningTooltipConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireOverlayConfig")))
@interface ATTSTireOverlayConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTireOverlayConfigCompanion *companion __attribute__((swift_name("companion")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireOverlayConfig.Companion")))
@interface ATTSTireOverlayConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireOverlayConfigCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireWidthInputConfig")))
@interface ATTSTireWidthInputConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTireWidthInputConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *continueButtonText __attribute__((swift_name("continueButtonText")));
@property NSString *explanationText __attribute__((swift_name("explanationText")));
@property ATTSInt * _Nullable prefilledTireWidth __attribute__((swift_name("prefilledTireWidth")));
@property NSString *skipButtonText __attribute__((swift_name("skipButtonText")));
@property NSArray<ATTSInt *> *tireWidthOptions __attribute__((swift_name("tireWidthOptions")));
@property ATTSTireWidthRange *tireWidthRange __attribute__((swift_name("tireWidthRange")));
@property NSString *titleText __attribute__((swift_name("titleText")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireWidthInputConfig.Companion")))
@interface ATTSTireWidthInputConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireWidthInputConfigCompanion *shared __attribute__((swift_name("shared")));
- (id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@property (readonly) NSArray<ATTSInt *> *DEFAULT_OPTIONS __attribute__((swift_name("DEFAULT_OPTIONS")));
@property (readonly) int32_t TIRE_WIDTH_LOWER_LIMIT __attribute__((swift_name("TIRE_WIDTH_LOWER_LIMIT")));
@property (readonly) int32_t TIRE_WIDTH_UPPER_LIMIT __attribute__((swift_name("TIRE_WIDTH_UPPER_LIMIT")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireWidthRange")))
@interface ATTSTireWidthRange : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSTireWidthRangeCompanion *companion __attribute__((swift_name("companion")));
@property int32_t lowerLimit __attribute__((swift_name("lowerLimit")));
@property int32_t upperLimit __attribute__((swift_name("upperLimit")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireWidthRange.Companion")))
@interface ATTSTireWidthRangeCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSTireWidthRangeCompanion *shared __attribute__((swift_name("shared")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("UploadViewConfig")))
@interface ATTSUploadViewConfig : ATTSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) ATTSUploadViewConfigCompanion *companion __attribute__((swift_name("companion")));
@property NSString *text __attribute__((swift_name("text")));
@property BOOL visible __attribute__((swift_name("visible")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("UploadViewConfig.Companion")))
@interface ATTSUploadViewConfigCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSUploadViewConfigCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ValidationResult")))
@interface ATTSValidationResult : ATTSBase
- (instancetype)initWithIsValid:(BOOL)isValid errorMessage:(NSString * _Nullable)errorMessage __attribute__((swift_name("init(isValid:errorMessage:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSUInteger)hash __attribute__((swift_name("hash()")));

/**
 * @note annotations
 *   kotlin.native.HiddenFromObjC
*/
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable errorMessage __attribute__((swift_name("errorMessage")));
@property (readonly) BOOL isValid __attribute__((swift_name("isValid")));
@end

@interface ATTSAnylineTireTreadSdk (Extensions)
- (void)abortScanMeasurementUuid:(NSString *)measurementUuid onResponse:(void (^)(ATTSResponse<ATTSMeasurementInfo *> *))onResponse __attribute__((swift_name("abortScan(measurementUuid:onResponse:)")));
- (void)getHeatmapMeasurementUuid:(NSString *)measurementUuid timeoutSeconds:(int32_t)timeoutSeconds onResponse:(void (^)(ATTSResponse<ATTSHeatmap *> *))onResponse __attribute__((swift_name("getHeatmap(measurementUuid:timeoutSeconds:onResponse:)")));
- (void)getTreadDepthReportPdfMeasurementUuid:(NSString *)measurementUuid onResponse:(void (^)(ATTSResponse<ATTSKotlinByteArray *> *))onResponse __attribute__((swift_name("getTreadDepthReportPdf(measurementUuid:onResponse:)"))) __attribute__((deprecated("PDF reports are now deprecated and will be removed in the next versions.")));
- (void)getTreadDepthReportResultMeasurementUuid:(NSString *)measurementUuid timeoutSeconds:(int32_t)timeoutSeconds onResponse:(void (^)(ATTSResponse<ATTSTreadDepthResult *> *))onResponse __attribute__((swift_name("getTreadDepthReportResult(measurementUuid:timeoutSeconds:onResponse:)")));
- (void)getTreadDepthReportUrlStringMeasurementUuid:(NSString *)measurementUuid onResponse:(void (^)(ATTSResponse<NSString *> *))onResponse __attribute__((swift_name("getTreadDepthReportUrlString(measurementUuid:onResponse:)"))) __attribute__((deprecated("PDF reports are now deprecated and will be removed in the next versions.")));

/**
 * @note This method converts instances of SdkLicenseKeyInvalidException, SdkLicenseKeyForbiddenException, NoConnectionException, Exception to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (BOOL)doInitLicenseKey:(NSString *)licenseKey error:(NSError * _Nullable * _Nullable)error __attribute__((swift_name("doInit(licenseKey:)")));

/**
 * @note This method converts instances of SdkLicenseKeyInvalidException, SdkLicenseKeyForbiddenException, NoConnectionException, IllegalArgumentException, Exception to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (BOOL)doInitLicenseKey:(NSString *)licenseKey customTag:(NSString * _Nullable)customTag wrapperInfo:(ATTSWrapperInfo * _Nullable)wrapperInfo error:(NSError * _Nullable * _Nullable)error __attribute__((swift_name("doInit(licenseKey:customTag:wrapperInfo:)")));
- (void)sendCommentFeedbackUuid:(NSString *)uuid comment:(NSString *)comment onResponse:(void (^)(ATTSResponse<ATTSMeasurementInfo *> *))onResponse __attribute__((swift_name("sendCommentFeedback(uuid:comment:onResponse:)")));
- (void)sendTireIdFeedbackMeasurementUuid:(NSString *)measurementUuid tireId:(NSString *)tireId onResponse:(void (^)(ATTSResponse<ATTSMeasurementInfo *> *))onResponse __attribute__((swift_name("sendTireIdFeedback(measurementUuid:tireId:onResponse:)")));
- (void)sendTreadDepthResultFeedbackResultUuid:(NSString *)resultUuid treadResultRegions:(NSArray<ATTSTreadResultRegion *> *)treadResultRegions onResponse:(void (^)(ATTSResponse<ATTSMeasurementInfo *> *))onResponse __attribute__((swift_name("sendTreadDepthResultFeedback(resultUuid:treadResultRegions:onResponse:)")));

/**
 * @note This method converts instances of NullTreadDepthApiException, Exception to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (BOOL)shouldRequestTireIdFeedbackAndReturnError:(NSError * _Nullable * _Nullable)error __attribute__((swift_name("shouldRequestTireIdFeedback()"))) __attribute__((swift_error(nonnull_error)));
@end

@interface ATTSTreadDepthResult (Extensions)
- (NSString *)toJson __attribute__((swift_name("toJson()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinByteArray")))
@interface ATTSKotlinByteArray : ATTSBase
+ (instancetype)arrayWithSize:(int32_t)size __attribute__((swift_name("init(size:)")));
+ (instancetype)arrayWithSize:(int32_t)size init:(ATTSByte *(^)(ATTSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (int8_t)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (ATTSKotlinByteIterator *)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(int8_t)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end

@interface ATTSKotlinByteArray (Extensions)
- (NSData *)toNSData __attribute__((swift_name("toNSData()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("TireTreadScanViewKt")))
@interface ATTSTireTreadScanViewKt : ATTSBase
+ (UIViewController * _Nullable)TireTreadScanViewOnScanAborted:(void (^)(NSString * _Nullable))onScanAborted onScanProcessCompleted:(void (^)(NSString *))onScanProcessCompleted callback:(void (^ _Nullable)(ATTSScanEvent *))callback onError:(void (^)(NSString * _Nullable, ATTSKotlinException *))onError __attribute__((swift_name("TireTreadScanView(onScanAborted:onScanProcessCompleted:callback:onError:)")));
+ (UIViewController * _Nullable)TireTreadScanViewConfig:(ATTSTireTreadConfig *)config onScanAborted:(void (^)(NSString * _Nullable))onScanAborted onScanProcessCompleted:(void (^)(NSString *))onScanProcessCompleted callback:(void (^ _Nullable)(ATTSScanEvent *))callback onError:(void (^)(NSString * _Nullable, ATTSKotlinException *))onError __attribute__((swift_name("TireTreadScanView(config:onScanAborted:onScanProcessCompleted:callback:onError:)")));
+ (UIViewController * _Nullable)TireTreadScanViewConfig:(NSString *)config onScanAborted:(void (^)(NSString * _Nullable))onScanAborted onScanProcessCompleted:(void (^)(NSString *))onScanProcessCompleted callback:(void (^ _Nullable)(ATTSScanEvent *))callback onError_:(void (^)(NSString * _Nullable, ATTSKotlinException *))onError __attribute__((swift_name("TireTreadScanView(config:onScanAborted:onScanProcessCompleted:callback:onError_:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinArray")))
@interface ATTSKotlinArray<T> : ATTSBase
+ (instancetype)arrayWithSize:(int32_t)size init:(T _Nullable (^)(ATTSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (T _Nullable)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (id<ATTSKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(T _Nullable)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinEnumCompanion")))
@interface ATTSKotlinEnumCompanion : ATTSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) ATTSKotlinEnumCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializationStrategy")))
@protocol ATTSKotlinx_serialization_coreSerializationStrategy
@required
- (void)serializeEncoder:(id<ATTSKotlinx_serialization_coreEncoder>)encoder value:(id _Nullable)value __attribute__((swift_name("serialize(encoder:value:)")));
@property (readonly) id<ATTSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDeserializationStrategy")))
@protocol ATTSKotlinx_serialization_coreDeserializationStrategy
@required
- (id _Nullable)deserializeDecoder:(id<ATTSKotlinx_serialization_coreDecoder>)decoder __attribute__((swift_name("deserialize(decoder:)")));
@property (readonly) id<ATTSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreKSerializer")))
@protocol ATTSKotlinx_serialization_coreKSerializer <ATTSKotlinx_serialization_coreSerializationStrategy, ATTSKotlinx_serialization_coreDeserializationStrategy>
@required
@end

__attribute__((swift_name("KotlinRuntimeException")))
@interface ATTSKotlinRuntimeException : ATTSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((swift_name("KotlinIllegalArgumentException")))
@interface ATTSKotlinIllegalArgumentException : ATTSKotlinRuntimeException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(ATTSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((swift_name("KotlinIterator")))
@protocol ATTSKotlinIterator
@required
- (BOOL)hasNext __attribute__((swift_name("hasNext()")));
- (id _Nullable)next __attribute__((swift_name("next()")));
@end

__attribute__((swift_name("KotlinByteIterator")))
@interface ATTSKotlinByteIterator : ATTSBase <ATTSKotlinIterator>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (ATTSByte *)next __attribute__((swift_name("next()")));
- (int8_t)nextByte __attribute__((swift_name("nextByte()")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreEncoder")))
@protocol ATTSKotlinx_serialization_coreEncoder
@required
- (id<ATTSKotlinx_serialization_coreCompositeEncoder>)beginCollectionDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor collectionSize:(int32_t)collectionSize __attribute__((swift_name("beginCollection(descriptor:collectionSize:)")));
- (id<ATTSKotlinx_serialization_coreCompositeEncoder>)beginStructureDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (void)encodeBooleanValue:(BOOL)value __attribute__((swift_name("encodeBoolean(value:)")));
- (void)encodeByteValue:(int8_t)value __attribute__((swift_name("encodeByte(value:)")));
- (void)encodeCharValue:(unichar)value __attribute__((swift_name("encodeChar(value:)")));
- (void)encodeDoubleValue:(double)value __attribute__((swift_name("encodeDouble(value:)")));
- (void)encodeEnumEnumDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor index:(int32_t)index __attribute__((swift_name("encodeEnum(enumDescriptor:index:)")));
- (void)encodeFloatValue:(float)value __attribute__((swift_name("encodeFloat(value:)")));
- (id<ATTSKotlinx_serialization_coreEncoder>)encodeInlineDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("encodeInline(descriptor:)")));
- (void)encodeIntValue:(int32_t)value __attribute__((swift_name("encodeInt(value:)")));
- (void)encodeLongValue:(int64_t)value __attribute__((swift_name("encodeLong(value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNotNullMark __attribute__((swift_name("encodeNotNullMark()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNull __attribute__((swift_name("encodeNull()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNullableSerializableValueSerializer:(id<ATTSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableValue(serializer:value:)")));
- (void)encodeSerializableValueSerializer:(id<ATTSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableValue(serializer:value:)")));
- (void)encodeShortValue:(int16_t)value __attribute__((swift_name("encodeShort(value:)")));
- (void)encodeStringValue:(NSString *)value __attribute__((swift_name("encodeString(value:)")));
@property (readonly) ATTSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerialDescriptor")))
@protocol ATTSKotlinx_serialization_coreSerialDescriptor
@required

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (NSArray<id<ATTSKotlinAnnotation>> *)getElementAnnotationsIndex:(int32_t)index __attribute__((swift_name("getElementAnnotations(index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<ATTSKotlinx_serialization_coreSerialDescriptor>)getElementDescriptorIndex:(int32_t)index __attribute__((swift_name("getElementDescriptor(index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (int32_t)getElementIndexName:(NSString *)name __attribute__((swift_name("getElementIndex(name:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (NSString *)getElementNameIndex:(int32_t)index __attribute__((swift_name("getElementName(index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)isElementOptionalIndex:(int32_t)index __attribute__((swift_name("isElementOptional(index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
@property (readonly) NSArray<id<ATTSKotlinAnnotation>> *annotations __attribute__((swift_name("annotations")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
@property (readonly) int32_t elementsCount __attribute__((swift_name("elementsCount")));
@property (readonly) BOOL isInline __attribute__((swift_name("isInline")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
@property (readonly) BOOL isNullable __attribute__((swift_name("isNullable")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
@property (readonly) ATTSKotlinx_serialization_coreSerialKind *kind __attribute__((swift_name("kind")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
@property (readonly) NSString *serialName __attribute__((swift_name("serialName")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDecoder")))
@protocol ATTSKotlinx_serialization_coreDecoder
@required
- (id<ATTSKotlinx_serialization_coreCompositeDecoder>)beginStructureDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (BOOL)decodeBoolean __attribute__((swift_name("decodeBoolean()")));
- (int8_t)decodeByte __attribute__((swift_name("decodeByte()")));
- (unichar)decodeChar __attribute__((swift_name("decodeChar()")));
- (double)decodeDouble __attribute__((swift_name("decodeDouble()")));
- (int32_t)decodeEnumEnumDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor __attribute__((swift_name("decodeEnum(enumDescriptor:)")));
- (float)decodeFloat __attribute__((swift_name("decodeFloat()")));
- (id<ATTSKotlinx_serialization_coreDecoder>)decodeInlineDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeInline(descriptor:)")));
- (int32_t)decodeInt __attribute__((swift_name("decodeInt()")));
- (int64_t)decodeLong __attribute__((swift_name("decodeLong()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)decodeNotNullMark __attribute__((swift_name("decodeNotNullMark()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (ATTSKotlinNothing * _Nullable)decodeNull __attribute__((swift_name("decodeNull()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableValueDeserializer:(id<ATTSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeNullableSerializableValue(deserializer:)")));
- (id _Nullable)decodeSerializableValueDeserializer:(id<ATTSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeSerializableValue(deserializer:)")));
- (int16_t)decodeShort __attribute__((swift_name("decodeShort()")));
- (NSString *)decodeString __attribute__((swift_name("decodeString()")));
@property (readonly) ATTSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeEncoder")))
@protocol ATTSKotlinx_serialization_coreCompositeEncoder
@required
- (void)encodeBooleanElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(BOOL)value __attribute__((swift_name("encodeBooleanElement(descriptor:index:value:)")));
- (void)encodeByteElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int8_t)value __attribute__((swift_name("encodeByteElement(descriptor:index:value:)")));
- (void)encodeCharElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(unichar)value __attribute__((swift_name("encodeCharElement(descriptor:index:value:)")));
- (void)encodeDoubleElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(double)value __attribute__((swift_name("encodeDoubleElement(descriptor:index:value:)")));
- (void)encodeFloatElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(float)value __attribute__((swift_name("encodeFloatElement(descriptor:index:value:)")));
- (id<ATTSKotlinx_serialization_coreEncoder>)encodeInlineElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("encodeInlineElement(descriptor:index:)")));
- (void)encodeIntElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int32_t)value __attribute__((swift_name("encodeIntElement(descriptor:index:value:)")));
- (void)encodeLongElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int64_t)value __attribute__((swift_name("encodeLongElement(descriptor:index:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNullableSerializableElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<ATTSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeSerializableElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<ATTSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeShortElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int16_t)value __attribute__((swift_name("encodeShortElement(descriptor:index:value:)")));
- (void)encodeStringElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(NSString *)value __attribute__((swift_name("encodeStringElement(descriptor:index:value:)")));
- (void)endStructureDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)shouldEncodeElementDefaultDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("shouldEncodeElementDefault(descriptor:index:)")));
@property (readonly) ATTSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializersModule")))
@interface ATTSKotlinx_serialization_coreSerializersModule : ATTSBase

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)dumpToCollector:(id<ATTSKotlinx_serialization_coreSerializersModuleCollector>)collector __attribute__((swift_name("dumpTo(collector:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<ATTSKotlinx_serialization_coreKSerializer> _Nullable)getContextualKClass:(id<ATTSKotlinKClass>)kClass typeArgumentsSerializers:(NSArray<id<ATTSKotlinx_serialization_coreKSerializer>> *)typeArgumentsSerializers __attribute__((swift_name("getContextual(kClass:typeArgumentsSerializers:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<ATTSKotlinx_serialization_coreSerializationStrategy> _Nullable)getPolymorphicBaseClass:(id<ATTSKotlinKClass>)baseClass value:(id)value __attribute__((swift_name("getPolymorphic(baseClass:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<ATTSKotlinx_serialization_coreDeserializationStrategy> _Nullable)getPolymorphicBaseClass:(id<ATTSKotlinKClass>)baseClass serializedClassName:(NSString * _Nullable)serializedClassName __attribute__((swift_name("getPolymorphic(baseClass:serializedClassName:)")));
@end

__attribute__((swift_name("KotlinAnnotation")))
@protocol ATTSKotlinAnnotation
@required
@end


/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
__attribute__((swift_name("Kotlinx_serialization_coreSerialKind")))
@interface ATTSKotlinx_serialization_coreSerialKind : ATTSBase
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeDecoder")))
@protocol ATTSKotlinx_serialization_coreCompositeDecoder
@required
- (BOOL)decodeBooleanElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeBooleanElement(descriptor:index:)")));
- (int8_t)decodeByteElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeByteElement(descriptor:index:)")));
- (unichar)decodeCharElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeCharElement(descriptor:index:)")));
- (int32_t)decodeCollectionSizeDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeCollectionSize(descriptor:)")));
- (double)decodeDoubleElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeDoubleElement(descriptor:index:)")));
- (int32_t)decodeElementIndexDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeElementIndex(descriptor:)")));
- (float)decodeFloatElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeFloatElement(descriptor:index:)")));
- (id<ATTSKotlinx_serialization_coreDecoder>)decodeInlineElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeInlineElement(descriptor:index:)")));
- (int32_t)decodeIntElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeIntElement(descriptor:index:)")));
- (int64_t)decodeLongElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeLongElement(descriptor:index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<ATTSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeNullableSerializableElement(descriptor:index:deserializer:previousValue:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)decodeSequentially __attribute__((swift_name("decodeSequentially()")));
- (id _Nullable)decodeSerializableElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<ATTSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeSerializableElement(descriptor:index:deserializer:previousValue:)")));
- (int16_t)decodeShortElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeShortElement(descriptor:index:)")));
- (NSString *)decodeStringElementDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeStringElement(descriptor:index:)")));
- (void)endStructureDescriptor:(id<ATTSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));
@property (readonly) ATTSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinNothing")))
@interface ATTSKotlinNothing : ATTSBase
@end


/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
__attribute__((swift_name("Kotlinx_serialization_coreSerializersModuleCollector")))
@protocol ATTSKotlinx_serialization_coreSerializersModuleCollector
@required
- (void)contextualKClass:(id<ATTSKotlinKClass>)kClass provider:(id<ATTSKotlinx_serialization_coreKSerializer> (^)(NSArray<id<ATTSKotlinx_serialization_coreKSerializer>> *))provider __attribute__((swift_name("contextual(kClass:provider:)")));
- (void)contextualKClass:(id<ATTSKotlinKClass>)kClass serializer:(id<ATTSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("contextual(kClass:serializer:)")));
- (void)polymorphicBaseClass:(id<ATTSKotlinKClass>)baseClass actualClass:(id<ATTSKotlinKClass>)actualClass actualSerializer:(id<ATTSKotlinx_serialization_coreKSerializer>)actualSerializer __attribute__((swift_name("polymorphic(baseClass:actualClass:actualSerializer:)")));
- (void)polymorphicDefaultBaseClass:(id<ATTSKotlinKClass>)baseClass defaultDeserializerProvider:(id<ATTSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefault(baseClass:defaultDeserializerProvider:)"))) __attribute__((deprecated("Deprecated in favor of function with more precise name: polymorphicDefaultDeserializer")));
- (void)polymorphicDefaultDeserializerBaseClass:(id<ATTSKotlinKClass>)baseClass defaultDeserializerProvider:(id<ATTSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefaultDeserializer(baseClass:defaultDeserializerProvider:)")));
- (void)polymorphicDefaultSerializerBaseClass:(id<ATTSKotlinKClass>)baseClass defaultSerializerProvider:(id<ATTSKotlinx_serialization_coreSerializationStrategy> _Nullable (^)(id))defaultSerializerProvider __attribute__((swift_name("polymorphicDefaultSerializer(baseClass:defaultSerializerProvider:)")));
@end

__attribute__((swift_name("KotlinKDeclarationContainer")))
@protocol ATTSKotlinKDeclarationContainer
@required
@end

__attribute__((swift_name("KotlinKAnnotatedElement")))
@protocol ATTSKotlinKAnnotatedElement
@required
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
__attribute__((swift_name("KotlinKClassifier")))
@protocol ATTSKotlinKClassifier
@required
@end

__attribute__((swift_name("KotlinKClass")))
@protocol ATTSKotlinKClass <ATTSKotlinKDeclarationContainer, ATTSKotlinKAnnotatedElement, ATTSKotlinKClassifier>
@required

/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
- (BOOL)isInstanceValue:(id _Nullable)value __attribute__((swift_name("isInstance(value:)")));
@property (readonly) NSString * _Nullable qualifiedName __attribute__((swift_name("qualifiedName")));
@property (readonly) NSString * _Nullable simpleName __attribute__((swift_name("simpleName")));
@end

#pragma pop_macro("_Nullable_result")
#pragma clang diagnostic pop
NS_ASSUME_NONNULL_END
