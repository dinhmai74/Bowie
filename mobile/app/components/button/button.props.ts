import { ViewStyle, TextStyle } from "react-native"
import { ButtonPresetNames } from "./button.presets"
import { ButtonProps as BaseButtonProps } from "@ui-kitten/components"

export interface ButtonProps extends BaseButtonProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string
  txOptions?: object

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames
  children?: any
  full?: boolean
  loading?: boolean
  loadingSize?: number | "small" | "large"
  loadingColor?: string
}
