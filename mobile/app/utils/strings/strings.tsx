export const strings = {
  lang: 'lang',
  token: 'userToken',
}

export const toCapitalize = (text: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const AppRoutes = {
  welcome: 'welcome',
  signIn: 'signIn',
  authStack: 'authStack',
  primaryWithModalStack: 'primaryStackWithModal',
  Home: 'Home',
  Saved: 'Saved',
  Notifications: 'Notifications',
  Settings: 'Settings',
  homeStack: 'homeStack',
  createNewEvent: 'createNewEvent',
  eventDetail: 'eventDetail',
  primaryStack: 'primaryStack',
  viewMap: 'viewMap',
}

export const DateFormat = {
  hourMinuteWithIndicator: 'HH:mm a',
  fullDateTime: 'DD MMM [at] HH:mm a',
}
