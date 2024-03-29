import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import {
  CreateNewEventScreen,
  EventDetailScreen,
  ViewMapScreen,
  ViewDetailProfileScreen,
} from 'screens'
import { HomeStack } from './home-navigator'
import { ChoseEventTimeScreen } from 'screens/create-new-event-screen/sub-screens/ChoseEventTimeScreen'
import { FillEventInfoScreen } from 'screens/create-new-event-screen/sub-screens/fill-event-info-screen/FillEventInfoScreen'
import { Coord } from 'app-graphql'

export type PrimaryParamList = {
  homeStack: undefined
  eventDetail: { id: string }
  detailProfile: undefined
}

export type PrimaryModalParamList = {
  primaryStack: undefined
  createNewEvent: undefined
  viewMap: {
    coord: Coord
    title: string
  }
  createNewEventTime: {
    title: string
  }
  createNewEventInfo: undefined
}

const StackWithModal = createStackNavigator<PrimaryModalParamList>()
const Stack = createStackNavigator<PrimaryParamList>()

export function PrimaryStackWithModal() {
  return (
    <StackWithModal.Navigator
      // screenOptions={{
      // headerShown: false,
      // gestureEnabled: true,
      // cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      // }}
      screenOptions={({ route, navigation }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}
      // mode="modal"
      headerMode="none"
    >
      <StackWithModal.Screen name="primaryStack" component={PrimaryStack} />
      <StackWithModal.Screen name="createNewEvent" component={CreateNewEventScreen} />
      <StackWithModal.Screen name="createNewEventTime" component={ChoseEventTimeScreen} />
      <StackWithModal.Screen name="createNewEventInfo" component={FillEventInfoScreen} />
      <StackWithModal.Screen name="viewMap" component={ViewMapScreen} />
    </StackWithModal.Navigator>
  )
}

function PrimaryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    >
      <Stack.Screen name="homeStack" component={HomeStack} />
      <Stack.Screen name="eventDetail" component={EventDetailScreen} />
      <Stack.Screen name="detailProfile" component={ViewDetailProfileScreen} />
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
