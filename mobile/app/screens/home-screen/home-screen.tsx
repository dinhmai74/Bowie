import { AppMapView, Header, Screen, View } from "components"
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet, Image, Text, Animated } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import { useImmer } from "use-immer"
import { Region } from "react-native-maps"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>
}
const Images = [
  "https://i.imgur.com/sNam9iJ.jpg",
  "https://i.imgur.com/N7rlQYt.jpg",
  "https://i.imgur.com/UDrH0wm.jpg",
  "https://i.imgur.com/Ka8kNST.jpg",
]

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const [location, setLocation] = React.useState(null)
  const [region, setRegion] = React.useState<Region>({
    latitude: 45.52220671242907,
    longitude: -122.6653281029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  })
  const [markers, setMarkes] = useImmer([
    {
      coordinate: {
        latitude: 45.524548,
        longitude: -122.6749817,
      },
      title: "Best Place",
      description: "This is the best place in Portland",
      avatar: Images[0],
    },
    {
      coordinate: {
        latitude: 45.524698,
        longitude: -122.6655507,
      },
      title: "Second Best Place",
      description: "This is the second best place in Portland",
      avatar: Images[1],
    },
    {
      coordinate: {
        latitude: 45.5230786,
        longitude: -122.6701034,
      },
      title: "Third Best Place",
      description: "This is the third best place in Portland",
      avatar: Images[2],
    },
    {
      coordinate: {
        latitude: 45.521016,
        longitude: -122.6561917,
      },
      title: "Fourth Best Place",
      description: "This is the fourth best place in Portland",
      avatar: Images[3],
    },
  ])

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== "granted") {
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  React.useEffect(() => {
    getLocationAsync()
  })

  return (
    <Screen preset="scroll">
      <Header
        headerTx="homeScreen.header"
        onLeftPress={() => props.navigation.navigate("authStack")}
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
