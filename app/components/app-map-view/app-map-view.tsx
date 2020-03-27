import React from "react"
import MapView, { Marker } from "react-native-maps"
import { appMapViewStyles as styles } from "./app-map-view.styles"

type Region = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}
export interface AppMapViewProps {
  region: Region
  onRegionChange?: (region: Region) => void
  style?: any
}

export const AppMapView: React.FunctionComponent<AppMapViewProps> = props => {
  const { style } = props
  return (
    <MapView
      style={[styles.mapStyle, style]}
      region={props.region}
      showsUserLocation={true}
      onRegionChange={(reg: Region) => props.onRegionChange(reg)}
    >
      <Marker coordinate={props.region} />
    </MapView>
  )
}
