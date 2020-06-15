import { Modal } from '@ui-kitten/components'
import { Text, View } from 'components'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'
import styled from 'styled-components'
import { sh, spacing, sw } from 'theme'
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
  const [region, setRegion] = useState<Region>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta,
    longitudeDelta,
  })
  const [coord, setCoord] = useState<LatLng>({
    latitude: latitude,
    longitude: longitude,
  })

  const setPosition = (r: Region) => {
    const { longitudeDelta, latitudeDelta } = getCoordAlpha(r.latitude)
    setRegion(p => ({
      ...p,
      latitude: r.latitude,
      longitude: r.longitude,
      latitudeDelta,
      longitudeDelta,
    }))

    setCoord(p => ({
      ...p,
      latitude: r.latitude,
      longitude: r.longitude,
    }))
  }

  const [temp, setTemp] = useImmer({
    latitude: 0,
    longitude: 0,
  })

  console.log('t', temp, setTemp)

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

        <Modal visible={visible}>
          <Container bgBaseOnTheme>
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

                    setCoord({
                      latitude,
                      longitude,
                    })
                  }
                }}
              />
            </MapView>
          </Container>
        </Modal>
      </TouchableOpacity>
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

const Container = styled(View)({
  width: sw,
  height: sh,
})
