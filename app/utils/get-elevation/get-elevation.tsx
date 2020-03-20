import { Platform } from "react-native"

export const getElevation = (elevation = 8) => {
  if (Platform.OS === "android") {
    return { elevation }
  }

  if (elevation === 0) {
    return {
      shadowColor: "transparent",
      zIndex: 0,
    }
  }

  return {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.3 * elevation },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * elevation,
  }
}
