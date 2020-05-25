import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { block, call, cond, eq, useCode } from 'react-native-reanimated'

const styles = StyleSheet.create({
  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 99,
  },
})

export interface BackdropProps {
  fall: Animated.Node<number>
}

export const Backdrop: React.FunctionComponent<BackdropProps> = props => {
  const { fall } = props
  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.8, 0],
  })

  const [show, setShow] = React.useState(false)

  useCode(() => {
    return block([
      cond(
        eq(fall, 1),
        call([], () => setShow(false)),
        call([], () => setShow(true)),
      ),
    ])
  }, [fall])

  return (
    <Animated.View
      pointerEvents={show ? 'auto' : 'none'}
      style={[
        styles.shadowContainer,
        {
          opacity: animatedShadowOpacity,
        },
      ]}
    />
  )
}
