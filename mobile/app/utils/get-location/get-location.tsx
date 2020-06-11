import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { getCoordAlpha } from 'utils/calcCoordAlpha'

export const getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    return Promise.reject(new Error('permissionLocation'))
  }

  const location = await Location.getCurrentPositionAsync({})

  // location)

  if (location.coords) {
    const { longitudeDelta, latitudeDelta } = getCoordAlpha(location.coords?.latitude)
    return Promise.resolve({
      latitude: location.coords?.latitude,
      longitude: location.coords?.longitude,
      longitudeDelta,
      latitudeDelta,
    })
  } else {
    return Promise.reject(new Error('Get location without coords'))
  }
}
