package com.anyline.ttr.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = TTRReactNativeModuleImpl.NAME)
class TTRReactNativeModule(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  private val impl = TTRReactNativeModuleImpl(context)

  override fun getName(): String = TTRReactNativeModuleImpl.NAME

  override fun invalidate() {
    impl.invalidate()
    super.invalidate()
  }

  @ReactMethod
  fun initialize(options: ReadableMap, promise: Promise) = impl.initialize(options, promise)

  @ReactMethod
  fun scan(options: ReadableMap, promise: Promise) = impl.scan(options, promise)

  @ReactMethod
  fun getResult(options: ReadableMap, promise: Promise) = impl.getResult(options, promise)

  @ReactMethod
  fun getHeatmap(options: ReadableMap, promise: Promise) = impl.getHeatmap(options, promise)

  @ReactMethod
  fun setTestingConfig(options: ReadableMap, promise: Promise) = impl.setTestingConfig(options, promise)

  @ReactMethod
  fun clearTestingConfig(promise: Promise) = impl.clearTestingConfig(promise)

  @ReactMethod
  fun sendCommentFeedback(options: ReadableMap, promise: Promise) = impl.sendCommentFeedback(options, promise)

  @ReactMethod
  fun sendTreadDepthResultFeedback(options: ReadableMap, promise: Promise) =
    impl.sendTreadDepthResultFeedback(options, promise)

  @ReactMethod
  fun sendTireIdFeedback(options: ReadableMap, promise: Promise) = impl.sendTireIdFeedback(options, promise)

  @ReactMethod
  fun getSdkVersion(promise: Promise) = impl.getSdkVersion(promise)

  @ReactMethod
  fun getWrapperVersion(promise: Promise) = impl.getWrapperVersion(promise)
}
