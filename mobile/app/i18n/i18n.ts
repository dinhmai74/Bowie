import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import * as React from 'react'
import { default as en } from './en.json'
import { default as ja } from './ja.json'
import { default as vi } from './vi.json'

i18n.fallbacks = true
export const langTranslations = { en, vi, ja }

i18n.translations = langTranslations

i18n.locale = Localization.locale || 'en'

export { i18n }

export const LocalizationContext = React.createContext(null)

type Locale = keyof typeof langTranslations

interface LocalizationState {
  t: (v: string, options?: any) => string
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocalization = (): LocalizationState => React.useContext(LocalizationContext)
