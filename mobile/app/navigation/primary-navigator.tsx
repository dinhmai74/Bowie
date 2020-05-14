import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CreateNewEventScreen } from 'screens'
import { HomeStack } from './home-navigator'

const Stack = createStackNavigator()

export function PrimaryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    >
      <Stack.Screen name="homeStack" component={HomeStack} />
      <Stack.Screen name="createNewEvent" component={CreateNewEventScreen} />
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
export const exitRoutes: string[] = ['homeStack']
