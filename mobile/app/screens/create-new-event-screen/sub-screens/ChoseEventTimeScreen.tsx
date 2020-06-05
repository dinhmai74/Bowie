import React from 'react'
import { View, Text, Screen, Button, AppDivider } from 'components'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native'
import { PrimaryModalParamList } from 'navigation/types'
import styled from 'styled-components'
import { spacing } from 'theme'

const Container = styled(View)({
  flex: 1,
  paddingHorizontal: spacing[6],
})

const Footer = styled(View)({
  justifyContent: 'flex-end',
  paddingHorizontal: spacing[6],
})

type ScreenRouteProps = RouteProp<PrimaryModalParamList, 'createNewEventTime'>

export const ChoseEventTimeScreen: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<ScreenRouteProps>()
  return (
    <Screen preset="scroll">
      <NewEventHeader headerTx={params.title} />
      <Container>
        <AppDivider />
      </Container>
      <Footer>
        <Button tx="common.next" onPress={() => {}} />
      </Footer>
    </Screen>
  )
}
