import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { CreateNewEventScreen } from "screens"
import { HomeStack } from "./home-navigator"
import { PrimaryParamList } from "navigation/types"

const NativeStack = createNativeStackNavigator<PrimaryParamList>()

const Stack = createStackNavigator()

export function PrimaryStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    >
      <NativeStack.Screen name="homeStack" component={HomeStack} />
      <NativeStack.Screen name="createNewEvent" component={CreateNewEventScreen} />
    </NativeStack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["homeStack"]
