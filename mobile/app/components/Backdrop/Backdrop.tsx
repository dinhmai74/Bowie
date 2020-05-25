import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

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

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.shadowContainer,
        {
          opacity: animatedShadowOpacity,
        },
      ]}
    />
  )
}
