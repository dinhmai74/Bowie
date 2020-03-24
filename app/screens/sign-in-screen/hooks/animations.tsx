import { set, useCode, Value } from "react-native-reanimated"
import { useMemoOne } from "use-memo-one"
import { runTimingOb } from "utils"

export const useSignInAnimations = duration => {
  const {
    animWallpaper,
    animEmail,
    animPassword,
    animFgpw,
    animBtnCook,
    animBtnFb,
    animBtnCookOut,
  } = useMemoOne(
    () => ({
      animEmail: new Value(0),
      animPassword: new Value(0),
      animFgpw: new Value(0),
      animBtnCook: new Value(0),
      animBtnFb: new Value(0),
      animWallpaper: new Value(0),
      animBtnCookOut: new Value(0),
    }),
    [],
  )

  const anim = [
    {
      anim: animEmail,
      duration: duration,
    },
    {
      anim: animPassword,
      duration: duration * 1.3,
    },
    {
      anim: animFgpw,
      duration: duration * 2,
    },
    {
      anim: animBtnCook,
      duration: duration * 1.5,
    },
    {
      anim: animBtnFb,
      duration: duration * 1.7,
    },
    {
      anim: animWallpaper,
      duration: duration * 3,
    },
  ]

  anim.forEach(value => {
    useCode(() => set(value.anim, runTimingOb({ duration: value.duration })), [])
  })

  return {
    animWallpaper,
    animEmail,
    animPassword,
    animFgpw,
    animBtnCook,
    animBtnFb,
    animBtnCookOut,
  }
}
