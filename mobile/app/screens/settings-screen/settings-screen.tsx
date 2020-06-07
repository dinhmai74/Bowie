import {
  useAddPictureMutation,
  useGetCurrentUserInfoLazyQuery,
  useLogoutMutation,
} from 'app-graphql'
import { Backdrop, Button, Header, Screen, SizedBox, Switch, Text, View } from 'components'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ReactNativeFile } from 'extract-files'
import { useLocalization } from 'i18n/i18n'
import { observer } from 'mobx-react-lite'
import { useAuthContext } from 'navigation'
import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Value } from 'react-native-reanimated'
import { NavigationScreenProp } from 'react-navigation'
import { SettingsCard } from 'screens/settings-screen/components/SettingsCard'
// import { useStores } from "models/root-store"
import { spacing, typography, useThemes } from 'theme'
import { palette, Palette } from 'theme/palette'
import { isIos, nDelay, useSnackBars } from 'utils'
import { Avatar } from './components/Avatar'
import { LangBottomSheet } from './components/LangBottomSheet'

interface SettingItem {
  name: string
  navigateTo: string
  color: keyof Palette
}

const settingItems: SettingItem[][] = [
  [
    {
      name: 'noti',
      navigateTo: '',
      color: 'blueViking',
    },
    {
      name: 'term',
      navigateTo: '',
      color: 'orangeRajah',
    },
  ],
  [
    {
      name: 'getHelp',
      navigateTo: '',
      color: 'redMonaLisa',
    },
    {
      name: 'feedBack',
      navigateTo: '',
      color: 'blueLightState',
    },
  ],
]

const styles = StyleSheet.create({
  btnSignOutWrapper: {
    bottom: spacing[6],
    left: spacing[6],
    marginTop: spacing[6],
    position: 'absolute',
    right: spacing[6],
  },
  card: {
    alignSelf: 'stretch',
    margin: spacing[4],
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export interface SettingsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(() => {
  /* ------------------------ hooks ------------------------ */
  // const { someStore } = useStores()
  // const { navigation } = props
  const authContext = useAuthContext()
  const { locale } = useLocalization()
  const { toggle, theme } = useThemes()
  const { addSnack } = useSnackBars()
  const [logout] = useLogoutMutation()

  const [
    triggerGetCurrentUser,
    { data: getInfoData, error: getInfoError, loading: getInfoLoading },
  ] = useGetCurrentUserInfoLazyQuery({
    fetchPolicy: 'network-only',
  })
  if (getInfoError) console.tron.log('get usererror', getInfoError)
  const [addProfilePicture] = useAddPictureMutation({
    onCompleted: () => {
      addSnack({ message: 'added' })
      triggerGetCurrentUser()
    },
    onError: e => {
      addSnack({ message: 'Cannot add avatar' + e.message, type: 'danger' })
    },
  })

  /* ------------------------ state ------------------------ */
  const { color } = useThemes()

  const bs = useRef(null)

  const fall = new Value(1)

  React.useEffect(() => {
    ;(async () => {
      if (isIos) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          addSnack({
            message: 'Sorry, we need camera roll permissions to make this work!',
            type: 'warning',
          })
        }
      }

      nDelay(100).then(() => {
        triggerGetCurrentUser()
      })
    })()
  }, [])

  /* ------------- methods ------------- */

  const signOut = () => {
    logout()
    authContext!.logout()
  }

  const openBs = () => {
    bs.current.snapTo(1)
    bs.current.snapTo(1)
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (result.cancelled === false) {
        // const file = new Blob(result?.uri, { type: 'image/png' })

        const file = new ReactNativeFile({
          uri: result?.uri,
          name: 'avatar.png',
          type: 'image/png',
        })

        addProfilePicture({
          variables: {
            file: file,
          },
        })
      }

      console.tlog('result', result)
    } catch (E) {
      console.tlog('E', E)
    }
  }

  /* ------------- renders ------------- */
  const renderRow = (data: SettingItem[], i) => {
    return (
      <View style={styles.cardRow} key={i}>
        {data.map(v => {
          const { color: vColor, name: n } = v
          const color = palette[vColor]
          const name = 'settingsScreen.' + n

          return (
            <SettingsCard {...{ color, name }} onPress={() => {}} key={name} style={styles.card} />
          )
        })}
      </View>
    )
  }

  return (
    <View full bgBaseOnTheme>
      <Screen style={styles.container} preset="scroll" autoPaddingHorizontal>
        <Header headerTx="settingsScreen.header" />
        <View full>
          <Avatar
            data={getInfoData}
            loading={getInfoLoading}
            onAvatarPress={() => pickImage()}
            onEditPress={() => {}}
          />

          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.darkMode" style={styles.rowWrapper} />
            <Switch status="primary" checked={theme !== 'light'} onChange={toggle} />
          </View>
          <SizedBox h={4} />

          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.lang" />
            <TouchableOpacity onPress={() => openBs()}>
              <Text
                tx={locale || 'en'}
                color={color['text-primary-color']}
                fontFamily={typography.medium}
              />
            </TouchableOpacity>
          </View>
          <SizedBox h={4} />

          <View style={styles.cardWrapper}>
            {settingItems.map((datum, i) => {
              return renderRow(datum, i)
            })}
          </View>
        </View>
      </Screen>
      <SizedBox h={8} />
      <SizedBox h={8} />
      <View style={styles.btnSignOutWrapper}>
        <Button tx="auth.signOut" onPress={() => signOut()} full preset="outlineWithoutBorder" />
      </View>

      <LangBottomSheet bs={bs} fall={fall} />
      <Backdrop fall={fall} />
    </View>
  )
})
