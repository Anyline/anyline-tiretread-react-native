package com.anyline.ttr.reactnative

import android.content.Context
import android.widget.FrameLayout
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ViewModelStore
import androidx.lifecycle.ViewModelStoreOwner
import androidx.lifecycle.setViewTreeLifecycleOwner
import androidx.lifecycle.setViewTreeViewModelStoreOwner
import androidx.savedstate.SavedStateRegistryOwner
import androidx.savedstate.setViewTreeSavedStateRegistryOwner
import io.anyline.tiretread.sdk.scanner.TireTreadScanView

class TTRReactNativeCustomComposeContainer(context: Context) : FrameLayout(context) {
  private val composeView = ComposeView(context).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  init {
    addView(composeView)

    // Ensure this container is associated with the necessary lifecycle owners
    (context as? LifecycleOwner)?.let { owner ->
      this.setViewTreeLifecycleOwner(owner)
      this.setViewTreeViewModelStoreOwner(object : ViewModelStoreOwner {
        override val viewModelStore: ViewModelStore
          get() = ViewModelStore()
      })
      this.setViewTreeSavedStateRegistryOwner(owner as? SavedStateRegistryOwner)
    }

    // Set the content of your Compose view to include the TireTreadScanView
    composeView.setContent {
      AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { ctx ->
          // Creating an instance of TireTreadScanView
          TireTreadScanView(ctx).apply {
            // Initialize your view with necessary parameters
          }
        },
        update = { view ->
          // Update the view properties if needed when Compose recomposes
        }
      )
    }
  }
}

@Composable
fun TireTreadScanViewComposeAdapter(context: Context) {
  // Assuming TireTreadScanView can be used directly as a composable.
  // If not, additional integration may be required.
  AndroidView(
    factory = { ctx ->
      TireTreadScanView(ctx).apply {
        // configure your view if needed
      }
    },
    update = { view ->
      // Update the view during recompositions if necessary
    }
  )
}
