import { palette } from "./palette"
import { Color } from "./color-model"
import { darkColor, lightColor } from "./custom-color"

export const color: Color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  ...lightColor,
}

export const themes = {
  default: {
    ...color,
  } as Color,
  light: {
    ...color,
  } as Color,
  dark: {
    ...color,
    ...darkColor,
  } as Color,
}

export type ColorType = typeof color
export type ThemeType = keyof typeof themes
