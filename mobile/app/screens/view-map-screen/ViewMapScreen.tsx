import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { Header, Screen } from 'components'
import { observer } from 'mobx-react-lite'
import { PrimaryModalParamList } from 'navigation/types'
import React from 'react'
import { StyleSheet } from 'react-native'
// import { useStores } from "models/root-store"
import MapView, { LatLng, Marker, Region } from 'react-native-maps'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { spacing } from 'theme'
import { getCoordAlpha } from 'utils'
import { useImmer } from 'use-immer'

const styles = StyleSheet.create({
  header: {
    left: spacing[4],
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 99,
  },
})

export interface ViewMapScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

type ScreenRouteProps = RouteProp<PrimaryModalParamList, 'viewMap'>

export const ViewMapScreen: React.FunctionComponent<ViewMapScreenProps> = observer(() => {
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const { params } = useRoute<ScreenRouteProps>()
  const { longitudeDelta, latitudeDelta } = getCoordAlpha(params?.coord.latitude)
  const [region] = useImmer<Region>({
    latitude: params?.coord?.latitude,
    longitude: params?.coord?.longitude,
    latitudeDelta,
    longitudeDelta,
  })
  const [coord, setCoord] = useImmer<LatLng>({
    latitude: params?.coord?.latitude,
    longitude: params?.coord?.longitude,
  })

  // const coord = new AnimatedRegion({
  // latitude: params?.coord?.latitude,
  // longitude: params?.coord?.longitude,
  // })

  // const handleRegionChange = mapData => {
  // // setCoord(d => {
  // // d.longitude = mapData.longitude
  // // d.latitude = mapData.latitude
  // // })

  // setRegion(d => {
  // d.longitude = mapData.longitude
  // d.latitude = mapData.latitude
  // })
  // }

  return (
    <Screen>
      <Header
        headerTx={params?.title || 'viewMapScreen.header'}
        leftIcon="back"
        style={styles.header}
      />
      <MapView
        region={region}
        // eslint-disable-next-line
        style={{ flex: 1 }}
        // onRegionChangeComplete={handleRegionChange}
      >
        <Marker
          coordinate={coord}
          title={params?.title}
          draggable
          onDragEnd={e => {
            if (e.nativeEvent.coordinate) {
              const { latitude, longitude } = e.nativeEvent.coordinate

              setCoord(d => {
                d.latitude = latitude
                d.longitude = longitude
              })
            }
          }}
          onPress={() => {}}
        />
      </MapView>
    </Screen>
  )
})
