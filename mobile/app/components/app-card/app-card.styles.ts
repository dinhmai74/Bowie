import { StyleSheet } from "react-native"
import { getElevation } from "utils"
import { spacing } from "theme"

export const appCardStyles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    borderRadius: spacing[3],
    justifyContent: "center",
    ...getElevation(),
  },
})
