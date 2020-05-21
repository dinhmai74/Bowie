import React, { useState } from 'react'
import { Place } from 'graphql'
import { Icon } from '@ui-kitten/components'
import { View, Text, SizedBox } from 'components'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {},
  titleRow: {
    alignItems: 'center',
  },
})

interface EventPlaceProps {
  place: Place
}

export const EventPlace: React.FC<EventPlaceProps> = ({ place }) => {
  return (
    <View>
      <View row style={styles.titleRow}>
        <Icon name="map-pin" pack="feather" />
        <SizedBox w={2} />
        <Text preset="h3" text={place.name} />
      </View>
    </View>
  )
}
