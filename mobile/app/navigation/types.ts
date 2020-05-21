export type RootParamList = {
  primaryStack: undefined
  authStack: undefined
}

export type HomeParamList = {
  Home: undefined
  Saved: undefined
  Notifications: undefined
  Settings: undefined
}

export type PrimaryParamList = {
  homeStack: undefined
  createNewEvent: undefined
  eventDetail: { id: string }
}

export type AuthParamList = {
  welcome: undefined
  signIn: undefined
}
