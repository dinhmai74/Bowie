import { mapping } from '@eva-design/eva'
import { configure, getStorybookUI } from '@storybook/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppThemeContext, themes } from '../app/theme'
import { initFonts } from '../app/theme/fonts'
import { FeatherIconsPack } from 'theme/custom-eva-icons/feather-icon'
import { IoniconsPack } from 'theme/custom-eva-icons/ionicons'
import { translate } from 'i18n'
import { LocalizationContext } from 'i18n/i18n'

// eslint-disable-next-line
declare var module

configure(() => {
  require('./storybook-registry')
}, module)

const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage: require('react-native').AsyncStorage,
})

export const StorybookUIRoot: React.FunctionComponent = () => {
  useEffect(() => {
    ;(async () => {
      await initFonts()
      // @ts-ignore
      if (typeof __TEST__ === 'undefined' || !__TEST__) {
        const Reactotron = require('../app/services/reactotron')
        const reactotron = new Reactotron.Reactotron()
        reactotron.setup()
      }
    })()
  }, [])

  const [locale, setLocale] = React.useState('en')
  const localizationContextValue = React.useMemo(
    () => ({
      t: (scope: string, options: any) => translate(scope, { locale, ...options }),
      locale,
      setLocale: (l: string) => {
        setLocale(l)
      },
    }),
    [locale],
  )

  const [theme, setTheme] = React.useState('light')

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  return (
    <LocalizationContext.Provider value={localizationContextValue}>
      <SafeAreaProvider>
        <AppThemeContext.Provider value={{ theme, toggle }}>
          <IconRegistry icons={[FeatherIconsPack, IoniconsPack]} />
          <ApplicationProvider mapping={mapping} theme={currentTheme}>
            <StorybookUI />
          </ApplicationProvider>
        </AppThemeContext.Provider>
      </SafeAreaProvider>
    </LocalizationContext.Provider>
  )
}
