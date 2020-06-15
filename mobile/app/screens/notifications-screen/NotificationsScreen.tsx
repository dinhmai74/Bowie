import { Header, Screen, Button } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import Animated, {
  Easing,
  // @ts-ignore
  useAnimatedStyle,
  // @ts-ignore
  useSharedValue,
  // @ts-ignore
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components'

const AnimatedView = styled(Animated.View)`
  background-color: red;
  height: 100px;
  width: 10px;
`

export interface NotificationsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const NotificationsScreen: React.FunctionComponent<NotificationsScreenProps> = observer(
  () => {
    // const { appSnackbackStore } = useStores()
    // const { addSnack } = useSnackBars()
    const randomWidth = useSharedValue(10)

    const config = {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }

    const viewStyle = useAnimatedStyle(() => {
      return {
        width: withTiming(randomWidth.value, config),
      }
    })

    return (
      <Screen preset="scroll">
        <Header headerTx="notificationsScreen.header" leftIcon="back" />
        <AnimatedView style={viewStyle} />
        <Button
          onPress={() => (randomWidth.value = Math.random() * 350)}
          text="inc"
          // eslint-disable-next-line
          style={{ alignSelf: 'center' }}
        />
      </Screen>
    )
  },
)
