import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { AppIcon } from 'components'
import React from 'react'
import { SafeAreaView } from 'react-native'
// import { PrimaryParamList } from "./types"
import { useThemes } from 'theme'
import { HomeScreen, NotificationsScreen, SavedScreen, SettingsScreen } from '../screens'
import { AppRoutes } from 'utils/strings'

export type HomeParamList = {
  Home: undefined
  Saved: undefined
  Notifications: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<HomeParamList>()

const tabs = ['home', 'saved', 'add', 'notifications', 'settings']

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    if (index === 2) {
      navigation.navigate(AppRoutes.createNewEvent)
    } else if (index > 2) navigation.navigate(state.routeNames[index - 1])
    else navigation.navigate(state.routeNames[index])
  }

  const selectedIndex = state.index >= 2 ? state.index + 1 : state.index
  const { color } = useThemes()
  const backgroundColor = color['background-basic-color-1']

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <BottomNavigation selectedIndex={selectedIndex} onSelect={onSelect}>
        {tabs.map((v, i) => {
          // if (i === 2) return <View />
          const Icon = style => <AppIcon {...{ ...style }} icon={v} />
          return <BottomNavigationTab icon={Icon} key={i} />
        })}
      </BottomNavigation>
    </SafeAreaView>
  )
}

export function HomeStack() {
  const { color } = useThemes()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color['color-primary-500'],
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export const exitRoutes: string[] = ['Home']
