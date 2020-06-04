import { Header, Screen, View, AppLoading, Text } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { spacing } from 'theme'
import { useGetMyHostedEventQuery, useGetMyJoinedEventQuery } from 'app-graphql'

const Container = styled(View)(() => ({
  flex: 1,
  paddingHorizontal: spacing[6],
}))

const MyHostedWrapper = styled(View)(() => ({
  flex: 1,
}))

const MyJoinedWrapper = styled(View)(() => ({
  flex: 1,
  marginVertical: spacing[5],
}))

export interface SavedScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SavedScreen: React.FunctionComponent<SavedScreenProps> = observer(() => {
  // const { someStore } = useStores()
  const { data: myHostedEvents, loading: loadingGetHosted } = useGetMyHostedEventQuery()
  const { data: myJoinedEvents, loading: loadingGetJoin } = useGetMyJoinedEventQuery()

  let isLoading = loadingGetJoin || loadingGetHosted
  if (isLoading)
    return (
      <Screen>
        <Header headerTx="savedScreen.header" />
        <Container>
          <AppLoading />
        </Container>
      </Screen>
    )

  return (
    <Screen preset="scroll">
      <Header headerTx="savedScreen.header" />
      <Container>
        <MyHostedWrapper>
          <Text tx="savedScreen.myHostedEvent" preset="bold" />
          {myHostedEvents.getMyHostedEvent.map(v => {
            return <Text key={v.id}>{v.place.address}</Text>
          })}
        </MyHostedWrapper>

        <MyJoinedWrapper>
          <Text tx="savedScreen.myJoinedEvent" preset="bold" />
          {myJoinedEvents.getMyJoinedEvent.map(v => {
            return <Text key={v.id}>{v.place.address}</Text>
          })}
        </MyJoinedWrapper>
      </Container>
    </Screen>
  )
})
