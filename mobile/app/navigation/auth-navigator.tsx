import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect } from "react"
import { firebaseSDK } from "services/firebase/fire-sdk"
import { SignInScreen, WelcomeScreen } from "../screens"
import { AuthParamList } from "./types"

const Stack = createNativeStackNavigator<AuthParamList>()

export function AuthStack() {
  const navigation = useNavigation()
  useEffect(() => {
    firebaseSDK.auth().then(rs => {
      if (rs) navigation.navigate("primaryStack")
    })
  })

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="signIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]
