import { AuthHeader, Screen, SizedBox, Text, TextField, Button, View } from "components"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import Animated, {
  set,
  Transition,
  Transitioning,
  useCode,
  Value,
  log,
} from "react-native-reanimated"
// import { useStores } from "models/root-store"
import { NavigationScreenProp } from "react-navigation"
import { images, metrics, spacing, sw, useThemes, sh } from "theme"
import { useMemoOne } from "use-memo-one"
import {
  getOpacity,
  getTranslateX,
  useLayout,
  runTimingWithEndActionOB,
  runTimingOb,
  getScaleAndOpacity,
  nDelay,
} from "utils"
import { EyeIcon, FBicon } from "./components/Icons"
import { ScrollView } from "react-native-gesture-handler"
import { bInterpolate } from "react-native-redash"
import { useForm, Controller } from "react-hook-form"
import _ from "lodash"

const styles = StyleSheet.create({
  btn: {
    alignSelf: "flex-end",
    borderBottomLeftRadius: spacing[2],
    borderRadius: 0,
    borderTopLeftRadius: spacing[2],
    marginVertical: spacing[2],
  },
  btnCook: {
    paddingHorizontal: spacing[7],
  },
  btnForgot: {
    alignSelf: "flex-start",
    marginVertical: spacing[4],
  },
  btnView: {},
  container: {
    paddingHorizontal: spacing[6],
  },
  label: {
    paddingBottom: spacing[1],
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wallpaper: {
    ...metrics.images.logo,
    bottom: spacing[6],
    left: spacing[6],
    position: "absolute",
    resizeMode: "contain",
    right: 0,
  },
})

export interface SignInScreenProps {
  navigation: NavigationScreenProp<any, any>
}

const formTransition = (
  <Transition.Sequence>
    <Transition.Out type="scale" />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="fade" />
  </Transition.Sequence>
)

type FormData = {
  email: string
  name?: string
  password: string
}

export const SignInScreen: React.FunctionComponent<SignInScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const refForm = useRef(null)

  const { color } = useThemes()
  const { control, handleSubmit, errors } = useForm<FormData>()

  const [isSignIn, setIsSignIn] = useState(true)
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [triggerSpreadOut, setTriggerSpreadOut] = useState<boolean>(false)

  const [btnCookLayout, layout] = useLayout()

  const duration = 300
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

  const resetState = () => {
    setLoading(false)
    setTriggerSpreadOut(false)
  }

  const nextScreen = () => {
    resetState()
    props.navigation.navigate("primaryStack")
  }

  useCode(() => {
    if (triggerSpreadOut) {
      return set(animBtnCookOut, runTimingWithEndActionOB({ duration: 600, endAction: nextScreen }))
    }
    return []
  }, [triggerSpreadOut])

  const onSubmit = data => {
    setLoading(true)
    refForm.current.animateNextTransition()
    nDelay(600).then(() => setTriggerSpreadOut(true))
  }

  console.log(errors.email)

  return (
    <Screen>
      <Animated.Image
        source={images.tasting}
        style={[styles.wallpaper, getOpacity(animWallpaper)]}
      />

      <AuthHeader />

      <Transitioning.View transition={formTransition} ref={refForm}>
        <ScrollView style={styles.container}>
          <Text category="h1">{isSignIn ? "signInScreen.title" : "signUpScreen.title"}</Text>
          <SizedBox h={5} />

          <Animated.View style={getTranslateX(animEmail, sw, 0)}>
            <Controller
              as={TextField}
              control={control}
              name="email"
              onChange={args => args[0].nativeEvent.text}
              rules={{ required: true }}
              defaultValue=""
              status={errors.email ? "danger" : "basic"}
              caption={errors.email ? "errors.required" : ""}
              label="auth.email"
              keyboardType="email-address"
              placeholder="auth.email"
            />
          </Animated.View>

          <SizedBox h={4} />

          {!isSignIn && (
            <>
              <Controller
                as={TextField}
                control={control}
                name="name"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                status={errors.email ? "danger" : "basic"}
                caption={errors.email ? "errors.required" : ""}
                defaultValue=""
                label="auth.name"
                placeholder="auth.name"
              />

              <SizedBox h={4} />
            </>
          )}

          <Animated.View style={getTranslateX(animPassword, sw, 0)}>
            <Controller
              as={TextField}
              control={control}
              name="password"
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
              label="auth.password"
              rules={{ required: true }}
              status={errors.email ? "danger" : "basic"}
              caption={errors.email ? "errors.required" : ""}
              placeholder={secureTextEntry ? "********" : "password"}
              icon={style => (
                <EyeIcon
                  {...{ style, secureTextEntry }}
                  onPress={() => {
                    refForm.current.animateNextTransition()
                    setSecureTextEntry(p => !p)
                  }}
                />
              )}
              labelStyle={styles.label}
              secureTextEntry={secureTextEntry}
            />
          </Animated.View>

          <Animated.View style={[getOpacity(animFgpw), styles.linkView]}>
            <TouchableOpacity style={styles.btnForgot}>
              <Text themeColor="color-basic-600" underline>
                signInScreen.forgotPassword
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnForgot}
              onPress={() => {
                refForm.current.animateNextTransition()
                setIsSignIn(p => !p)
              }}
            >
              <Text themeColor="color-basic-600">{isSignIn ? "auth.signUp" : "auth.signIn"}</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        <SizedBox h={4} />
        <Animated.View
          // eslint-disable-next-line
          style={{
            position: "absolute",
            top: bInterpolate(animBtnCookOut, btnCookLayout ? btnCookLayout.y : 0, 0) || 0,
            right: (btnCookLayout ? btnCookLayout.x : 0) || 0,
            backgroundColor: color["color-success-default"],
            width: bInterpolate(animBtnCookOut, 0, 900),
            height: bInterpolate(animBtnCookOut, 0, sh),
            opacity: bInterpolate(animBtnCookOut, 1, 0),
          }}
        />

        <View style={styles.btnView} onLayout={layout}>
          <Animated.View style={getScaleAndOpacity(animBtnCook)}>
            {!triggerSpreadOut && (
              <Button
                full={false}
                onPress={handleSubmit(onSubmit)}
                style={[styles.btnCook, styles.btn]}
                size="large"
                disabled={loading}
                status="success"
                loading={loading}
              >
                signInScreen.letsCook
              </Button>
            )}
          </Animated.View>
          <Animated.View style={getScaleAndOpacity(animBtnFb)}>
            <Button icon={FBicon} style={styles.btn} />
          </Animated.View>
        </View>
      </Transitioning.View>
    </Screen>
  )
})

