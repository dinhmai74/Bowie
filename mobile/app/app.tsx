// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import { mapping } from '@eva-design/eva'
// import { default as mapping } from './theme/ui-kitten.mapping.json'
import { NavigationContainerRef } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { i18n, LocalizationContext } from 'i18n/i18n'
import { contains } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { YellowBox } from 'react-native'
import { initialWindowSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { ApolloOfflineProvider } from 'react-offix-hooks'
import { ThemeProvider } from 'styled-components'
import { SnackBarProvider } from './hooks/app-snackbar-provider/AppSnackbarProvider'
import { translate } from './i18n'
import { RootStore, RootStoreProvider, setupRootStore } from './models/root-store'
import {
  exitRoutes,
  RootNavigator,
  setRootNavigation,
  useNavigationPersistence,
} from './navigation'
import { useBackButtonHandler } from './navigation/use-back-button-handler'
import { offlineClient } from './services/apollo/apollo'
import { AppThemeContext, themes } from './theme'
import { FeatherIconsPack } from './theme/custom-eva-icons/feather-icon'
import { IoniconsPack } from './theme/custom-eva-icons/ionicons'
import { initFonts } from './theme/fonts'
import * as storage from './utils/storage'

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  'componentWillMount is deprecated',
  'componentWillReceiveProps is deprecated',
  'Require cycle:',
  "Can't perform a React state",
  'Story with',
  'Input: unsup',
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
export const THEME_PERSISTENCE_KEY = 'THEME_STATE'
export const LOCALE_PERSISTENCE_KEY = 'LOCALE_STATE'

/**
 * This is the root component of our app.
 */
const App: React.FunctionComponent<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [theme, setTheme] = React.useState('light')
  const [locale, setLocale] = React.useState('en')

  const localizationContextValue = React.useMemo(
    () => ({
      t: (scope: string, options: any) => translate(scope, { locale, ...options }),
      locale,
      setLocale: (l: string) => {
        setLocale(l)
        storage.save(LOCALE_PERSISTENCE_KEY, l)
      },
    }),
    [locale],
  )
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)

  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  useEffect(() => {
    ;(async () => {
      await initFonts()
      setupRootStore().then(setRootStore)

      // load persist local
      const localeState = await storage.load(LOCALE_PERSISTENCE_KEY)
      if (localeState) {
        if (locale !== localeState) setLocale(localeState)
        if (i18n.locale !== localeState) i18n.locale = localeState
      }
      // load persist theme
      const storeTheme = await storage.load(THEME_PERSISTENCE_KEY)
      if (storeTheme && storeTheme !== theme) setTheme(storeTheme)
    })()
  }, [])

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    storage.save(THEME_PERSISTENCE_KEY, nextTheme)
  }

  if (!rootStore) {
    return null
  }

  return (
    <ApolloOfflineProvider client={offlineClient}>
      <ApolloProvider client={offlineClient}>
        {/* -----------normal ---------------- */}
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
          <RootStoreProvider value={rootStore}>
            {/* ----------- theme ---------------- */}
            <IconRegistry icons={[FeatherIconsPack, IoniconsPack]} />
            <AppThemeContext.Provider value={{ theme, toggle }}>
              <ApplicationProvider mapping={mapping} theme={currentTheme}>
                <ThemeProvider theme={currentTheme}>
                  {/* ----------- utils ---------------- */}

                  <SnackBarProvider>
                    <LocalizationContext.Provider value={localizationContextValue}>
                      <RootNavigator
                        ref={navigationRef}
                        initialState={initialNavigationState}
                        onStateChange={onNavigationStateChange}
                      />
                    </LocalizationContext.Provider>
                  </SnackBarProvider>
                </ThemeProvider>
              </ApplicationProvider>
            </AppThemeContext.Provider>
          </RootStoreProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </ApolloOfflineProvider>
  )
}

export default App
