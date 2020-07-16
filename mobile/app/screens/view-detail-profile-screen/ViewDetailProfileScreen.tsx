import React from 'react'
import { Screen, Text, Header, View, Button } from 'components'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ParamListBase } from '@react-navigation/native'
import { BottomBtns } from './BottomBtns'

export interface ViewDetailProfileScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const ViewDetailProfileScreen: React.FunctionComponent<ViewDetailProfileScreenProps> = props => {
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  return (
    <View bgBaseOnTheme full autoPaddingHorizontal>
      <Screen preset="scroll">
        <Header headerTx="viewDetailProfileScreen.header" leftIcon="back" />
        <View></View>
        <BottomBtns />
      </Screen>
    </View>
  )
}
