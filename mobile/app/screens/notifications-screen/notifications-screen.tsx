import { Header, Screen } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavigationScreenProp } from 'react-navigation'

export interface NotificationsScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const NotificationsScreen: React.FunctionComponent<NotificationsScreenProps> = observer(
  () => {
    // const { appSnackbackStore } = useStores()
    // const { addSnack } = useSnackBars()

    return (
      <Screen preset="scroll">
        <Header headerTx="notificationsScreen.header" leftIcon="back" />
      </Screen>
    )
  },
)
