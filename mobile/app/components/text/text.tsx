import * as React from 'react'
// import { Text as KittenText } from "@ui-kitten/components"
import { Text as ReactNativeText } from 'react-native'
import { TextPresets } from './text.presets'
import { TextProps } from './text.props'
import { translate } from 'i18n'
import { mergeAll, flatten } from 'ramda'
import { useThemes } from 'theme'
import { useStyleSheet } from '@ui-kitten/components'

export const Text = (props: TextProps) => {
  // grab the props
  const {
    preset,
    tx,
    color: colorProps,
    themeColor,
    txOptions,
    text,
    children,
    style: styleOverride,
    underline,
    textAlign,
    fontFamily,
    maxLength,
    ...rest
  } = props

  const presets: any = useStyleSheet(TextPresets)

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  let content: string
  if (typeof children === 'string') {
    content = translate(children, txOptions)
  } else content = children || translate(text, txOptions) || i18nText

  const { color } = useThemes()
  let defaultColor: string
  if (colorProps) {
    defaultColor = colorProps
  } else if (themeColor) defaultColor = color[themeColor]

  const style: any = mergeAll(
    flatten([
      presets[preset] || presets.default,
      defaultColor && { color: defaultColor },
      underline && { textDecorationLine: 'underline' },
      textAlign && { textAlign },
      fontFamily && { fontFamily },
      styleOverride,
    ]),
  )

  if (maxLength && content.length > maxLength) {
    content = content.slice(0, maxLength)
    content += ' ...'
  }

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
