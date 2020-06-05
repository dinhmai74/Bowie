import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { metrics } from 'theme/metrics'
// import Icon from "react-native-vector-icons/Feather"

function NewIcon({ name, style, size, onPress, Icon, ...rest }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style || {})
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={name}
          size={height || size || metrics.icon.md}
          color={tintColor}
          style={iconStyle}
          {...rest}
        />
      </TouchableOpacity>
    )
  }
  return (
    <Icon
      name={name}
      size={height || size || metrics.icon.md}
      color={tintColor}
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
