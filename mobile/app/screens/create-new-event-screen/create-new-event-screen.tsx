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

export interface CreateNewEventScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const CreateNewEventScreen: React.FunctionComponent<CreateNewEventScreenProps> = observer(
  props => {
    // const { someStore } = useStores()
    return (
      <Screen preset="scroll">
        <Header headerTx="createNewEventScreen.header" leftIcon="back" />
        <View style={styles.container}>
          <Text>123</Text>
        </View>
      </Screen>
    )
  },
)
