import React, { useState } from 'react'
import { Text, View, Screen } from 'components'
import styled from 'styled-components'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import { useStores } from 'models/root-store'

interface FillEventInfoScreenProps {}

export const FillEventInfoScreen: React.FC<FillEventInfoScreenProps> = props => {
  const { createNewEventStore } = useStores()
  return (
    <View full bgBaseOnTheme>
      <Screen preset="scroll">
        <NewEventHeader headerTx={createNewEventStore.place?.name} />
        <Text>12</Text>
      </Screen>
    </View>
  )
}
