import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthMutation } from 'app-graphql'
import React, { useEffect, useMemo } from 'react'
import { useNetworkStatus } from 'react-offix-hooks'
import { SnackBarProvider } from 'utils/AppSnackbarProvider'
import { useForceUpdate } from 'utils/custom-hooks'
import { load, remove, save } from 'utils/storage'
import { AuthStack } from './auth-navigator'
import { PrimaryStackWithModal } from './primary-navigator'
import { RootParamList } from './types'

export const AuthContext = React.createContext(null)

interface AuthContextState {
  auth: () => void
}

export const useAuthContext = (): AuthContextState => React.useContext(AuthContext)

const Stack = createStackNavigator<RootParamList>()

const LOGIN_KEY = 'login'

const RootStack = () => {
  const [validUser, setValidUser] = React.useState(false)
  const refresh = useForceUpdate()

  const handleErr = () => {
    setValidUser(false)
    remove(LOGIN_KEY)
  }
  const [auth] = useAuthMutation({
    onCompleted(d) {
      if (d.auth.email) {
        setValidUser(true)
        save(LOGIN_KEY, 'login')
        refresh()
      } else handleErr()
    },
    onError() {
      refresh()
      handleErr()
    },
  })
  const isOnline = useNetworkStatus()

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (isOnline) await auth()
      else {
        const key = await load(LOGIN_KEY)
        if (key) setValidUser(true)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(() => ({ auth }), [auth])

  const isHaveCookie = isOnline ? validUser : true

  return (
    <SnackBarProvider>
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
    </SnackBarProvider>
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
