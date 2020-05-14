import { Header, Screen, Text, View } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
// import { useStores } from "models/root-store"
import { spacing } from 'theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
})

export interface SavedScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SavedScreen: React.FunctionComponent<SavedScreenProps> = observer(() => {
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
