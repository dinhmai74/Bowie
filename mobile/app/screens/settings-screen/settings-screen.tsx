import { Layout, StyleService, useStyleSheet } from '@ui-kitten/components'
import { useLogoutMutation } from 'app-graphql'
import { AppIcon, Button, Header, Screen, SizedBox, Switch, Text, View } from 'components'
import { i18n } from 'i18n/i18n'
import { observer } from 'mobx-react-lite'
import { useAuthContext } from 'navigation'
import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { NavigationScreenProp } from 'react-navigation'
import BottomSheet from 'reanimated-bottom-sheet'
import { SettingsCard } from 'screens/settings-screen/components/SettingsCard'
// import { useStores } from "models/root-store"
import { colors as Colors, metrics, spacing, typography, useThemes } from 'theme'
import { palette, Palette } from 'theme/palette'
import { getElevation, strings, useForceUpdate } from 'utils'
import { saveString } from 'utils/storage'
import { LangItem } from './components/LangModal'

const langs = ['en', 'vi']

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
  bsWrapper: {
    height: '100%',
    width: '100%',
    padding: spacing[4],
    ...getElevation(),
  },
  btnSignOutWrapper: {
    position: 'absolute',
    left: spacing[6],
    right: spacing[6],
    bottom: spacing[6],
  },
  closeIc: {
    borderColor: Colors.palette.white,
    borderRadius: 50,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
    height: '100%',
  },
  modalHeaderContainer: {
    alignItems: 'center',
    flex: 1,
    padding: spacing[4],
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
})

export interface SettingsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(() => {
  // const { someStore } = useStores()
  // const { navigation } = props
  const { reAuth } = useAuthContext()
  const { toggle, theme } = useThemes()
  const [logout] = useLogoutMutation()
  const force = useForceUpdate()
  const { color } = useThemes()
  const styles = useStyleSheet(Styles)

  const bs = useRef(null)
  const fall = new Animated.Value(1)

  /* ------------- methods ------------- */

  const signOut = async () => {
    await logout()
    if (reAuth) reAuth()
  }

  const changeLang = v => {
    i18n.locale = v
    saveString(strings.lang, v)
    force()
  }

  const closeBs = () => {
    bs.current.snapTo(0)
    bs.current.snapTo(0)
  }

  const openBs = () => {
    bs.current.snapTo(1)
    bs.current.snapTo(1)
  }

  /* ------------- renders ------------- */

  const renderBottomSheetContent = () => {
    return (
      <Layout style={styles.bsWrapper}>
        <Text preset="h3" tx={'settingsScreen.choseLang'} />
        <SizedBox h={4} />
        <FlatList
          data={langs}
          keyExtractor={(_, k) => k.toString()}
          renderItem={({ item }) => (
            <LangItem
              value={item}
              onPress={v => {
                closeBs()
                changeLang(v)
              }}
            />
          )}
        />
        <SizedBox h={6} />
      </Layout>
    )
  }

  const renderHeaderBottomSheet = () => {
    return (
      <View style={styles.modalHeaderContainer}>
        <AppIcon
          icon="close"
          color={color.palette['white']}
          size={metrics.icon.lg}
          onPress={() => closeBs()}
          containerStyle={styles.closeIc}
        />
      </View>
    )
  }

  const renderShadow = () => {
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
      <BottomSheet
        ref={bs}
        snapPoints={[-100, '30%', '40%']}
        renderContent={() => renderBottomSheetContent()}
        renderHeader={() => renderHeaderBottomSheet()}
        callbackNode={fall}
        borderRadius={spacing[4]}
      />

      <Header headerTx="settingsScreen.header" leftIcon="back" />
      <Screen style={styles.container} preset="scroll">
        <View full>
          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.darkMode" style={styles.rowWrapper} />
            <Switch status="primary" checked={theme !== 'light'} onChange={toggle} />
          </View>
          <SizedBox h={4} />

          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.lang" />
            <TouchableOpacity onPress={() => openBs()}>
              <Text
                tx={i18n.locale || 'en'}
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
          <Button tx="auth.signOut" onPress={() => signOut()} full preset="ghostWithPrimaryBg" />
        </View>
      </Screen>
      {renderShadow()}
    </Screen>
  )
})
