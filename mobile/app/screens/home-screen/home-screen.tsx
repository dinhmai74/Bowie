import { EventWithHost, useGetEventByCoordLazyQuery } from 'app-graphql'
import { AppError, AppLoading, AppMapView, Screen, SizedBox, View } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'
import { useNetworkStatus } from 'react-offix-hooks'
import { getLocationAsync, SnackBarContext } from 'utils'
import { Header } from './components/Header'

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

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(({ navigation }) => {
  // const { someStore } = useStores()
  const [errorGetLocation, setErrGetLocation] = React.useState<boolean>(false)
  const { addSnack } = React.useContext(SnackBarContext)
  const isOnline = useNetworkStatus()

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

  React.useEffect(() => {
    getLocationAsync()
      .then(region => {
        setRegion(region)
      })
      .catch(e => {
        setErrGetLocation(true)
        addSnack(e.message, { type: 'warning' })
      })

    navigation.addListener('focus', () => {
      fetchEvent()
    })
  }, [])

  let events: EventWithHost[] = []
  // @ts-ignore
  if (data?.getEventBaseOnPos?.length > 0) events = [...data.getEventBaseOnPos]

  if (!region)
    return (
      <HomeWrapper onRefresh={() => fetchEvent()}>
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
})
