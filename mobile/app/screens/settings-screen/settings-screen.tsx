import { Button, Header, Screen, View, SizedBox } from "components"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import { firebaseSDK } from "services/firebase/fire-sdk"
// import { useStores } from "models/root-store"
import { spacing, useThemes } from "theme"
import { i18n } from "i18n/i18n"
import { saveString } from "utils/storage"
import { strings, useForceUpdate } from "utils"
import { AuthContext } from "navigation"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
})

export interface SettingsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const { navigation } = props
  const { toggle } = useThemes()
  const { signOut: appSignOut } = useContext(AuthContext)
  const force = useForceUpdate()

  const signOut = () => {
    appSignOut()
  }

  const changeLang = () => {
    i18n.locale = "vi"
    saveString(strings.lang, "vi")
    force()
  }

  return (
    <Screen preset="scroll">
      <Header headerTx="settingsScreen.header" leftIcon="back" />
      <View style={styles.container}>
        <Button tx="Toggle theme" onPress={toggle} />
        <SizedBox h={4} />
        <Button tx="settings.changeLang" onPress={() => changeLang()} />
        <SizedBox h={4} />
        <Button tx="auth.signOut" onPress={() => signOut()} />
      </View>
    </Screen>
  )
})
