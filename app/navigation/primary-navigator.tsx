import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
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
export const exitRoutes: string[] = ["demo"]
