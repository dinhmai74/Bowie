import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
// import Icon from "react-native-vector-icons/Feather"

function NewIcon({
  name,
  style,
  size,
  fill,
  width,
  height: PHeight,
  color,
  onPress,
  Icon,
  ...rest
}) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style || {})
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={name}
          size={height || size || width || PHeight}
          color={tintColor || fill || color}
          style={iconStyle}
          {...rest}
        />
      </TouchableOpacity>
    )
  }
  return (
    <Icon
      name={name}
      size={height || size || width || PHeight}
      color={tintColor || fill || color}
      style={iconStyle}
      {...rest}
    />
  )
}

const IconProvider = (name, Icon) => ({
  toReactElement: props => NewIcon({ name, Icon, ...props }),
})

export function createIconsMap(Icon) {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name, Icon)
      },
    },
  )
}
