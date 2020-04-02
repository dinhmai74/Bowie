import { Button, Header, Screen, View, SizedBox, Text, Switch, AppIcon } from "components"
import { observer } from "mobx-react-lite"
import React, { useContext, useRef } from "react"
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { NavigationScreenProp } from "react-navigation"
// import { useStores } from "models/root-store"
import { spacing, useThemes, metrics, color as Colors, typography } from "theme"
import { i18n } from "i18n/i18n"
import { saveString } from "utils/storage"
import { strings, useForceUpdate, getElevation } from "utils"
import { AuthContext } from "navigation"
import BottomSheet from "reanimated-bottom-sheet"
import { LangModalContent, LangModalHeader, LangItem } from "./components/LangModal"
import Animated from "react-native-reanimated"
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components"
import { FlatList } from "react-native-gesture-handler"

const langs = ["en", "vi"]

const Styles = StyleService.create({
  bsWrapper: {
    height: "100%",
    width: "100%",
    padding: spacing[4],
    ...getElevation(),
  },
  btnSignOutWrapper: {
    position: "absolute",
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
    height: "100%",
  },
  modalHeaderContainer: {
    alignItems: "center",
    flex: 1,
    padding: spacing[4],
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
})

export interface SettingsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(props => {
  // const { someStore } = useStores()
  // const { navigation } = props
  const { toggle, theme } = useThemes()
  const { signOut: appSignOut } = useContext(AuthContext)
  const force = useForceUpdate()
  const { color } = useThemes()
  const styles = useStyleSheet(Styles)

  const bs = useRef(null)
  const fall = new Animated.Value(1)

  /* ------------- methods ------------- */

  const signOut = () => {
    appSignOut()
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
        <Text preset="h3" tx={"settingsScreen.choseLang"} />
        <SizedBox h={4} />
        <FlatList
          data={langs}
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
          color={color.palette.white}
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

  return (
    <Screen>
      <BottomSheet
        ref={bs}
        snapPoints={[0, 300, 400]}
        renderContent={() => renderBottomSheetContent()}
        renderHeader={() => renderHeaderBottomSheet()}
        callbackNode={fall}
      />

      <Header headerTx="settingsScreen.header" leftIcon="back" />
      <View style={styles.container}>
        <View>
          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.darkMode" style={styles.rowWrapper} />
            <Switch status="primary" checked={theme !== "light"} onChange={toggle} />
          </View>
          <SizedBox h={4} />

          <View row style={styles.rowWrapper}>
            <Text tx="settingsScreen.lang" style={styles.rowWrapper} />
            <TouchableOpacity onPress={() => openBs()}>
              <Text
                tx={i18n.locale}
                color={color["text-primary-color"]}
                fontFamily={typography.medium}
              />
            </TouchableOpacity>
          </View>
          <SizedBox h={4} />
        </View>

        <View style={styles.btnSignOutWrapper}>
          <Button tx="auth.signOut" onPress={() => signOut()} full preset="ghostWithPrimaryBg" />
        </View>
      </View>
      {renderShadow()}
    </Screen>
  )
})
