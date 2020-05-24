import { Platform } from 'react-native'

export * from './AppSnackbarProvider/AppSnackbarProvider'
export * from './custom-hooks'
export * from './delay'
export * from './get-elevation'
export * from './pattern/pattern'
export * from './reanimated'
export * from './strings'

export const isIos = Platform.OS === 'ios'
