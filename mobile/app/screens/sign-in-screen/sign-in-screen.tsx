import { AuthHeader, Button, Screen, SizedBox, Text, TextField, View } from 'components'
import { useLoginMutation, useLogoutMutation } from 'graphql'
import { observer } from 'mobx-react-lite'
import { AuthContext } from 'navigation'
import React, { useContext, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { set, Transition, Transitioning, useCode } from 'react-native-reanimated'
import { bInterpolate } from 'react-native-redash'
// import { useStores } from "models/root-store"
import { NavigationScreenProp } from 'react-navigation'
import { images, metrics, sh, spacing, sw, useThemes } from 'theme'
import {
  getOpacity,
  getScaleAndOpacity,
  getTranslateX,
  mailRegex,
  nDelay,
  runTimingWithEndActionOB,
  useLayout,
} from 'utils'
import { EyeIcon, FBicon } from './components/Icons'
import { useSignInAnimations } from './hooks'

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: spacing[2],
    borderRadius: 0,
    borderTopLeftRadius: spacing[2],
    marginVertical: spacing[2],
  },
  btnCook: {
    paddingHorizontal: spacing[7],
  },
  btnForgot: {
    alignSelf: 'flex-start',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wallpaper: {
    ...metrics.images.logo,
    bottom: spacing[6],
    left: spacing[6],
    position: 'absolute',
    resizeMode: 'contain',
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

const duration = 300

export const SignInScreen: React.FunctionComponent<SignInScreenProps> = observer(() => {
  // const { someStore } = useStores()
  const refForm = useRef(null)
  const { reAuth } = useContext(AuthContext)

  const onError = err => {
    Alert.alert(JSON.stringify(err))
    console.tlog('err', err)
  }
  const onCompleted = data => {
    const errMss = data?.register?.error || data?.login?.error
    if (errMss) {
      Alert.alert(JSON.stringify(errMss?.message))
    } else {
      refForm.current.animateNextTransition()
      nDelay(200).then(() => setTriggerSpreadOut(true))
      nDelay(600).then(() => reAuth())
    }
  }

  const [login, loginResult] = useLoginMutation({
    onCompleted,
    onError,
  })
  const [signUp, signUpResult] = useLogoutMutation({
    onCompleted,
    onError,
  })

  const { color } = useThemes()
  const { control, handleSubmit, errors } = useForm<FormData>()

  /* ------------- state ------------- */
  const [isSignIn, setIsSignIn] = useState(true)
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [triggerSpreadOut, setTriggerSpreadOut] = useState<boolean>(false)

  const [btnCookLayout, layout] = useLayout()

  const {
    animWallpaper,
    animEmail,
    animPassword,
    animFgpw,
    animBtnCook,
    animBtnFb,
    animBtnCookOut,
  } = useSignInAnimations(duration)

  /* ------------- methods ------------- */

  const resetState = () => {
    setTriggerSpreadOut(false)
  }

  const nextScreen = () => {
    resetState()
    // props.navigation.navigate("primaryStack")
  }

  const onSubmit = async (data: FormData) => {
    if (isSignIn) {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      })
    } else {
      await signUp({
        variables: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      })
    }
  }

  useCode(() => {
    if (triggerSpreadOut) {
      return set(animBtnCookOut, runTimingWithEndActionOB({ duration: 600, endAction: nextScreen }))
    }
    return []
  }, [triggerSpreadOut])

  const loading = loginResult?.loading || signUpResult?.loading

  return (
    <Screen>
      <Animated.Image
        source={images.tasting}
        style={[styles.wallpaper, getOpacity(animWallpaper)]}
      />

      <AuthHeader />

      <Transitioning.View transition={formTransition} ref={refForm}>
        <ScrollView style={styles.container}>
          <Text preset="h1medium">{isSignIn ? 'signInScreen.title' : 'signUpScreen.title'}</Text>
          <SizedBox h={5} />

          <Animated.View style={getTranslateX(animEmail, sw, 0)}>
            <Controller
              as={TextField}
              control={control}
              name="email"
              onChange={args => args[0].nativeEvent.text}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: mailRegex,
                  message: 'Invalid email',
                },
              }}
              defaultValue="test@gmail.com"
              status={errors.email ? 'danger' : 'basic'}
              // @ts-ignore
              caption={errors.email ? errors.email.message : ''}
              label="auth.email"
              keyboardType="email-address"
              placeholder="auth.email"
              autoCapitalize="none"
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
                status={errors.name ? 'danger' : 'basic'}
                caption={errors.name ? 'errors.required' : ''}
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
              defaultValue="password"
              label="auth.password"
              rules={{ required: true }}
              status={errors.password ? 'danger' : 'basic'}
              caption={errors.password ? 'errors.required' : ''}
              placeholder={secureTextEntry ? '********' : 'password'}
              // @ts-ignore
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
              <Text themeColor="color-basic-600">{isSignIn ? 'auth.signUp' : 'auth.signIn'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        <SizedBox h={4} />
        <Animated.View
          // eslint-disable-next-line
          style={{
            position: 'absolute',
            top: bInterpolate(animBtnCookOut, btnCookLayout ? btnCookLayout.y : 0, 0) || 0,
            right: (btnCookLayout ? btnCookLayout.x : 0) || 0,
            backgroundColor: color['color-success-default'],
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
            <Button style={styles.btn}>
              <FBicon />
            </Button>
          </Animated.View>
        </View>
      </Transitioning.View>
    </Screen>
  )
})
