import { AppMapView, Header, Screen, View } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet } from "react-native"
import { NavigationScreenProp } from "react-navigation"
// import { useStores } from "models/root-store"
import { spacing } from "theme"
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const [location, setLocation] = React.useState(null)
  const [region, setRegion] = React.useState({})

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
        leftIcon="back"
        onLeftPress={() => props.navigation.navigate("authStack")}
      />
      <View style={styles.container}>
        {location !== null && (
          <AppMapView
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            onRegionChange={region => {}}
          />
        )}
      </View>
    </Screen>
  )
})
