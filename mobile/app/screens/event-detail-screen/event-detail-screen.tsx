import { RouteProp, useRoute } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { ApolloError } from 'apollo-client'
import { FieldError, useGetEventByIdQuery } from 'app-graphql'
import { AppDivider, AppError, AppLoading, Header, Screen, SizedBox, Text, View } from 'components'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { PrimaryParamList } from 'navigation/types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
// import { useStores } from "models/root-store"
import { images, spacing } from 'theme'
import { DateFormat } from 'utils'
import { EventPlace } from './components/EventPlace'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
})

const LoadingComponent = () => {
  return (
    <Screen>
      <Header headerTx="eventDetailScreen.header" leftIcon="back" />
      <AppLoading />
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
      <AppError messages={['errors.common', error.message]} heroImg={images.error} />
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

    if (error || data?.getEventById?.error) {
      return <ErrorComponent error={error || data.getEventById.error} />
    }

    const time = `${moment(data?.getEventById?.event?.startTime)
      .local()
      .format(DateFormat.fullDateTime)} - ${moment(data?.getEventById?.event?.endTime)
      .local()
      .format(DateFormat.fullDateTime)}`

    return (
      <Screen preset="scroll">
        <Header headerTx={data.getEventById?.event?.information?.eventName} leftIcon="back" />
        <View style={styles.container}>
          <EventPlace place={data?.getEventById?.event?.place} />
          <AppDivider />

          <View row>
            <Icon name="clock" />
            <SizedBox w={3} />
            <Text text={time} />
          </View>
          <AppDivider />
        </View>
      </Screen>
    )
  },
)
