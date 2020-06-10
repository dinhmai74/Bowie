import { Header, Screen, View, AppLoading, Text } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { spacing } from 'theme'
import { useGetMyHostedEventQuery, useGetMyJoinedEventQuery } from 'app-graphql'

const Container = styled(Screen)(() => ({
  flex: 1,
}))

const MyHostedWrapper = styled(View)(() => ({}))

const MyJoinedWrapper = styled(View)(() => ({
  marginVertical: spacing[5],
}))

export interface SavedScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SavedScreen: React.FunctionComponent<SavedScreenProps> = observer(() => {
  // const { someStore } = useStores()
  const { data: myHostedEvents, loading: loadingGetHosted } = useGetMyHostedEventQuery()
  const { data: myJoinedEvents, loading: loadingGetJoin } = useGetMyJoinedEventQuery()

  const isLoading = loadingGetJoin || loadingGetHosted
  if (isLoading)
    return (
      <View bgBaseOnTheme full>
        <Header headerTx="savedScreen.header" />
        <Container autoPaddingHorizontal>
          <AppLoading />
        </Container>
      </View>
    )

  return (
    <View full bgBaseOnTheme>
      <Container autoPaddingHorizontal>
        <Header headerTx="savedScreen.header" />
        <MyHostedWrapper>
          <Text tx="savedScreen.myHostedEvent" preset="bold" />
          {myHostedEvents.getMyHostedEvent.map(v => {
            return <Text key={v.id}>{v.place.name}</Text>
          })}
        </MyHostedWrapper>

        <MyJoinedWrapper>
          <Text tx="savedScreen.myJoinedEvent" preset="bold" />
          {myJoinedEvents.getMyJoinedEvent.map(v => {
            return <Text key={v.id}>{v.place.name}</Text>
          })}
        </MyJoinedWrapper>
      </Container>
    </View>
  )
})
