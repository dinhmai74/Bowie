import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

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
  // const animatedShadowOpacity = Animated.interpolate(fall, {
  //   inputRange: [0, 1],
  //   outputRange: [0.8, 0],
  // })

  // const [show, setShow] = React.useState(false)

  // useCode(() => {
  //   return block([
  //     cond(
  //       eq(fall, 1),
  //       call([], () => setShow(false)),
  //       call([], () => setShow(true)),
  //     ),
  //   ])
  // }, [fall])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress && props.onPress()
      }}
    >
      {/* <Animated.View
        pointerEvents={show ? 'auto' : 'none'}
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      /> */}
    </TouchableWithoutFeedback>
  )
}
