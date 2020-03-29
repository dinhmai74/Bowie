import { ImageStyle, ViewStyle } from "react-native"
import { IconTypes } from "./icons"

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
}
