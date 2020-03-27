import { StyleSheet } from "react-native"
import { sw, sh } from "theme"

export const appMapViewStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mapStyle: {
    height: sh,
    width: sw,
  },
  wrapper: {
    justifyContent: "center",
  },
})

