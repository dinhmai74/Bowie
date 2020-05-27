import { Text as ReactNativeText, useStyleSheet } from '@ui-kitten/components'
import { useLocalization } from 'i18n/i18n'
import { translate as i18nTranslate } from 'i18n'
import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { useThemes } from 'theme'
// import { Text as ReactNativeText } from 'react-native'
import { TextPresets } from './text.presets'
import { TextProps } from './text.props'

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
    autoTranslate,
    ...rest
  } = props
  const location = useLocalization()
  let translate
  if (location) translate = location?.t
  else translate = i18nTranslate

  const presets: any = useStyleSheet(TextPresets)

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  let content: string
  if (typeof children === 'string') {
    content = autoTranslate ? translate(children, txOptions) : children
  } else {
    const normalText = autoTranslate ? translate(text, txOptions) : text
    content = children || normalText || i18nText
  }

  const { color } = useThemes()
  let defaultColor: any
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
