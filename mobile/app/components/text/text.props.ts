// import { TextProps as TextProperties, TextStyle } from 'react-native'
import { TextProps as TextProperties } from '@ui-kitten/components'
import { TextPresets } from './text.presets'
import { TextStyle } from 'react-native'

export interface TextProps extends TextProperties {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]
  preset?: TextPresets
  color?: string
  themeColor?: string
  underline?: boolean
  children?: any
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  fontFamily?: string
  maxLength?: number
}
