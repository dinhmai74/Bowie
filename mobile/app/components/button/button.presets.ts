import { ViewStyle, TextStyle } from "react-native"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {}

const BASE_TEXT: TextStyle = {}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT } as TextStyle,
  link: {
    ...BASE_TEXT,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
