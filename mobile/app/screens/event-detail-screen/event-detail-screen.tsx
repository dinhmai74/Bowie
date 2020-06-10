import { RouteProp, useRoute } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { ApolloError } from 'apollo-client'
import { useGetEventByIdQuery, useJoinEventMutation } from 'app-graphql'
import {
  AppDivider,
  AppError,
  AppLoading,
  Button,
  Header,
  Screen,
  SizedBox,
  Text,
  View,
} from 'components'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { PrimaryParamList } from 'navigation/types'
import React from 'react'
import { ScrollView } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { images, spacing } from 'theme'
import { DateFormat, useSnackBars } from 'utils'
import { EventPlace } from './components/EventPlace'
import { JoinModal } from './components/JoinModal'

const Body = styled(ScrollView)`
  flex: 1;
  padding: 0 ${spacing[6]}px;
`

const BottomView = styled(View)`
  flex: 1;
  width: 100%;
  align-self: flex-end;
  justify-content: flex-end;
  padding: 0 ${spacing[6]}px;
`

const LoadingComponent = () => {
  return (
    <Screen>
      <Header headerTx="eventDetailScreen.header" leftIcon="back" />
      <AppLoading />
    </Screen>
  )
}

interface ErrorComponentProps {
  error: ApolloError
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
    const [joinModal, setJoinModalVisible] = React.useState(false)
    const { addSnack } = useSnackBars()
    const insets = useSafeArea()

    const { loading, error, data } = useGetEventByIdQuery({ variables: { id: params.id } })
    const [joinEvent, { loading: joinEventLoading }] = useJoinEventMutation({
      onError: e => {
        console.tron.log(e)
        addSnack(e.message, { type: 'danger' })
      },
      onCompleted: d => {
        addSnack('Join success!')
      },
    })

    if (loading) return <LoadingComponent />

    if (error) {
      return <ErrorComponent error={error} />
    }

    const event = data?.getEventById
    const time = `${moment(event?.startTime)
      .local()
      .format(DateFormat.fullDateTime)} - ${moment(event?.endTime)
      .local()
      .format(DateFormat.fullDateTime)}`

    return (
      <Screen>
        <Header headerTx={event?.information?.eventName} leftIcon="back" />
        <Body>
          <EventPlace place={event?.place} />
          <AppDivider />

          <View row>
            <Icon name="clock" />
            <SizedBox w={3} />
            <Text text={time} />
          </View>
          <AppDivider />

          <View>
            <Text tx="eventDetailScreen.information" preset="h3" />
            <SizedBox w={3} />
            <Text tx={event.information.description} />
          </View>
          <AppDivider />
        </Body>

        <BottomView style={{ paddingBottom: insets.bottom || spacing[6] }}>
          <Button tx="eventDetailScreen.join" full onPress={() => setJoinModalVisible(true)} />
        </BottomView>

        <JoinModal
          visible={joinModal}
          onBackdropPress={() => setJoinModalVisible(false)}
          onAccepted={type => {
            setJoinModalVisible(false)
            joinEvent({
              variables: {
                input: {
                  type,
                  eventId: event?.id,
                },
              },
            })
          }}
        />
      </Screen>
    )
  },
)
