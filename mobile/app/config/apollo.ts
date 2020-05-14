import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
// import NetInfo from "@react-native-community/netinfo"
import { ApolloOfflineClient } from "offix-client"
import { AsyncStorage, Platform } from "react-native"
import { ReactNativeNetworkStatus } from "./ReactNativeNetworkStatus"

const ip = "192.168.1.9"

const cacheStorage = {
  getItem: async key => {
    const data = await AsyncStorage.getItem(key)
    if (typeof data === "string") {
      console.log("Get item string", data)
      return JSON.parse(data)
    }
    console.log("Get item", data)
    return data
  },
  setItem: (key, value) => {
    let valueStr = value
    if (typeof valueStr === "object") {
      valueStr = JSON.stringify(value)
    }
    console.log("set item", valueStr)
    return AsyncStorage.setItem(key, valueStr)
  },
  removeItem: key => {
    return AsyncStorage.removeItem(key)
  },
}

const networkStatus: any = new ReactNativeNetworkStatus()

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `http://${Platform.OS === "ios" ? "localhost" : ip}:4000/graphql`,
  }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
})
