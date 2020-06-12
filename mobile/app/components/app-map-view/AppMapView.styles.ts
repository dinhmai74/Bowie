import { StyleSheet } from 'react-native'
import { sw, sh, spacing, metrics } from 'theme'

export const appMapViewStyles = StyleSheet.create({
  bottomInfo: {
    alignItems: 'center',
    bottom: 150,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  bottomInfoButton: {
    alignSelf: 'center',
  },
  bottomInfoContent: {
    alignItems: 'center',
    padding: spacing[4],
  },
  bottomInfoImage: {
    ...metrics.images.thumbnail,
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mapStyle: {
    height: sh,
    width: sw,
  },
  wrapper: {
    justifyContent: 'center',
  },
})
