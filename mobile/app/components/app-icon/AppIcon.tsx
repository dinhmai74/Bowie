import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { Image, ImageStyle, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, metrics, useThemes } from 'theme'
import { AppIcons } from './app-icons'
import { AppIconPresets, AppIconProps } from './AppIcon.props'

export * from './AppIcon.props'

const ROOT: ImageStyle = {
  resizeMode: 'contain',
  backgroundColor: colors.transparent,
}

export const AppIcon = (props: AppIconProps) => {
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
    preset,
  } = props
  const { color: theme } = useThemes()
  const imageSize = size || metrics.icon.md
  const sizeImage = { width: imageSize, height: imageSize }
  let bgImage: object
  let colorImage: object

  if (preset && preset === 'raise') {
    bgImage = { backgroundColor: theme['background-basic-color-1'] }
    colorImage = { tintColor: theme['text-basic-color'] }
  }

  if (bg) bgImage = { backgroundColor: bg }
  if (color) colorImage = { tintColor: color }

  // @ts-ignore
  const style: ImageStyle = mergeAll(flatten([ROOT, sizeImage, colorImage, styleOverride]))

  const renderIcon = () => {
    return (
      <View
        style={[
          bgImage,
          preset && AppIconPresets[preset].containerStyle,
          containerStyle,
          // eslint-disable-next-line
          { opacity: disabled ? opacityDisable : 1 },
        ]}
      >
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
