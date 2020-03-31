import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

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
  },
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
}
