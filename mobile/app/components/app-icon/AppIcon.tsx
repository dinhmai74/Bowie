import * as React from "react"
import { View, Image, ImageStyle, StyleSheet } from "react-native"
import { AppIconProps } from "./AppIcon.props"
import { AppIcons } from "./app-icons"
import { flatten, mergeAll } from "ramda"
import { color, metrics } from "theme"
import { TouchableOpacity } from "react-native-gesture-handler"

export * from "./AppIcon.props"

const ROOT: ImageStyle = {
  resizeMode: "contain",
  backgroundColor: color.transparent,
}

export function AppIcon(props: AppIconProps) {
  const {
    style: styleOverride,
    icon,
    size,
    bg,
    color,
    containerStyle,
    onPress,
    source,
    onLongPress,
    disabled,
    opacityDisable,
  } = props
  const imageSize = size || metrics.icon.md
  const sizeImage = { width: imageSize, height: imageSize }
  const bgImage = bg && { backgroundColor: bg }
  const colorImage = color && { tintColor: color }

  // @ts-ignore
  const style: ImageStyle = mergeAll(flatten([ROOT, sizeImage, colorImage, styleOverride]))

  const renderIcon = () => {
    return (
      // eslint-disable-next-line
      <View style={[bgImage, containerStyle, { opacity: disabled ? opacityDisable : 1 }]}>
        <Image
          style={style}
          // @ts-ignore
          source={source || AppIcons[icon]}
        />
      </View>
    )
  }

  const renderTouchableIcon = () => {
    return (
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        {renderIcon()}
      </TouchableOpacity>
    )
  }

  if (onPress && !disabled) return renderTouchableIcon()

  return renderIcon()
}

AppIcon.defaultProps = {
  disabled: false,
  opacityDisable: 0.3,
}
