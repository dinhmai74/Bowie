import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  StatusBarStyle,
  SafeAreaView,
} from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { useThemes } from "theme"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.fixed
  const style = props.style || {}
  const { color, theme } = useThemes()
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : color["background-basic-color-1"]
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  const isDark = theme === "dark"
  let statusBar: StatusBarStyle = "dark-content"
  if (props.statusBar) statusBar = props.statusBar
  else if (isDark) statusBar = "light-content"
  else if (insets.top === 0) statusBar = "light-content"

  return (
    <KeyboardAvoidingView
      style={[preset.outer, { backgroundColor }]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={statusBar} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
      <SafeAreaView style={{ backgroundColor }} />
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const { color, theme } = useThemes()
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : color["background-basic-color-1"]
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  const isDark = theme === "dark"
  let statusBar: StatusBarStyle = "dark-content"
  if (props.statusBar) statusBar = props.statusBar
  else if (isDark) statusBar = "light-content"
  else if (insets.top === 0) statusBar = "light-content"

  return (
    <KeyboardAvoidingView
      style={[preset.outer, { backgroundColor }]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={statusBar} />
      <View style={[preset.outer, { backgroundColor }, insetStyle]}>
        <ScrollView
          style={[preset.outer, { backgroundColor }]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </View>
      <SafeAreaView style={{ backgroundColor }} />
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
