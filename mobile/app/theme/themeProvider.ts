// @ts-ignore
import { useTheme } from '@ui-kitten/components'
import React, { useContext } from 'react'
import { Color } from './color-model'

export const AppThemeContext = React.createContext({
  theme: 'light',
  // eslint-disable-next-line
  toggle: () => {},
})

interface UseThemes {
  toggle: () => void
  color: Color
  theme: string
}

export const useThemes = (): UseThemes => {
  const themeContext = useContext(AppThemeContext)
  const toggle = () => {
    console.tlog('toggle theme')
    themeContext.toggle()
  }

  return {
    toggle,
    // @ts-ignore
    color: useTheme(),
    theme: themeContext.theme,
  }
}
