import { TextStyle } from 'react-native'
import { typography } from 'theme'
import { StyleService } from '@ui-kitten/components'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
}

const MEDIUM: TextStyle = {
  fontFamily: typography.medium,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const TextPresets = StyleService.create({
  /**
   * The default text styles.
   */
  default: { ...BASE },

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontFamily: typography.bold } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24, fontFamily: typography.medium } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13 } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 14 } as TextStyle,
  h1medium: {
    ...MEDIUM,
    fontSize: 32,
  },
  h2medium: {
    ...MEDIUM,
    fontSize: 24,
  } as TextStyle,
  primary: {
    ...BASE,
    color: 'text-primary-color',
  },
  h3: {
    ...MEDIUM,
    fontSize: 20,
  },
})

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof TextPresets
