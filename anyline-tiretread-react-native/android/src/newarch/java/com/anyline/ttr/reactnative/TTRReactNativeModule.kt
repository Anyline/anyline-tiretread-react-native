package com.anyline.ttr.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = TTRReactNativeModuleImpl.NAME)
class TTRReactNativeModule(context: ReactApplicationContext) :
  NativeAnylineTtrModuleSpec(context) {

  private val impl = TTRReactNativeModuleImpl(context)

  override fun getName(): String = TTRReactNativeModuleImpl.NAME

  override fun invalidate() {
    impl.invalidate()
    super.invalidate()
  }

  @ReactMethod
  override fun initialize(options: ReadableMap, promise: Promise) = impl.initialize(options, promise)

  @ReactMethod
  override fun scan(options: ReadableMap, promise: Promise) = impl.scan(options, promise)

  @ReactMethod
  override fun getResult(options: ReadableMap, promise: Promise) = impl.getResult(options, promise)

  @ReactMethod
  override fun getHeatmap(options: ReadableMap, promise: Promise) = impl.getHeatmap(options, promise)

  @ReactMethod
  override fun setTestingConfig(options: ReadableMap, promise: Promise) = impl.setTestingConfig(options, promise)

  @ReactMethod
  override fun clearTestingConfig(promise: Promise) = impl.clearTestingConfig(promise)

  @ReactMethod
  override fun sendCommentFeedback(options: ReadableMap, promise: Promise) = impl.sendCommentFeedback(options, promise)

  @ReactMethod
  override fun sendTreadDepthResultFeedback(options: ReadableMap, promise: Promise) = impl.sendTreadDepthResultFeedback(options, promise)

  @ReactMethod
  override fun sendTireIdFeedback(options: ReadableMap, promise: Promise) = impl.sendTireIdFeedback(options, promise)

  @ReactMethod
  override fun getSdkVersion(promise: Promise) = impl.getSdkVersion(promise)

  @ReactMethod
  override fun getWrapperVersion(promise: Promise) = impl.getWrapperVersion(promise)
}
