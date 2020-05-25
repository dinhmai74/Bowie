import { Platform } from 'react-native'

export const isIos = Platform.OS === 'ios'

export const getElevation = (elevation = 8) => {
  if (!isIos) {
    return { elevation }
  }

  if (elevation === 0) {
    return {
      shadowColor: 'transparent',
      zIndex: 0,
    }
  }

  return {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.3 * elevation },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * elevation,
  }
}
