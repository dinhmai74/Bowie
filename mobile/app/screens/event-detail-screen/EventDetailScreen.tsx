import { RouteProp, useRoute } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { ApolloError } from 'apollo-client'
import { useGetEventByIdQuery, useJoinEventMutation, useDisbandEventMutation } from 'app-graphql'
import {
  AppAvatar,
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
import { AppImageWithFetch } from 'components/app-image-with-fetch/AppImageWithFetch'
import { useSnackBars } from 'hooks'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { PrimaryParamList } from 'navigation/types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { images, metrics, spacing } from 'theme'
import { DateFormat } from 'utils'
import { EventPlace } from './components/EventPlace'
import { JoinModal } from './components/JoinModal'
import { useStores } from 'models/root-store'

const Body = styled(ScrollView)`
  flex: 1;
  padding: 0 ${spacing[6]}px;
`

const BottomView = styled(View)`
  width: 100%;
  align-self: flex-end;
  justify-content: flex-end;
  padding: 0 ${spacing[6]}px;
`

const imgSize = {
  width: metrics.images.lg.width,
  height: (metrics.images.lg.width * 2) / 3,
}

const styles = StyleSheet.create({
  galleriesContainer: {
    ...imgSize,
    marginRight: spacing[6],
    marginVertical: spacing[4],
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
  ({ navigation }) => {
    const { userInfoStore } = useStores()
    const { params } = useRoute<ScreenRouteProps>()
    const [joinModal, setJoinModalVisible] = React.useState(false)
    const { addSnack, addErr } = useSnackBars()
    const insets = useSafeArea()

    const onError = (e: ApolloError) => addErr(e.message)

    const { loading: loadingGetEvent, error, data } = useGetEventByIdQuery({
      variables: { id: params.id },
    })
    const [mujoinEvent, { loading: loadingJointEvent }] = useJoinEventMutation({
      onError,
      onCompleted: () => {
        addSnack('eventDetailScreen.joinSuccess')
      },
    })

    const [muDisband, { loading: loadingDisband }] = useDisbandEventMutation({
      variables: {
        id: params.id,
      },
      onError,
      onCompleted: () => {
        addSnack('eventDetailScreen.disbandSuccess')
        navigation.goBack()
      },
    })

    console.tron.log('loading', loadingJointEvent)

    const loading = loadingGetEvent
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

    const isHosted = event?.hostInfo?.id === userInfoStore.id
    const btnJoinTx = isHosted ? 'eventDetailScreen.disband' : 'eventDetailScreen.join'

    return (
      <View full bgBaseOnTheme>
        <Screen>
          <Header
            headerTx={event?.information?.eventName}
            leftIcon="back"
            style={{ paddingLeft: spacing[4] }}
          />
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
              <Text tx={event?.information?.description} />
            </View>
            <AppDivider />

            <View row>
              <Text preset="h3" tx="common.hosted" />
              <SizedBox w={4} />
              <AppAvatar id={data?.getEventById?.hostInfo?.avatarId} />
            </View>
            <AppDivider />

            <View>
              <Text preset="h3" tx="eventDetailScreen.gallary" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.getEventById?.galleries.map(v => {
                  return (
                    <AppImageWithFetch
                      id={v}
                      key={v}
                      containerStyle={styles.galleriesContainer}
                      style={imgSize}
                      layoutStyle={imgSize}
                    />
                  )
                })}
              </ScrollView>
            </View>
          </Body>
        </Screen>

        <BottomView style={{ paddingBottom: insets.bottom || spacing[6] }}>
          <Button
            tx={btnJoinTx}
            full
            loading={loadingDisband}
            disabled={loadingDisband}
            onPress={() => {
              if (!isHosted) setJoinModalVisible(true)
              else {
                muDisband()
              }
            }}
          />
        </BottomView>

        <JoinModal
          visible={joinModal}
          onBackdropPress={() => setJoinModalVisible(false)}
          onAccepted={type => {
            setJoinModalVisible(false)
            mujoinEvent({
              variables: {
                input: {
                  type,
                  eventId: event?.id,
                },
              },
            })
          }}
        />
      </View>
    )
  },
)
