import { Icon } from '@ui-kitten/components'
import { Place } from 'app-graphql'
import { Button, SizedBox, Text, View } from 'components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { AppRoutes } from 'utils'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
  titleLeft: {
    alignItems: 'center',
  },

  titleRow: {
    justifyContent: 'space-between',
  },
})

interface EventPlaceProps {
  place: Place
}

export const EventPlace: React.FC<EventPlaceProps> = ({ place }) => {
  const { navigate } = useNavigation()
  return (
    <View>
      <View row style={styles.titleRow}>
        <View row style={styles.titleLeft}>
          <Icon name="map-pin" pack="feather" />
          <SizedBox w={2} />
          <Text preset="h3" text={place?.name} />
        </View>

        <View>
          <Button
            tx="eventDetailScreen.showMap"
            appearance="ghost"
            onPress={() => navigate(AppRoutes.viewMap, { coord: place.coord, title: place?.name })}
          />
        </View>
      </View>

      <View>
        <Text>{place?.address}</Text>
      </View>
    </View>
  )
}
