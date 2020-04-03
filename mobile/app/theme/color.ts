import { palette } from "./palette"
import { Color } from "./color-model"
import { darkColor, lightColor } from "./custom-color"

export const colors: Color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  ...lightColor,
}

export const themes = {
  default: {
    ...colors,
  } as Color,
  light: {
    ...colors,
  } as Color,
  dark: {
    ...colors,
    ...darkColor,
  } as Color,
}

export type ColorType = typeof colors
export type ThemeType = keyof typeof themes
