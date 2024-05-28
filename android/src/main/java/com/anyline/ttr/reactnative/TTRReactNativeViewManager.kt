package com.anyline.ttr.reactnative

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager


class TTRReactNativeViewManager: ViewGroupManager<TTRReactNativeCustomComposeContainer>() {

    override fun getName(): String {
        return "TireTreadScanView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): TTRReactNativeCustomComposeContainer {
      return TTRReactNativeCustomComposeContainer(reactContext)
    }

}
