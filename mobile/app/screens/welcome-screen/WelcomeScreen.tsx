import { Button, Screen, SizedBox, Text, View } from 'components'
import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import Animated, { Clock, set, useCode, Value } from 'react-native-reanimated'
import { mix } from 'react-native-redash'
import { useSafeArea } from 'react-native-safe-area-context'
import { NavigationInjectedProps } from 'react-navigation'
import { images, metrics, spacing } from 'theme'
import { useMemoOne } from 'use-memo-one'
import { AppRoutes } from 'utils'
import { runTiming, runTimingWithEndAction } from 'utils/reanimated'

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const { welcomeAnim, clock, subtextAnim } = useMemoOne(
    () => ({
      welcomeAnim: new Value(0),
      clock: new Clock(),
      subtextAnim: new Value(0) as any,
      outAnim: new Value(1) as any,
    }),
    [],
  )
  const [showWelcome, setShowWelcome] = useState(false)

  useCode(() => {
    if (showWelcome) return set(subtextAnim, runTiming(clock, 0.5, 1, 200))
    return set(
      welcomeAnim,
      runTimingWithEndAction(clock, 0, 1, () => setShowWelcome(true)),
    )
  }, [showWelcome, welcomeAnim, subtextAnim])

  const welcomeY: any = mix(welcomeAnim, 500, 1)
  const welcomeOpacity: any = mix(welcomeAnim, 0, 1)
  const insets = useSafeArea()

  return (
    <View style={styles.full} bgBaseOnTheme>
      <Screen style={styles.container} preset="scroll">
        <Animated.View
          style={{
            transform: [{ translateY: welcomeY }],
            opacity: welcomeOpacity,
          }}
        >
          <Image source={images.chef} style={styles.logo} />
          <Text tx="welcomeScreen.title" preset="h1medium" textAlign="center" />
        </Animated.View>
        <SizedBox h={4} />
        <Animated.View
          style={{
            transform: [{ scale: subtextAnim }],
            opacity: subtextAnim,
          }}
        >
          <Text style={styles.subText} tx="welcomeScreen.subText" />
        </Animated.View>
      </Screen>

      <View style={[styles.footer, { paddingBottom: insets.bottom || spacing[8] }]}>
        <Animated.View style={{ opacity: mix(welcomeAnim, -3, 1) }}>
          <Button
            onPress={() => {
              props.navigation.navigate(AppRoutes.signIn)
            }}
            full
            tx="welcomeScreen.getStarted"
          />
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: spacing[6],
  },
  full: {
    flex: 1,
  },
  logo: {
    ...metrics.images.logo,
    resizeMode: 'contain',
  },
  subText: {
    textAlign: 'center',
  },
})
