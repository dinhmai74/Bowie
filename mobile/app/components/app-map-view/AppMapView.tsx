import { useNavigation } from '@react-navigation/native'
import { EventWithHost } from 'app-graphql'
import { AppIcon } from 'components/app-icon/AppIcon'
import { AppImageWithFetch } from 'components/app-image-with-fetch/AppImageWithFetch'
import { SizedBox } from 'components/sized-box/SizedBox'
import moment from 'moment'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import MapView, { Marker as MapMarker, MarkerProps, LatLng, Region } from 'react-native-maps'
import { images, metrics, useThemes } from 'theme'
import { Color } from 'theme/color-model'
import { DateFormat } from 'utils/DateHelper/DateHelper'
import { appMapViewStyles as styles } from './AppMapView.styles'
import { AppRoutes } from 'utils/strings'
import { AppCard } from 'components/app-card/AppCard'
import { Button } from 'components/button/button'
import { Text } from 'components/text/text'
import { AppAvatar } from 'components/app-avatar/AppAvatar'

export interface AppMapViewProps {
  region: Region
  onRegionChange?: (region: Region) => void
  onRegionChangeComplete?: (region: Region) => void
  events?: EventWithHost[]
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
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        {...props}
      >
        {events.map((marker, index) => {
          return (
            <AppMarker
              key={index}
              // TODO: replace avatar by iamge
              avatar={marker?.hostInfo?.avatarId}
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

interface AppMarkerCardProps {
  event: EventWithHost
  color: Color
}

const AppMarkerCard: React.FC<AppMarkerCardProps> = ({ event }) => {
  const navigation = useNavigation()

  const time = `${moment(event?.startTime)
    .local()
    .format(DateFormat.timeWithIndicator)} - ${moment(event?.endTime)
    .local()
    .format(DateFormat.timeWithIndicator)}`

  return (
    <AppCard style={styles.bottomInfoContent}>
      {event?.thumbnail ? (
        <AppImageWithFetch
          id={event?.thumbnail}
          style={styles.bottomInfoImage}
          containerStyle={metrics.images.thumbnail}
          layoutStyle={metrics.images.thumbnail}
        />
      ) : (
        <Image source={images.place} style={styles.bottomInfoImage} />
      )}
      <SizedBox h={4} />
      <Text text={event?.information?.eventName} preset="bold" />
      <SizedBox h={4} />
      <Text text={time} />
      <SizedBox h={4} />
      <Button
        style={styles.bottomInfoButton}
        onPress={() => navigation.navigate(AppRoutes.eventDetail, { id: event.id })}
        preset="bordered"
        tx="homeScreen.viewDetail"
      />
    </AppCard>
  )
}

export type MarkerField = {}

export interface AppMarker extends MarkerProps {
  coordinate: LatLng
  avatar: any
}

const AppMarker: React.FC<AppMarker> = ({ coordinate, avatar, ...rest }) => {
  // const [track, setTrack] = useState(true)
  return (
    <MapMarker coordinate={coordinate} {...rest}>
      <AppAvatar id={avatar} />
    </MapMarker>
  )
}

// const StarIcon = style => <Icon {...style} name="ios-close" />
