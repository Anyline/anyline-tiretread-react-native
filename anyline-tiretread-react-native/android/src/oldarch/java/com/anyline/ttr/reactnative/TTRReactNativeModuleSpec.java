package com.anyline.ttr.reactnative;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public abstract class TTRReactNativeModuleSpec extends ReactContextBaseJavaModule implements TurboModule {

  protected TTRReactNativeModuleSpec(ReactApplicationContext context) {
    super(context);
  }

  @ReactMethod
  public abstract void initialize(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void scan(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void getResult(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void getHeatmap(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void setTestingConfig(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void clearTestingConfig(Promise promise);

  @ReactMethod
  public abstract void sendCommentFeedback(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void sendTreadDepthResultFeedback(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void sendTireIdFeedback(ReadableMap options, Promise promise);

  @ReactMethod
  public abstract void getSdkVersion(Promise promise);

  @ReactMethod
  public abstract void getWrapperVersion(Promise promise);
}
