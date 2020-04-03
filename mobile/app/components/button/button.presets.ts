import { ViewStyle, TextStyle, StyleSheet } from "react-native"
import { spacing } from "theme"
import { StyleService } from "@ui-kitten/components"

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
export const ViewPresets = StyleService.create({
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW },

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
  },
  ghostWithPrimaryBg: {
    paddingVertical: spacing[4],
    backgroundColor: "color-primary-100",
    borderColor: "none",
    borderWidth: 0,
  },
})

export const TextPresets = StyleService.create({
  primary: { ...BASE_TEXT } as TextStyle,
  link: {
    ...BASE_TEXT,
  } as TextStyle,
  ghostWithPrimaryBg: {
    color: "color-primary-500",
  },
})

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
