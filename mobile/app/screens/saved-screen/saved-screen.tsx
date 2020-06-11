import { useGetMyHostedEventLazyQuery, useGetMyJoinedEventLazyQuery } from 'app-graphql'
import { AppLoading, Header, SizedBox, Text, View } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { EmptyScreen } from './EmptyScreen'
import { Container, MyHostedWrapper, MyJoinedWrapper } from './saved-screen.elements'

export interface SavedScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const SavedScreen: React.FunctionComponent<SavedScreenProps> = observer(({ navigation }) => {
  // const { someStore } = useStores()
  const [
    fetchHostedEvent,
    { data: myHostedEvents, loading: loadingGetHosted },
  ] = useGetMyHostedEventLazyQuery({
    fetchPolicy: 'cache-and-network',
  })
  const [
    fetchJoinEvent,
    { data: myJoinedEvents, loading: loadingGetJoin },
  ] = useGetMyJoinedEventLazyQuery({
    fetchPolicy: 'cache-and-network',
  })

  const fetchData = () => {
    fetchJoinEvent()
    fetchHostedEvent()
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const isLoading = loadingGetJoin || loadingGetHosted
  if (isLoading)
    return (
      <View bgBaseOnTheme full>
        <Container autoPaddingHorizontal>
          <Header headerTx="savedScreen.header" />
          <SizedBox h={8} />
          <AppLoading />
        </Container>
      </View>
    )

  const length = myJoinedEvents?.getMyJoinedEvent?.length + myHostedEvents?.getMyHostedEvent?.length
  if (length <= 0) return <EmptyScreen fetchData={() => fetchData()} />

  return (
    <View full bgBaseOnTheme>
      <Container autoPaddingHorizontal preset="scroll">
        <Header headerTx="savedScreen.header" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                fetchData()
              }}
              title="Loading..."
            />
          }
        >
          <MyHostedWrapper>
            <Text tx="savedScreen.myHostedEvent" preset="bold" />
            {myHostedEvents?.getMyHostedEvent.map(v => {
              return <Text key={v.id}>{v.place.name}</Text>
            })}
          </MyHostedWrapper>

          <MyJoinedWrapper>
            <Text tx="savedScreen.myJoinedEvent" preset="bold" />
            {myJoinedEvents?.getMyJoinedEvent.map(v => {
              return <Text key={v.id}>{v.place.name}</Text>
            })}
          </MyJoinedWrapper>
        </ScrollView>
      </Container>
    </View>
  )
})
