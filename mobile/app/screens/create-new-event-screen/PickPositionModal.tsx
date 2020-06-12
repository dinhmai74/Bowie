import { Text, View } from 'components'
import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'
import styled from 'styled-components'
import { spacing } from 'theme'
import { useImmer } from 'use-immer'
import { getCoordAlpha } from 'utils/calcCoordAlpha'
import { getLocationAsync } from 'utils/get-location'

interface PickPositionModalProps {
  onSubmit: (coord: LatLng) => void
}

export const PickPositionModal: React.FC<PickPositionModalProps> = ({ onSubmit }) => {
  const [visible, setVisible] = React.useState(false)
  const latitude = 0
  const longitude = 0
  const { longitudeDelta, latitudeDelta } = getCoordAlpha(latitude)
  const [region, setRegion] = useImmer<Region>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta,
    longitudeDelta,
  })
  const [coord, setCoord] = useImmer<LatLng>({
    latitude: latitude,
    longitude: longitude,
  })

  const setPosition = (r: Region) => {
    const { longitudeDelta, latitudeDelta } = getCoordAlpha(r.latitude)
    setRegion(d => {
      d.latitude = r.latitude
      d.longitude = r.longitude
      d.latitudeDelta = longitudeDelta
      d.latitudeDelta = latitudeDelta
    })

    setCoord(d => {
      d.latitude = r.latitude
      d.longitude = r.longitude
    })
  }

  React.useEffect(() => {
    getLocationAsync().then(r => {
      setPosition(r)
    })
  }, [])

  const coordString = `${coord.latitude.toFixed(3)}, ${coord.longitude.toFixed(3)}`

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true)
        }}
      >
        <Text tx="createNewEventScreen.orPickFromMap" status="primary" />
      </TouchableOpacity>

      <Modal visible={visible}>
        <SHeader>
          <Text tx="common.back" status="primary" onPress={() => setVisible(false)} />
          <Text text={coordString} preset="h2medium" />
          <Text
            tx="common.done"
            status="primary"
            onPress={() => {
              onSubmit(coord)
              setVisible(false)
            }}
          />
        </SHeader>

        <MapView
          region={region}
          // eslint-disable-next-line
          style={{ flex: 1 }}
          // onRegionChangeComplete={handleRegionChange}
        >
          <Marker
            coordinate={coord}
            title={coordString}
            draggable
            onDragEnd={e => {
              if (e.nativeEvent.coordinate) {
                const { latitude, longitude } = e.nativeEvent.coordinate
                console.tron.log('dragEnd', latitude, longitude)

                setCoord(d => {
                  d.latitude = latitude
                  d.longitude = longitude
                })
              }
            }}
            onPress={() => {
              console.tron.log('coord', coord)
            }}
          />
        </MapView>
      </Modal>
    </>
  )
}

const SHeader = styled(View)({
  padding: spacing[4],
  paddingVertical: spacing[2],
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})
