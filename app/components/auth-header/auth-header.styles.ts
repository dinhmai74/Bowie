import { StyleSheet } from "react-native"
import { spacing } from "theme"

export const authHeaderStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  title: {
    paddingHorizontal: spacing[4],
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
})
