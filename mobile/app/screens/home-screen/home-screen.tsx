import { AppMapView, Header, Screen, View } from 'components'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Event, useQueryGetEventByCoordLazyQuery } from 'app-graphql'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'
import { images } from 'theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>
}

const earthRadiusInKM = 6371
const aspectRatio = 1
const radiusInKM = 1.5

const deg2rad = angle => {
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

const rad2deg = angle => {
  return angle * 57.29577951308232 // angle / Math.PI * 180
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const [location, setLocation] = React.useState<any>({})

  const radiusInRad = radiusInKM / earthRadiusInKM
  const [region, setRegion] = React.useState<Region>({
    latitude: 45.52220671242907,
    longitude: -122.6653281029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  })

  const [loadEvent, { data, error }] = useQueryGetEventByCoordLazyQuery({
    variables: {
      input: {
        longitude: location.coords?.longitude,
        latitude: location.coords?.latitude,
      },
    },
    // onCompleted: data => {
    // if (!data.getEventBaseOnPos.errors) {
    // setMarkers(data.getEventBaseOnPos.events)
    // }
    // },
  })

  if (error) console.tron.log('error', error)

  React.useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
      }

      const location = await Location.getCurrentPositionAsync({})
      setLocation(location)

      if (location.coords) {
        const longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(location.coords?.latitude)))
        const latitudeDelta = aspectRatio * rad2deg(radiusInRad)
        setRegion({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          longitudeDelta,
          latitudeDelta,
        })
      }

      console.tlog('location', location)

      loadEvent()
    }

    getLocationAsync()
  }, [])

  let events: Event[] = []
  // @ts-ignore
  if (data?.getEventBaseOnPos?.events.length > 0) events = [...data.getEventBaseOnPos.events]

  return (
    <Screen preset="scroll">
      <Header
        headerTx="homeScreen.header"
        onLeftPress={() => props.navigation.navigate('authStack')}
      />
      <View style={styles.container}>
        {location !== null && (
          <AppMapView
            // region={{
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            // latitudeDelta: 0.003,
            // longitudeDelta: 0.003,
            // }}
            events={events}
            region={region}
            onRegionChangeComplete={r => {
              setRegion(r)
            }}
          />
        )}
      </View>
    </Screen>
  )
})
