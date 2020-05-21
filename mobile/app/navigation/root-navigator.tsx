import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useGetCurrentUserInfoLazyQuery } from 'app-graphql'
import React, { useEffect } from 'react'
import { useNetworkStatus } from 'react-offix-hooks'
import { useForceUpdate } from 'utils'
import { load, remove, save } from 'utils/storage'
import { AuthStack } from './auth-navigator'
import { PrimaryStack } from './primary-navigator'
import { RootParamList } from './types'

export const AuthContext = React.createContext(null)

const Stack = createStackNavigator<RootParamList>()

const LOGIN_KEY = 'login'
const RootStack = () => {
  const [validUser, setValidUser] = React.useState(false)
  const refresh = useForceUpdate()

  const handleErr = () => {
    setValidUser(false)
    remove(LOGIN_KEY)
  }
  const [auth] = useGetCurrentUserInfoLazyQuery({
    onCompleted(d) {
      if (d.me.email) {
        setValidUser(true)
        save(LOGIN_KEY, 'login')
      } else handleErr()
    },
    onError(e) {
      handleErr()
    },
  })
  const isOnline = useNetworkStatus()

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (isOnline) await auth()
      else {
        const key = await load(LOGIN_KEY)
        console.tlog('key', key)
        if (key) setValidUser(true)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      reAuth: async () => {
        await auth()
        refresh()
      },
    }),
    [],
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

RootNavigator.displayName = 'RootNavigator'
