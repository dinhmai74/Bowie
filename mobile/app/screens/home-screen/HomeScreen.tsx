import {
  EventWithHost,
  useGetAllTagQuery,
  useGetEventByCoordLazyQuery,
  GetAllTagQuery,
  EventTag,
} from 'app-graphql'
import { AppError, AppLoading, AppMapView, Screen, SizedBox, View, Button } from 'components'
import { useSnackBars } from 'hooks'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Region } from 'react-native-maps'
import { NavigationScreenProp } from 'react-navigation'
import { useNetworkStatus } from 'react-offix-hooks'
import { getLocationAsync } from 'utils'
import { Header, HeaderProps } from './components/Header'
import styled from 'styled-components'
import { spacing } from 'theme'
import _ from 'lodash'

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>
}

export type HomeEventTag = Pick<EventTag, 'id' | 'name' | 'currentUse'>

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(({ navigation }) => {
  // const { someStore } = useStores()
  const [errorGetLocation, setErrGetLocation] = React.useState<boolean>(false)
  const { addSnack } = useSnackBars()
  const isOnline = useNetworkStatus()
  const [tagsSelectedMap, setTagsSelectedMap] = React.useState({})

  const [region, setRegion] = React.useState<Region>(undefined)

  const [fetchEvent, { data }] = useGetEventByCoordLazyQuery({
    variables: {
      input: {
        longitude: region?.longitude,
        latitude: region?.latitude,
      },
    },
    onError: e => {
      console.tron.log('e', e)
      if (!isOnline) addSnack('error.offline', { type: 'warning' })
      else {
        addSnack(e.message, { type: 'warning' })
      }
    },
    fetchPolicy: 'cache-and-network',
  })

  const { data: dataTags, loading: loadingTags } = useGetAllTagQuery()

  const fetchLocation = () => {
    getLocationAsync()
      .then(region => {
        setRegion(region)
        fetchEvent()
      })
      .catch(e => {
        setErrGetLocation(true)
        addSnack(e.message, { type: 'warning' })
      })
  }

  const refetch = () => {
    if (region) fetchEvent()
    else {
      fetchLocation()
    }
  }

  React.useEffect(() => {
    refetch()
  }, [])

  let events: EventWithHost[] = []
  // @ts-ignore
  if (data?.getEventBaseOnPos?.length > 0) events = [...data.getEventBaseOnPos]

  const loading = !region || loadingTags

  console.tron.log('tagsSelectedMap', tagsSelectedMap)

  /* -------------renders  ------------- */
  if (loading)
    return (
      <HomeWrapper onRefresh={() => refetch()}>
        <SizedBox h={8} />
        <AppLoading />
      </HomeWrapper>
    )

  if (errorGetLocation)
    return (
      <HomeWrapper onRefresh={() => fetchEvent()}>
        <AppError messages={['homeScreen.errors.loadLocation']} />
      </HomeWrapper>
    )

  return (
    <HomeWrapper
      onRefresh={() => fetchEvent()}
      tags={dataTags.getAllTag}
      selectedTags={tagsSelectedMap}
      onSelectedChange={(id, value) =>
        setTagsSelectedMap({
          ...tagsSelectedMap,
          [id]: value,
        })
      }
    >
      <View style={styles.container}>
        {region !== null && (
          <AppMapView
            events={events}
            region={region}
            onRegionChangeComplete={r => {
              setRegion(r)
            }}
          />
        )}
      </View>
    </HomeWrapper>
  )
})

export interface HomeWrapperProps extends HeaderProps {}

const HomeWrapper: React.FC<HomeWrapperProps> = ({
  children,
  onRefresh,
  tags,
  selectedTags,
  onSelectedChange,
}) => {
  return (
    <View full bgBaseOnTheme>
      <Screen>
        <Header {...{ tags, selectedTags, onRefresh, onSelectedChange }} />
        {children}
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
