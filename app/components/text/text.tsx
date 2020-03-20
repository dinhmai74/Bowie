import * as React from "react"
import { Text as ReactNativeText, useTheme } from "@ui-kitten/components"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "i18n"
import { mergeAll, flatten } from "ramda"

export const Text = (props: TextProps) => {
  // grab the props
  const {
    preset,
    tx,
    color,
    themeColor,
    txOptions,
    text,
    children,
    style: styleOverride,
    underline,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  let content: any
  if (typeof children === "string") {
    content = translate(children, txOptions)
  } else content = children || translate(text, txOptions) || i18nText
  const theme = useTheme()

  let colorStyle: any
  if (themeColor || color) {
    colorStyle = themeColor ? { color: theme[themeColor] } : { color }
  }
  const style = mergeAll(
    flatten([
      presets[preset],
      colorStyle,
      underline && { textDecorationLine: "underline" },
      styleOverride,
    ]),
  )

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
