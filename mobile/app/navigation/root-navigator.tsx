import { useNetInfo } from '@react-native-community/netinfo'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthMutation, User, UserWithAvt } from 'app-graphql'
import { useStores } from 'models/root-store'
import React, { useEffect, useMemo } from 'react'
import { useForceUpdate } from 'utils/custom-hooks'
import { load, remove, save } from 'utils/storage'
import { AuthStack } from './auth-navigator'
import { PrimaryStackWithModal } from './primary-navigator'
import { RootParamList } from './types'

export const AuthContext = React.createContext<AuthContextState>({} as AuthContextState)

interface AuthContextState {
  auth: () => void
  logout: () => void
  navigateHome: (d: User) => void
}

export const useAuthContext = () => React.useContext(AuthContext)

const Stack = createStackNavigator<RootParamList>()

const LOGIN_KEY = 'login'

const RootStack = () => {
  const [validUser, setValidUser] = React.useState(false)
  const isOnline = useNetInfo().isConnected
  const removeUserInfo = () => {
    userInfoStore.clear()
    setValidUser(false)
    remove(LOGIN_KEY)
    refresh()
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
    onError() {
      removeUserInfo()
    },
  })

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

  const refresh = useForceUpdate()
  const { userInfoStore } = useStores()

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
