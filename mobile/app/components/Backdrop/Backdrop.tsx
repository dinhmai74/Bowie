import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { call, cond, eq } from 'react-native-reanimated'

const styles = StyleSheet.create({
  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 99,
  },
})

export interface BackdropProps {
  fall: any
  onPress?: () => void
}

export const Backdrop: React.FunctionComponent<BackdropProps> = props => {
  const { fall } = props
  // @ts-ignore
  const animatedShadowOpacity = Animated.interpolateNode(fall, {
    inputRange: [0, 1],
    outputRange: [0.8, 0],
  })

  // const [show, setShow] = React.useState(false)

  // Animated.useCode(() => {
  // return Animated.block([
  // cond(
  // eq(fall, 1),
  // call([], () => setShow(false)),
  // call([], () => setShow(true)),
  // ),
  // ])
  // }, [fall])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress && props.onPress()
      }}
    >
      <Animated.View
        pointerEvents={'none'}
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    </TouchableWithoutFeedback>
  )
}
