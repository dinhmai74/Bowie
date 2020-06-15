// In App.js in a new project
import './utils/ignore-warnings'
import './i18n'
import { mapping } from '@eva-design/eva'
import { NavigationContainerRef } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { i18n, LocalizationContext } from 'i18n/i18n'
import { translate } from 'i18n/translate'
import { RootStore } from 'models/root-store/root-store'
import { RootStoreProvider } from 'models/root-store/root-store-context'
import { setupRootStore } from 'models/root-store/setup-root-store'
import {
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from 'navigation/navigation-utilities'
import { RootNavigator } from 'navigation/root-navigator'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Text } from 'react-native'
import { initialWindowSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloOfflineProvider } from 'react-offix-hooks'
import { offlineClient } from 'services/apollo/apollo'
import { ThemeProvider } from 'styled-components'
import { AppThemeContext, themes } from 'theme'
import { FeatherIconsPack } from 'theme/custom-eva-icons/feather-icon'
import { IoniconsPack } from 'theme/custom-eva-icons/ionicons'
import { initFonts } from 'theme/fonts'
import * as storage from './utils/storage'
import { enableScreens } from 'react-native-screens'
import { SnackBarProvider } from 'hooks/app-snackbar-provider/AppSnackbarProvider'

enableScreens()

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const THEME_PERSISTENCE_KEY = 'THEME_STATE'
const LOCALE_PERSISTENCE_KEY = 'LOCALE_STATE'
const exitRoutes = ['welcome']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

function App() {
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(undefined)
  const [theme, setTheme] = React.useState('light')
  const [locale, setLocale] = React.useState('en')

  const navigationRef = React.useRef<NavigationContainerRef>()
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  React.useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
      await initFonts()

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

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    storage.save(THEME_PERSISTENCE_KEY, nextTheme)
  }

  if (!rootStore) return <Text>Loading</Text>

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
