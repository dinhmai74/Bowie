import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { useAddPictureMutation, useLogoutMutation } from 'app-graphql'
import { Backdrop, Button, Header, Screen, SizedBox, Switch, Text, View } from 'components'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ReactNativeFile } from 'extract-files'
import { useLocalization } from 'i18n/i18n'
import { observer } from 'mobx-react-lite'
import { useAuthContext } from 'navigation'
import React, { useRef } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Value } from 'react-native-reanimated'
import { NavigationScreenProp } from 'react-navigation'
import { SettingsCard } from 'screens/settings-screen/components/SettingsCard'
// import { useStores } from "models/root-store"
import { spacing, typography, useThemes } from 'theme'
import { palette, Palette } from 'theme/palette'
import { isIos, useSnackBars } from 'utils'
import { LangBottomSheet } from './components/LangBottomSheet'
const { useMutation } = require('@apollo/react-hooks')
const gql = require('graphql-tag')

const MUTATION = gql`
  mutation addPicture($file: Upload!) {
    addProfilePicture(picture: $file)
  }
`

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

const Styles = StyleService.create({
  card: {
    alignSelf: 'stretch',
    margin: spacing[4],
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignOutWrapper: {
    position: 'absolute',
    left: spacing[6],
    right: spacing[6],
    bottom: spacing[6],
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
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
  const authContxt = useAuthContext()
  const { locale } = useLocalization()
  const { toggle, theme } = useThemes()
  const { addSnack } = useSnackBars()
  const [logout] = useLogoutMutation({
    onCompleted: () => authContxt?.auth(),
  })
  const [mutate] = useMutation(MUTATION, {
    onCompleted: data => console.tlog('data', data),
    onError: e => console.tlog('e', e),
  })

  const [addProfilePicture] = useAddPictureMutation({
    onCompleted: data => console.tlog('data', data),
    onError: e => console.tlog('e', e),
  })

  /* ------------------------ state ------------------------ */
  const { color } = useThemes()
  const styles = useStyleSheet(Styles)
  const [img, setImg] = React.useState(null)

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
        aspect: [4, 3],
        quality: 1,
      })
      if (result.cancelled === false) {
        setImg(result?.uri)
        // const file = new Blob(result?.uri, { type: 'image/png' })

        const file = new ReactNativeFile({
          uri: result?.uri,
          name: 'a.png',
          type: 'image/png',
        })

        console.tlog('file', file)
        mutate({
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
    <Screen>
      <Header headerTx="settingsScreen.header" leftIcon="back" />

      <Screen style={styles.container} preset="scroll">
        <View full>
          <View>
            <Button text="Testing pick img" onPress={() => pickImage()} />
            {img && <Image source={{ uri: img }} style={{ width: 200, height: 200 }} />}
          </View>

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

          <View style={styles.cardWrapper}>
            {settingItems.map((datum, i) => {
              return renderRow(datum, i)
            })}
          </View>

          <SizedBox h={8} />
        </View>

        <View style={styles.btnSignOutWrapper}>
          <Button tx="auth.signOut" onPress={() => signOut()} full preset="outlineWithoutBorder" />
        </View>
      </Screen>
      <LangBottomSheet bs={bs} fall={fall} />
      <Backdrop fall={fall} />
    </Screen>
  )
})
