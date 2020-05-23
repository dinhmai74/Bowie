import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const screenSize = { width, height }
export { screenSize, width as sw, height as sh }

export const metrics = {
  images: {
    logo: {
      width: 200,
      height: 200,
    },
    thumbnail: {
      width: 300,
      height: 150,
    },

    sm: {
      width: 200,
      height: 200,
    },
    md: {
      width: 300,
      height: 300,
    },
    lg: {
      width: 400,
      height: 400,
    },
  },
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  screenSize,
}
