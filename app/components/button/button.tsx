import { Button as KTButton, Spinner } from "@ui-kitten/components"
import { flatten, mergeAll } from "ramda"
import * as React from "react"
import { textPresets, viewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { translate } from "../../i18n"
import { ViewStyle, ActivityIndicator } from "react-native"

export class Button extends React.Component<ButtonProps> {
  static defaultProps: any

  renderLoading() {
    const { loadingColor, loadingSize } = this.props
    console.log("loadingColor", loadingColor)
    return <ActivityIndicator size={loadingSize} color={loadingColor || "#fff"} />
  }

  render() {
    const {
      preset = "primary",
      tx,
      txOptions,
      text,
      style: styleOverride,
      textStyle: textStyleOverride,
      children,
      full,
      loading,
      ...rest
    } = this.props

    const notFullStyle: ViewStyle = !full && { alignSelf: "flex-start" }
    const viewStyle = mergeAll(
      flatten([viewPresets[preset] || viewPresets.primary, notFullStyle, styleOverride]),
    )
    const textStyle = mergeAll(
      flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
    )

    let content: any
    const customProps = {}

    if (loading) {
      Object.assign(customProps, {
        icon: () => this.renderLoading(),
      })
    } else {
      if (typeof children === "string") {
        content = translate(children, txOptions)
      } else content = children || text || (tx && translate(tx))
    }

    return (
      <KTButton style={viewStyle} textStyle={textStyle} {...rest} {...customProps}>
        {content}
      </KTButton>
    )
  }
}

Button.defaultProps = {}
