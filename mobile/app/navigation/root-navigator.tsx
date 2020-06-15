import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { User, UserWithAvt, useAuthMutation } from 'app-graphql'
import React, { useState, useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import { useStores } from 'models/root-store'
import { useForceUpdate } from 'mobx-react-lite'
import { save, load, remove } from 'utils'
import { AuthStack } from 'navigation/auth-navigator'
import { PrimaryStackWithModal } from 'navigation/primary-navigator'
import { useNetInfo } from '@react-native-community/netinfo'

export const AuthContext = React.createContext<AuthContextState>({} as AuthContextState)

interface AuthContextState {
  auth: () => void
  logout: () => void
  navigateHome: (d: User) => void
}

export const useAuthContext = () => React.useContext(AuthContext)

const Stack = createStackNavigator()

const LOGIN_KEY = 'login'

const RootStack = () => {
  const { userInfoStore } = useStores()
  const [validUser, setValidUser] = React.useState(false)
  const refresh = useForceUpdate()
  const netInfo = useNetInfo()
  const isOnline = netInfo.isInternetReachable

  const removeUserInfo = () => {
    userInfoStore.clear()
    setValidUser(false)
    remove(LOGIN_KEY)
  }

  const saveUserInfo = (d: User | UserWithAvt) => {
    const { email, name, avatarId } = d
    setValidUser(true)
    save(LOGIN_KEY, 'login')
    userInfoStore.setInfo({ name, email, avt: avatarId })
    refresh()
  }

  const [auth] = useAuthMutation({
    onCompleted: d => {
      saveUserInfo(d.auth)
    },
    onError: e => {
      removeUserInfo()
    },
  })

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (isOnline) {
        await auth()
      } else {
        const key = await load(LOGIN_KEY)
        if (key) setValidUser(true)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({ auth, logout: removeUserInfo, navigateHome: saveUserInfo }),
    [auth],
  )

  const isHaveCookie = isOnline ? validUser : true

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {!isHaveCookie ? (
          <Stack.Screen
            name="authStack"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="primaryStackWithModal"
            component={PrimaryStackWithModal}
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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Scren1</Text>
    </View>
  )
}

RootNavigator.displayName = 'RootNavigator'
