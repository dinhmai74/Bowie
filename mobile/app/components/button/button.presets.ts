import { StyleService } from '@ui-kitten/components'
import { TextStyle, ViewStyle } from 'react-native'
import { spacing } from 'theme'
import { palette } from 'theme/palette'

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingVertical: spacing[3],
  borderRadius: spacing[1],
}

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
  outlineWithoutBorder: {
    ...BASE_VIEW,
    borderColor: 'none',
    borderWidth: 0,
  },
  bordered: {
    ...BASE_VIEW,
    borderWidth: 1,
    backgroundColor: palette.transparent,
  },
})

export const TextPresets = StyleService.create({
  primary: { ...BASE_TEXT } as TextStyle,
  link: {
    ...BASE_TEXT,
  } as TextStyle,
})

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof ViewPresets
