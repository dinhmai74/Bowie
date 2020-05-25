import { ParamListBase, useRoute, RouteProp } from '@react-navigation/native'
import { Header, Screen, Text, View } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
// import { useStores } from "models/root-store"
import MapView, { Region, Marker } from 'react-native-maps'
import { PrimaryModalParamList } from 'navigation/types'
import { getCoordAlpha } from 'utils'

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
})

export interface ViewMapScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

type ScreenRouteProps = RouteProp<PrimaryModalParamList, 'viewMap'>

export const ViewMapScreen: React.FunctionComponent<ViewMapScreenProps> = observer(props => {
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const { params } = useRoute<ScreenRouteProps>()

  const { longitudeDelta, latitudeDelta } = getCoordAlpha(params?.coord.latitude)
  const [region, setRegion] = React.useState<Region>({
    latitude: params?.coord?.latitude,
    longitude: params?.coord?.longitude,
    latitudeDelta,
    longitudeDelta,
  })

  console.tlog('region', region)

  return (
    <Screen>
      <Header
        headerTx={params?.title || 'viewMapScreen.header'}
        leftIcon="back"
        style={styles.header}
      />
      <MapView region={region} style={{ flex: 1 }}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={params?.title}
        />
      </MapView>
    </Screen>
  )
})
