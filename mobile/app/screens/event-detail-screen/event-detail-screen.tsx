import React from 'react'
import { observer } from 'mobx-react-lite'
import { ViewStyle, StyleSheet, Image } from 'react-native'
import { Screen, Text, Header, View } from 'components'
// import { useStores } from "models/root-store"
import { spacing, images, metrics } from 'theme'
import { NavigationScreenProp } from 'react-navigation'
import { useRoute, RouteProp } from '@react-navigation/native'
import { PrimaryParamList } from 'navigation/types'
import { useGetEventByIdQuery, FieldError } from 'graphql'
import { ApolloError } from 'apollo-client'
import { EventPlace } from './components/EventPlace'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    paddingTop: spacing[8],
  },
})

const LoadingComponent = () => {
  return (
    <Screen>
      <Header headerTx="eventDetailScreen.header" leftIcon="back" />
      <View style={styles.loadingContainer}>
        <Image source={images.loading} style={metrics.images.md} />
      </View>
    </Screen>
  )
}

interface ErrorComponentProps {
  error: ApolloError | FieldError
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <Screen>
      <Header headerTx="eventDetailScreen.header" leftIcon="back" />
      <View style={styles.loadingContainer}>
        <Image source={images.error} style={metrics.images.md} />
        <Text tx="errors.common" />
        <Text text={error?.message} />
      </View>
    </Screen>
  )
}

export interface EventDetailScreenProps {
  navigation: NavigationScreenProp<any, any>
}

type ScreenRouteProps = RouteProp<PrimaryParamList, 'eventDetail'>

export const EventDetailScreen: React.FunctionComponent<EventDetailScreenProps> = observer(
  props => {
    // const { someStore } = useStores()
    const { params } = useRoute<ScreenRouteProps>()
    const { loading, error, data } = useGetEventByIdQuery({ variables: { id: params.id } })

    if (loading) return <LoadingComponent />

    if (error || data.getEventById.error)
      return <ErrorComponent error={error || data.getEventById.error} />
    const { place } = data.getEventById.event

    return (
      <Screen preset="scroll">
        <Header headerTx={data.getEventById.event.information.eventName} leftIcon="back" />
        <View style={styles.container}>
          <EventPlace place={place} />
        </View>
      </Screen>
    )
  },
)
