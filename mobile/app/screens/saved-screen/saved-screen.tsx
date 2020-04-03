import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { Screen, Text, Header, View } from "components"
// import { useStores } from "models/root-store"
import { colors, spacing } from "theme"
import { NavigationScreenProp } from "react-navigation"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
})

export interface SavedScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SavedScreen: React.FunctionComponent<SavedScreenProps> = observer(props => {
  // const { someStore } = useStores()
  return (
    <Screen preset="scroll">
      <Header headerTx="savedScreen.header" leftIcon="back" />
      <View style={styles.container}>
        <Text preset="h2medium">123</Text>
      </View>
    </Screen>
  )
})
