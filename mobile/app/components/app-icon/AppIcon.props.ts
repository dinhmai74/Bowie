import { ImageStyle, ViewStyle } from 'react-native'
import { spacing } from 'theme'
import { getElevation } from '../../utils/get-elevation/get-elevation'
import { IconTypes } from './app-icons'

export const AppIconPresets = {
  raise: {
    containerStyle: {
      borderRadius: 30,
      padding: spacing[2],
      ...getElevation(2),
    },
  },
}

type AppIconPreset = keyof typeof AppIconPresets

export interface AppIconProps {
  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle | any[]

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle

  /**
   * The name of the icon
   */
  icon?: IconTypes
  source?: any

  /**
   * size of icon
   */
  size?: number

  /**
   * color: tint color of icon
   */
  color?: string

  /**
   * background icon
   */
  bg?: string

  onPress?: () => void
  onLongPress?: () => void
  disabled?: boolean
  opacityDisable?: number
  preset?: AppIconPreset
}
