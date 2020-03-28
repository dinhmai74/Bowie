import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { useTheme } from "@ui-kitten/components"
import { AppThemeContext as ThemeContext, useThemes } from "../../theme"
import { useSafeArea } from "react-native-safe-area-context"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets["fixed"]
  const style = props.style || {}
  const theme = useTheme()
  const themeContext = React.useContext(ThemeContext)
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {
      backgroundColor: theme["background-basic-color-1"],
    }
  const Wrapper = props.unsafe ? View : View
  const insets = useSafeArea()
  const wrapperStyle = props.unsafe ? null : { paddingTop: insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={
          props.statusBar || themeContext.theme === "light" ? "dark-content" : "light-content"
        }
      />
      <Wrapper style={[preset.outer, wrapperStyle, backgroundStyle]} removeClippedSubviews={false}>
        {props.children}
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets["scroll"]
  const style = props.style || {}
  const theme = useTheme()
  const themeContext = React.useContext(ThemeContext)
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {
      backgroundColor: theme["background-basic-color-1"],
    }

  const Wrapper = props.unsafe ? View : View
  const insets = useSafeArea()
  const wrapperStyle = props.unsafe ? null : { paddingTop: insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={
          props.statusBar || themeContext.theme === "light" ? "dark-content" : "light-content"
        }
      />
      <Wrapper style={[preset.outer, wrapperStyle, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </Wrapper>
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
