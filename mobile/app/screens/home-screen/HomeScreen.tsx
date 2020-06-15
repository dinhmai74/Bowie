import { EventWithHost, useGetEventByCoordLazyQuery } from 'app-graphql'
import { AppError, AppLoading, AppMapView, Screen, SizedBox, View } from 'components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'
import { getLocationAsync } from 'utils'
import { Header } from './components/Header'
import { useSnackBars } from 'hooks'
import { useNetInfo } from '@react-native-community/netinfo'

const HomeWrapper: React.FC<{ onRefresh: () => void }> = ({ children, onRefresh }) => {
  return (
    <View full bgBaseOnTheme>
      <Screen preset="scroll">
        <Header onRefresh={onRefresh} />
        {children}
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  // const { someStore } = useStores()
  const [errorGetLocation, setErrGetLocation] = React.useState<boolean>(false)
  const { addSnack } = useSnackBars()
  const netInfo = useNetInfo()
  const isOnline = netInfo.isInternetReachable

  const [region, setRegion] = React.useState<Region>(undefined)

  const [fetchEvent, { data }] = useGetEventByCoordLazyQuery({
    variables: {
      input: {
        longitude: region?.longitude,
        latitude: region?.latitude,
      },
    },
    onError: e => {
      console.tron.log('e', e)
      if (!isOnline) addSnack('error.offline', { type: 'warning' })
      else {
        addSnack(e.message, { type: 'warning' })
      }
    },
    fetchPolicy: 'cache-and-network',
  })

  const fetchLocation = () => {
    getLocationAsync()
      .then(region => {
        setRegion(region)
        fetchEvent()
      })
      .catch(e => {
        setErrGetLocation(true)
        addSnack(e.message, { type: 'warning' })
      })
  }

  const refetch = async () => {
    if (!region) {
      await fetchLocation()
    } else {
      fetchEvent()
    }
  }

  // @ts-ignore
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    })

    return unsubscribe
  }, [navigation])

  let events: EventWithHost[] = []
  // @ts-ignore
  if (data?.getEventBaseOnPos?.length > 0) events = [...data.getEventBaseOnPos]

  if (!region)
    return (
      <HomeWrapper onRefresh={() => refetch()}>
        <SizedBox h={4} />
        <AppLoading />
      </HomeWrapper>
    )

  if (errorGetLocation)
    return (
      <HomeWrapper onRefresh={() => fetchEvent()}>
        <AppError messages={['homeScreen.errors.loadLocation']} />
      </HomeWrapper>
    )

  return (
    <HomeWrapper onRefresh={() => fetchEvent()}>
      <View style={styles.container}>
        {region !== null && (
          <AppMapView
            events={events}
            region={region}
            onRegionChangeComplete={r => {
              setRegion(r)
            }}
          />
        )}
      </View>
    </HomeWrapper>
  )
}
