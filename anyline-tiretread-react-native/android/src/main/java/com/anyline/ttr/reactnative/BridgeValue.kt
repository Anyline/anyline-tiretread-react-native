package com.anyline.ttr.reactnative

import android.os.Bundle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

internal object BridgeValue {

  fun toBundle(map: Map<String, Any?>): Bundle {
    val out = Bundle()
    for ((key, value) in map) {
      when (value) {
        null -> out.putString(key, null)
        is String -> out.putString(key, value)
        is Boolean -> out.putBoolean(key, value)
        is Int -> out.putInt(key, value)
        is Long -> out.putLong(key, value)
        is Double -> out.putDouble(key, value)
        is Float -> out.putDouble(key, value.toDouble())
        is Map<*, *> -> {
          @Suppress("UNCHECKED_CAST")
          out.putBundle(key, toBundle(value as Map<String, Any?>))
        }
        is List<*> -> out.putParcelableArrayList(key, toBundleArrayList(value))
        else -> out.putString(key, value.toString())
      }
    }
    return out
  }

  fun toWritableMap(map: Map<String, Any?>): WritableMap {
    val out = Arguments.createMap()
    for ((key, value) in map) {
      when (value) {
        null -> out.putNull(key)
        is String -> out.putString(key, value)
        is Boolean -> out.putBoolean(key, value)
        is Int -> out.putInt(key, value)
        is Long -> out.putDouble(key, value.toDouble())
        is Double -> out.putDouble(key, value)
        is Float -> out.putDouble(key, value.toDouble())
        is Map<*, *> -> {
          @Suppress("UNCHECKED_CAST")
          out.putMap(key, toWritableMap(value as Map<String, Any?>))
        }
        is List<*> -> out.putArray(key, toWritableArray(value))
        else -> out.putString(key, value.toString())
      }
    }
    return out
  }

  private fun toBundleArrayList(list: List<*>): ArrayList<Bundle> {
    val out = ArrayList<Bundle>(list.size)
    for (value in list) {
      when (value) {
        is Map<*, *> -> {
          @Suppress("UNCHECKED_CAST")
          out.add(toBundle(value as Map<String, Any?>))
        }
      }
    }
    return out
  }

  private fun toWritableArray(list: List<*>): WritableArray {
    val out = Arguments.createArray()
    list.forEach { value ->
      when (value) {
        null -> out.pushNull()
        is String -> out.pushString(value)
        is Boolean -> out.pushBoolean(value)
        is Int -> out.pushInt(value)
        is Long -> out.pushDouble(value.toDouble())
        is Double -> out.pushDouble(value)
        is Float -> out.pushDouble(value.toDouble())
        is Map<*, *> -> {
          @Suppress("UNCHECKED_CAST")
          out.pushMap(toWritableMap(value as Map<String, Any?>))
        }
        is List<*> -> out.pushArray(toWritableArray(value))
        else -> out.pushString(value.toString())
      }
    }
    return out
  }
}

