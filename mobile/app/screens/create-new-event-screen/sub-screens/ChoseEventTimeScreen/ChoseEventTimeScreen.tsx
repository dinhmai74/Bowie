import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppDivider, Button, Screen, View } from 'components'
import moment from 'moment'
import { PrimaryModalParamList } from 'navigation/types'
import React from 'react'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { spacing } from 'theme'
import { TimePicker } from './TimePicker'

const Container = styled(View)({
  flex: 1,
  paddingHorizontal: spacing[6],
})

const Footer = styled(View)({
  justifyContent: 'flex-end',
  paddingHorizontal: spacing[6],
})

const FooterRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing[8],
})

type ScreenRouteProps = RouteProp<PrimaryModalParamList, 'createNewEventTime'>

export const ChoseEventTimeScreen: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<ScreenRouteProps>()
  const [date, setDate] = React.useState(moment())
  return (
    <Screen preset="scroll">
      <NewEventHeader headerTx={params.title} />
      <Container>
        <AppDivider />
        <TimePicker {...{ date, setDate }} />
        <AppDivider />
      </Container>
      <Footer>
        <FooterRow>
          <Button tx="common.pre" onPress={() => {}} />
          <Button tx="common.next" onPress={() => {}} />
        </FooterRow>
      </Footer>
    </Screen>
  )
}
