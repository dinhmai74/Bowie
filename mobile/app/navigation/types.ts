import { Coord } from 'app-graphql'

export type RootParamList = {
  primaryStackWithModal: undefined
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
  eventDetail: { id: string }
}

export type PrimaryModalParamList = {
  primaryStack: undefined
  createNewEvent: undefined
  viewMap: {
    coord: Coord
    title: string
  }
}

export type AuthParamList = {
  welcome: undefined
  signIn: undefined
}
