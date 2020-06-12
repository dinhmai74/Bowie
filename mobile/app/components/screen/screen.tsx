import * as React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StatusBarStyle } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { ScreenProps } from './screen.props'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { spacing, useThemes } from 'theme'
import { View } from '../view/view'

const isIos = Platform.OS === 'ios'

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.fixed
  const { theme } = useThemes()
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  const isLight = theme === 'light'
  let statusBar: StatusBarStyle = 'light-content'
  if (props.statusBar) statusBar = props.statusBar
  else if (isLight && insets.top !== 0) statusBar = 'dark-content'

  const { autoPaddingHorizontal, bgBaseOnTheme } = props
  const paddingHorizontal = autoPaddingHorizontal && { paddingHorizontal: spacing[6] }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={statusBar || 'light-content'} />
      <View
        style={[preset.inner, style, paddingHorizontal, insetStyle]}
        bgBaseOnTheme={bgBaseOnTheme}
      >
        {props.children}
      </View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const { color, theme } = useThemes()
  const preset = presets.scroll
  const style = props.style || {}
  const { autoPaddingHorizontal, bgBaseOnTheme } = props

  const isLight = theme === 'light'
  let statusBar: StatusBarStyle = 'light-content'
  if (props.statusBar) statusBar = props.statusBar
  else if (isLight && insets.top !== 0) statusBar = 'dark-content'

  let backgroundStyle: any = bgBaseOnTheme && { backgroundColor: color['background-basic-color-1'] }
  backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : backgroundStyle
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const paddingHorizontal = autoPaddingHorizontal && { paddingHorizontal: spacing[6] }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={statusBar || 'light-content'} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, paddingHorizontal, style]}
        >
          {props.children}
        </ScrollView>
      </View>
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
