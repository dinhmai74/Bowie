import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@ui-kitten/components'
import { Event } from 'app-graphql'
import { AppCard, Button, Text } from 'components'
import { AppIcon } from 'components/app-icon/AppIcon'
import { SizedBox } from 'components/sized-box/sized-box'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import MapView, { Marker as MapMarker, MarkerProps } from 'react-native-maps'
import { images, metrics, useThemes } from 'theme'
import { Color } from 'theme/color-model'
import { appMapViewStyles as styles } from './app-map-view.styles'

export type Region = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export interface AppMarker extends MarkerProps {
  coordinate: any
  avatar: any
}

const AppMarker: React.FC<AppMarker> = ({ coordinate, avatar, ...rest }) => {
  // const [track, setTrack] = useState(true)
  return (
    <MapMarker coordinate={coordinate} {...rest}>
      <Avatar source={avatar} />
    </MapMarker>
  )
}

interface AppMarkerCardProps {
  event: Event
  color: Color
}

const AppMarkerCard: React.FC<AppMarkerCardProps> = ({ event, color }) => {
  const navigation = useNavigation()
  return (
    <AppCard style={styles.bottomInfoContent}>
      <Image source={images.place} style={styles.bottomInfoImage} />
      <SizedBox h={4} />
      <Text text={event.information.eventName} preset="bold" />
      <SizedBox h={4} />
      <Text text={event.information.description} />
      <SizedBox h={4} />
      <Button
        style={[styles.bottomInfoButton, { backgroundColor: color['background-basic-color-1'] }]}
        appearance="outline"
        onPress={() => navigation.navigate('eventDetail', { id: event.id })}
        tx="homeScreen.viewDetail"
      />
    </AppCard>
  )
}

export type MarkerField = {}

export interface AppMapViewProps {
  region: Region
  onRegionChange?: (region: Region) => void
  onRegionChangeComplete?: (region: Region) => void
  events?: Event[]
  style?: any
}

export const AppMapView: React.FunctionComponent<AppMapViewProps> = props => {
  const { style, events, children } = props
  const [selected, setSelected] = useState<number>(null)
  const { color } = useThemes()

  const onPressMarker = (location: any, index: number) => {
    setSelected(index)
  }

  return (
    <>
      <MapView
        style={[styles.mapStyle, style]}
        region={props.region}
        showsUserLocation={true}
        {...props}
      >
        {events.map((marker, index) => {
          return (
            <AppMarker
              key={index}
              // TODO: replace avatar by iamge
              avatar={images.place}
              coordinate={marker.place.coord}
              onPress={location => onPressMarker(location, index)}
              // {...{ opacity }}
            />
          )
        })}
        {children}
      </MapView>
      {selected !== null && (
        <View style={styles.bottomInfo}>
          <AppIcon
            icon="close"
            size={metrics.icon.lg}
            onPress={() => setSelected(null)}
            preset="raise"
          />
          <SizedBox h={5} />
          <AppMarkerCard event={events[selected]} color={color} />
        </View>
      )}
    </>
  )
}

// const StarIcon = style => <Icon {...style} name="ios-close" />
