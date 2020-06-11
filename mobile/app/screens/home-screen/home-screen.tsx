import { EventWithHost, useGetEventByCoordLazyQuery } from 'app-graphql'
import { AppError, AppLoading, AppMapView, Screen, SizedBox, View } from 'components'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'
import { getCoordAlpha, nDelay, SnackBarContext } from 'utils'
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
  const [location, setLocation] = React.useState<any>({})
  const [errorGetLocation, setErrGetLocation] = React.useState<boolean>(false)
  const { addSnack } = React.useContext(SnackBarContext)

  const [region, setRegion] = React.useState<Region>(undefined)

  const [fetchEvent, { data, error }] = useGetEventByCoordLazyQuery({
    variables: {
      input: {
        longitude: location.coords?.longitude,
        latitude: location.coords?.latitude,
      },
    },
    onCompleted: data => {
      console.tron.log(data)
    },
    onError: e => {
      nDelay(100).then(() => {
        addSnack(e.message, { type: 'warning' })
      })
    },
  })

  if (error) {
    console.tron.log('errorg get lcoation', error)
  }

  React.useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        nDelay(100).then(() => {
          addSnack('permissionLocation', {
            type: 'danger',
          })
        })
      }

      const location = await Location.getCurrentPositionAsync({})

      setLocation(location)

      if (location.coords) {
        const { longitudeDelta, latitudeDelta } = getCoordAlpha(location.coords?.latitude)
        setRegion({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          longitudeDelta,
          latitudeDelta,
        })
        fetchEvent()
        setErrGetLocation(false)
      } else {
        setErrGetLocation(true)
      }
    }

    getLocationAsync()

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
        {location !== null && (
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
