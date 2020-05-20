import { AppMapView, Header, Screen, View } from 'components'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useQueryGetEventByCoordLazyQuery } from 'graphql'
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
const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' },
]

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

  const [markers, setMarkers] = React.useState([])

  const [loadEvent, { data, error }] = useQueryGetEventByCoordLazyQuery({
    variables: {
      input: {
        longitude: location.coords?.longitude,
        latitude: location.coords?.latitude,
      },
    },
    onCompleted: data => {
      if (!data.getEventBaseOnPos.errors) {
        const newMarkers: any[] = data.getEventBaseOnPos.events.map(v => {
          const converted = {
            coordinate: v.place.coord,
            title: v.information.eventName,
            description: v.information.description.slice(0, 10),
            avatar: images.place,
          }
          return converted
        })

        setMarkers(newMarkers)
      }
    },
  })

  if (error) console.tron.log('error', error)
  console.tron.log('data', data)

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
            markers={markers}
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
