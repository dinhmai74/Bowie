import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { AuthStack } from "./auth-navigator"
import { PrimaryStack } from "./primary-navigator"
import { RootParamList } from "./types"
import { firebaseSDK } from "services/firebase/fire-sdk"
import { loadString, saveString, remove } from "utils/storage"
import { strings, nDelay } from "utils"

export const AuthContext = React.createContext(null)

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await loadString(strings.token)
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }

    bootstrapAsync()
  })

  const authContext = React.useMemo(
    () => ({
      signIn: async (data, successCb, failedCb) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await firebaseSDK.login(data, successCb, failedCb)
        await nDelay(1500)
        await saveString(strings.token, "dummy-auth-token")
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
      signOut: async () => {
        await firebaseSDK.signOut()
        await remove(strings.token)
        dispatch({ type: "SIGN_OUT" })
      },
      signUp: async (data, successCb, failedCb) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
    }),
    [],
  )

  console.tlog("user", state.userToken)

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {state.userToken == null ? (
          <Stack.Screen
            name="authStack"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="primaryStack"
            component={PrimaryStack}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
