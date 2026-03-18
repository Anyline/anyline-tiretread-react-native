package com.anyline.ttr.reactnative

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class TTRReactNativePackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == TTRReactNativeModuleImpl.NAME) {
      TTRReactNativeModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      mapOf(
        TTRReactNativeModuleImpl.NAME to ReactModuleInfo(
          TTRReactNativeModuleImpl.NAME,
          TTRReactNativeModuleImpl.NAME,
          false, // canOverrideExistingModule
          false, // needsEagerInit
          false, // isCxxModule
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED // isTurboModule
        )
      )
    }
  }
}
