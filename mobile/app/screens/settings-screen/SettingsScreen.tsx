import {
  useAddPictureMutation,
  useGetCurrentUserInfoLazyQuery,
  useLogoutMutation,
} from 'app-graphql'
import { Button, Header, Screen, SizedBox, Switch, Text, View } from 'components'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ReactNativeFile } from 'extract-files'
import { useSnackBars } from 'hooks'
import { useLocalization } from 'i18n/i18n'
import { observer } from 'mobx-react-lite'
import { NavigationProps, PrimaryParamList } from 'navigation'
import { HomeParamList } from 'navigation/home-navigator'
import { useAuthContext } from 'navigation/root-navigator'
// import { useAuthContext } from 'navigation'
import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SettingsCard } from 'screens/settings-screen/components/SettingsCard'
// import { useStores } from "models/root-store"
import { spacing, typography, useThemes } from 'theme'
import { palette, Palette } from 'theme/palette'
import { isIos, nDelay } from 'utils'
import { Avatar } from './components/Avatar'
import { LangBottomSheet } from './components/LangBottomSheet'
// import { useSnackBars } from 'hooks/app-snackbar-provider'

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

// interface Params extends HomeParamList, PrimaryParamList{}

type Params = HomeParamList & PrimaryParamList & {}

export interface SettingsScreenProps extends NavigationProps<Params, 'Saved'> {}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(props => {
  /* ------------------------ hooks ------------------------ */
  // const { someStore } = useStores()
  // const { navigation } = props
  const authContext = useAuthContext()
  const { locale } = useLocalization()
  const { toggle, theme } = useThemes()
  const { addSnack, addErr, addWarning } = useSnackBars()
  const [logout] = useLogoutMutation({
    onCompleted() {
      authContext!.logout()
    },
    onError(e) {
      addSnack(e.message)
    },
  })

  const [
    triggerGetCurrentUser,
    { data: getInfoData, error: getInfoError, loading: getInfoLoading },
  ] = useGetCurrentUserInfoLazyQuery({
    fetchPolicy: 'network-only',
  })
  if (getInfoError) console.tron.log('get usererror', getInfoError)
  const [addProfilePicture] = useAddPictureMutation({
    onCompleted: () => {
      addSnack('added')
      triggerGetCurrentUser()
    },
    onError: e => {
      addErr('Cannot add avatar' + e.message)
    },
  })

  /* ------------------------ state ------------------------ */
  const { color } = useThemes()

  const bs = useRef(null)

  React.useEffect(() => {
    ;(async () => {
      if (isIos) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          addWarning('Sorry, we need camera roll permissions to make this work!')
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
        aspect: [4, 4],
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
    } catch (E) {}
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
        <Avatar
          data={getInfoData}
          loading={getInfoLoading}
          onAvatarPress={() => pickImage()}
          onEditPress={() => {
            props.navigation.push('detailProfile')
          }}
        />

        <View row style={styles.rowWrapper}>
          <Text tx="settingsScreen.darkMode" style={styles.rowWrapper} />
          <Switch status="primary" checked={theme !== 'light'} onChange={toggle} />
        </View>
        <SizedBox h={3} />

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

        <View style={styles.cardWrapper}>
          {settingItems.map((datum, i) => {
            return renderRow(datum, i)
          })}
        </View>

        <Button tx="auth.signOut" onPress={() => signOut()} full preset="outlineWithoutBorder" />
      </Screen>

      <LangBottomSheet bs={bs} />
    </View>
  )
})

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    margin: spacing[4],
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing[4],
  },
  container: {
    paddingBottom: spacing[6],
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
