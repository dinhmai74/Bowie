import { Platform } from "react-native"

export * from "./delay"
export * from "./reanimated"
export * from "./get-elevation"
export * from "./custom-hooks"
export * from "./pattern/pattern"
export * from "./strings"

export const isIos = Platform.OS === "ios"
export * from "./AppSnackbarProvider/AppSnackbarProvider"
export * from "./AppAuthProvider/AppAuthProvider"
