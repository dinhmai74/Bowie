import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { useLogoutMutation } from 'app-graphql'
import { Backdrop, Button, Header, Screen, SizedBox, Switch, Text, View } from 'components'
import { useLocalization } from 'i18n/i18n'
import { observer } from 'mobx-react-lite'
import { useAuthContext } from 'navigation'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Value } from 'react-native-reanimated'
import { NavigationScreenProp } from 'react-navigation'
import { SettingsCard } from 'screens/settings-screen/components/SettingsCard'
// import { useStores } from "models/root-store"
import { spacing, typography, useThemes } from 'theme'
import { palette, Palette } from 'theme/palette'
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
  // const { someStore } = useStores()
  // const { navigation } = props
  const authContxt = useAuthContext()
  const { locale } = useLocalization()
  const { toggle, theme } = useThemes()
  const [logout] = useLogoutMutation({
    onCompleted: () => authContxt?.auth(),
  })
  const { color } = useThemes()
  const styles = useStyleSheet(Styles)

  const bs = useRef(null)

  const fall = new Value(1)

  /* ------------- methods ------------- */

  const signOut = () => {
    logout()
    console.log('out')
  }

  const openBs = () => {
    bs.current.snapTo(1)
    bs.current.snapTo(1)
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
          <View></View>
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
