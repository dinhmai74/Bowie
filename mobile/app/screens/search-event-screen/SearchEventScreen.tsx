import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet } from 'react-native'
import { Screen, Text, Header, View, TextField, SizedBox } from 'components'
// import { useStores } from "models/root-store"
import { spacing } from 'theme'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ParamListBase } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import styled from 'styled-components'
import { AppRoutes } from 'utils'

export interface SearchEventScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const SearchEventScreen: React.FunctionComponent<SearchEventScreenProps> = observer(
  props => {
    // const { someStore, anotherStore } = useStores()
    // OR
    // const rootStore = useStores()

    return (
      <View bgBaseOnTheme autoPaddingHorizontal full>
        <Screen>
          <SizedBox h={6} />
          <SearchWrapper>
            <StyledInput
              placeholder="searchEventScreen.search"
              size="giant"
              accessoryLeft={SearchIcon}
            />
            <SizedBox w={4} />
            <Text
              tx="common.cancel"
              onPress={() => props.navigation.navigate(AppRoutes.homeStack)}
            />
          </SearchWrapper>
        </Screen>
      </View>
    )
  },
)

const StyledInput = styled(TextField)({
  flex: 1,
})

const SearchWrapper = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const SearchIcon = props => <Icon {...props} name="search" />
