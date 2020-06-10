import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthMutation, User, UserWithAvt } from 'app-graphql'
import { useStores } from 'models/root-store'
import React, { useEffect, useMemo } from 'react'
import { useNetworkStatus } from 'react-offix-hooks'
import { useForceUpdate } from 'utils/custom-hooks'
import { load, remove, save } from 'utils/storage'
import { AuthStack } from './auth-navigator'
import { PrimaryStackWithModal } from './primary-navigator'
import { RootParamList } from './types'
import { Alert } from 'react-native'

export const AuthContext = React.createContext(null)

interface AuthContextState {
  auth: () => void
  logout: () => void
  navigateHome: (d: User) => void
}

export const useAuthContext = (): AuthContextState => React.useContext(AuthContext)

const Stack = createStackNavigator<RootParamList>()

const LOGIN_KEY = 'login'

const RootStack = () => {
  const { userInfoStore } = useStores()
  const [validUser, setValidUser] = React.useState(false)
  const refresh = useForceUpdate()

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
      Alert.alert(e.message)
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

RootNavigator.displayName = 'RootNavigator'
