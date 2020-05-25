import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import Constants from 'expo-constants'
// import NetInfo from "@react-native-community/netinfo"
import { ApolloOfflineClient } from 'offix-client'
import { AsyncStorage, Platform } from 'react-native'
import { ReactNativeNetworkStatus } from './ReactNativeNetworkStatus'
const { createUploadLink } = require('apollo-upload-client')

const ip = Constants.manifest.extra.ip
const GRAPHQL_URL = `http://${Platform.OS === 'ios' ? 'localhost' : ip}:4000/graphql`

const cacheStorage = {
  getItem: async key => {
    const data = await AsyncStorage.getItem(key)
    if (typeof data === 'string') {
      return JSON.parse(data)
    }
    return data
  },
  setItem: (key, value) => {
    let valueStr = value
    if (typeof valueStr === 'object') {
      valueStr = JSON.stringify(value)
    }
    return AsyncStorage.setItem(key, valueStr)
  },
  removeItem: key => {
    return AsyncStorage.removeItem(key)
  },
}

const networkStatus: any = new ReactNativeNetworkStatus()

const uploadLink = createUploadLink({
  uri: GRAPHQL_URL,
  headers: {
    'keep-alive': 'true',
  },
})

const links = [uploadLink]

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from(links),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
})
