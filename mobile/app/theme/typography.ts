import { Platform } from 'react-native'

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: 'BalooDa2', android: 'BalooDa2' }),
  secondary: Platform.select({ ios: 'Montserrat', android: 'Montserrat' }),
  medium: Platform.select({ ios: 'BalooDa2-Medium', android: 'BalooDa2-Medium' }),
  bold: Platform.select({ ios: 'BalooDa2-Bold', android: 'BalooDa2-Bold' }),
  Bold: Platform.select({ ios: 'BalooDa2-Bold', android: 'BalooDa2-Bold' }),
  SemiBold: Platform.select({ ios: 'BalooDa2-SemiBold', android: 'BalooDa2-SemiBold' }),
  ExtraBold: Platform.select({ ios: 'BalooDa2-ExtraBold', android: 'BalooDa2-ExtraBold' }),
}
