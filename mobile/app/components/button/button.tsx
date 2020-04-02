import { Button as KTButton, useStyleSheet } from "@ui-kitten/components"
import { flatten, mergeAll } from "ramda"
import * as React from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { translate } from "../../i18n"
import { TextPresets, ViewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

export const Button: React.FC<ButtonProps> = props => {
  const renderLoading = () => {
    const { loadingColor, loadingSize } = props
    return <ActivityIndicator size={loadingSize} color={loadingColor || "#fff"} />
  }

  const {
    preset = "primary",
    tx,
    txOptions,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    full,
    loading,
    onPress: onPressProps,
    ...rest
  } = props

  const textPresets = useStyleSheet(TextPresets)
  const viewPresets = useStyleSheet(ViewPresets)

  const notFullStyle: ViewStyle = !full && { alignSelf: "flex-start" }
  const opacity = disabled ? 0.2 : 1
  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, notFullStyle, styleOverride, { opacity }]),
  )
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  let content: any
  const customProps = {}

  if (loading) {
    Object.assign(customProps, {
      icon: () => renderLoading(),
    })
  } else {
    if (typeof children === "string") {
      content = translate(children, txOptions)
    } else content = children || text || (tx && translate(tx))
  }

  return (
    <KTButton
      style={viewStyle}
      {...{ textStyle }}
      onPress={!disabled && onPressProps}
      activeOpacity={disabled ? opacity : 0.5}
      {...rest}
      {...customProps}
    >
      {content}
    </KTButton>
  )
}
