import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen, SettingsScreen, SavedScreen, NotificationsScreen } from "../screens"
// import { PrimaryParamList } from "./types"
import { useThemes, spacing } from "theme"
import { SafeAreaView, View } from "react-native"
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components"
import { AppIcon, SizedBox } from "components"
import { getElevation } from "utils"

const Tab = createBottomTabNavigator()

const tabs = ["home", "saved", "add", "notifications", "settings"]

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    if (index === 2) {
      navigation.navigate("createNewEvent")
    } else if (index > 2) navigation.navigate(state.routeNames[index - 1])
    else navigation.navigate(state.routeNames[index])
  }

  const selectedIndex = state.index >= 2 ? state.index + 1 : state.index
  const { color } = useThemes()
  const backgroundColor = color["background-basic-color-1"]

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <BottomNavigation selectedIndex={selectedIndex} onSelect={onSelect}>
        {tabs.map((v, i) => {
          // if (i === 2) return <View />
          const Icon = style => <AppIcon {...{ style }} icon={v} />
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
        activeTintColor: color["color-primary-500"],
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

export const exitRoutes: string[] = ["Home"]
