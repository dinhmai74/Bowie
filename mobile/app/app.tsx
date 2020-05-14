// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import { mapping } from "@eva-design/eva"
import { NavigationContainerRef } from "@react-navigation/native"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { i18n } from "i18n/i18n"
import { contains } from "ramda"
import React, { useEffect, useRef, useState } from "react"
import { ApolloProvider } from "react-apollo"
import { YellowBox } from "react-native"
import { initialWindowSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import { ApolloOfflineProvider } from "react-offix-hooks"
import { strings } from "utils"
import { offlineClient } from "./config/apollo"
import "./i18n"
import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import { exitRoutes, RootNavigator, setRootNavigation } from "./navigation"
import getActiveRouteName from "./navigation/get-active-routename"
import { useBackButtonHandler } from "./navigation/use-back-button-handler"
import { AppThemeContext, themes } from "./theme"
import { FeatherIconsPack } from "./theme/custom-eva-icons/feather-icon"
import { IoniconsPack } from "./theme/custom-eva-icons/ionicons"
import { initFonts } from "./theme/fonts"
import * as storage from "./utils/storage"
import { loadString } from "./utils/storage"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
  "Can't perform a React state",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App: React.FunctionComponent<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [initialized, setInitialized] = useState(false)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(true)
  const [theme, setTheme] = React.useState("light")

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)

  /**
   * Keep track of state changes
   * Track Screens
   * Persist State
   */
  const routeNameRef = useRef()
  const onNavigationStateChange = state => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.tron.log(currentRouteName)
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName

    // Persist state to storage
    storage.save(NAVIGATION_PERSISTENCE_KEY, state)
  }

  useEffect(() => {
    ;(async () => {
      await initFonts()
      setupRootStore().then(setRootStore)
      i18n.locale = await loadString(strings.lang)
    })()
    offlineClient.init().then(() => setInitialized(true))
  }, [])

  useEffect(() => {
    const restoreState = async () => {
      try {
        const state = await storage.load(NAVIGATION_PERSISTENCE_KEY)

        if (state) {
          setInitialNavigationState(state)
        }
      } finally {
        setIsRestoringNavigationState(false)
      }
    }

    if (isRestoringNavigationState) {
      restoreState()
    }
  }, [isRestoringNavigationState])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore || !initialized) {
    return null
  }

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  return (
    <ApolloOfflineProvider client={offlineClient}>
      <ApolloProvider client={offlineClient}>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <IconRegistry icons={[IoniconsPack, FeatherIconsPack]} />
            <AppThemeContext.Provider value={{ theme, toggle }}>
              <ApplicationProvider mapping={mapping} theme={currentTheme}>
                <RootNavigator
                  ref={navigationRef}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </ApplicationProvider>
            </AppThemeContext.Provider>
          </SafeAreaProvider>
        </RootStoreProvider>
      </ApolloProvider>
    </ApolloOfflineProvider>
  )
}

export default App
