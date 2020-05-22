import { useNavigation } from '@react-navigation/native'
import { Event, useGetEventByCoordQuery } from 'app-graphql'
import { AppError, AppLoading, AppMapView, Header, Screen, SizedBox, View } from 'components'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'

const HomeWrapper: React.FC = ({ children }) => {
  const { navigate } = useNavigation()
  return (
    <Screen preset="scroll">
      <Header headerTx="homeScreen.header" onLeftPress={() => navigate('authStack')} />
      {children}
    </Screen>
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
  const [errorGetLocation, setErrGetLocation] = React.useState<boolean>(false)

  const radiusInRad = radiusInKM / earthRadiusInKM
  const [region, setRegion] = React.useState<Region>(undefined)

  const { data, error } = useGetEventByCoordQuery({
    variables: {
      input: {
        longitude: location.coords?.longitude,
        latitude: location.coords?.latitude,
      },
    },
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
        setErrGetLocation(false)
      } else {
        setErrGetLocation(true)
      }
    }

    getLocationAsync()
  }, [])

  let events: Event[] = []
  // @ts-ignore
  if (data?.getEventBaseOnPos?.events.length > 0) events = [...data.getEventBaseOnPos.events]

  if (!region)
    return (
      <HomeWrapper>
        <SizedBox h={4} />
        <AppLoading />
      </HomeWrapper>
    )

  if (errorGetLocation)
    return (
      <HomeWrapper>
        <AppError messages={['homeScreen.errors.loadLocation']} />
      </HomeWrapper>
    )

  return (
    <HomeWrapper>
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
