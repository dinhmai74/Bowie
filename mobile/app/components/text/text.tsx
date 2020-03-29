import * as React from "react"
// import { Text as KittenText } from "@ui-kitten/components"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "i18n"
import { mergeAll, flatten } from "ramda"
import { useThemes } from "theme"

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
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  let content: any
  if (typeof children === "string") {
    content = translate(children, txOptions)
  } else content = children || translate(text, txOptions) || i18nText

  const { color } = useThemes()
  let defaultColor = color["text-basic-color"]
  if (colorProps) {
    defaultColor = colorProps
  } else if (themeColor) defaultColor = color[themeColor]
  const colorStyle = { color: defaultColor }

  const style = mergeAll(
    flatten([
      presets[preset],
      colorStyle,
      underline && { textDecorationLine: "underline" },
      textAlign && { textAlign },
      styleOverride,
    ]),
  )

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
