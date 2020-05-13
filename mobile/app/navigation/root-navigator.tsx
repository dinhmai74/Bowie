import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect } from "react"
import { useMutation } from "react-apollo"
import { mutationAuth } from "services/mutations"
import { AuthStack } from "./auth-navigator"
import { PrimaryStack } from "./primary-navigator"
import { RootParamList } from "./types"

export const AuthContext = React.createContext(null)

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
  const [auth, { data }] = useMutation(mutationAuth)

  useEffect(() => {
    const bootstrapAsync = async () => {
      await auth()
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      reAuth: async () => {
        await auth()
      },
    }),
    [],
  )

  const isHaveCookie = data?.auth?.email

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

RootNavigator.displayName = "RootNavigator"
