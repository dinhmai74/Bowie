import { Button, Header, Screen, View } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { spacing } from 'theme'
import { useSnackBars } from 'utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
})

export interface NotificationsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const NotificationsScreen: React.FunctionComponent<NotificationsScreenProps> = observer(
  () => {
    // const { appSnackbackStore } = useStores()
    const { addSnack } = useSnackBars()

    return (
      <Screen preset="scroll">
        <Header headerTx="notificationsScreen.header" leftIcon="back" />
        <View style={styles.container}>
          <Button
            onPress={() =>
              addSnack({
                message:
                  'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,',
              })
            }
          >
            123
          </Button>
          <Button onPress={() => addSnack({ message: 'yep yep' })}>close</Button>
        </View>
      </Screen>
    )
  },
)
