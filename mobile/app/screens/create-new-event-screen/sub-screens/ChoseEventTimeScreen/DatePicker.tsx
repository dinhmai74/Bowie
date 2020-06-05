import { Calendar, Layout, Popover } from '@ui-kitten/components'
import { MomentDateService } from '@ui-kitten/moment'
import { AppKittenIcon, Button, SizedBox, Text, View } from 'components'
import moment, { Moment } from 'moment'
import React from 'react'
import styled from 'styled-components'
import { spacing } from 'theme'
import { DateFormat } from 'utils'

const dateService = new MomentDateService()

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: spacing[1],
})

const LeftWrapper = styled(View)({
  alignItems: 'center',
})

const SButton = styled(Button)({
  alignSelf: 'flex-end',
})

interface TimePickerProps {
  date: Moment
  setDate: (m: Moment) => void
}

export const DatePicker: React.FC<TimePickerProps> = props => {
  const { date, setDate } = props
  const [visible, setVisible] = React.useState(false)
  const renderLayout = () => <Layout />

  return (
    <>
      <Container>
        <LeftWrapper row>
          <AppKittenIcon name="calendar" />
          <SizedBox w={4} />
          <Text tx="createNewEventScreen.time.willBeHeldOn" />
        </LeftWrapper>
        <SButton
          text={moment(date).format(DateFormat.monthDate)}
          onPress={() => setVisible(true)}
          status="success"
        />
      </Container>
      <Popover
        visible={visible}
        anchor={renderLayout}
        fullWidth={true}
        onBackdropPress={() => setVisible(false)}
      >
        <Calendar
          dateService={dateService}
          date={date}
          onSelect={nextDate => {
            setDate(nextDate)
            setVisible(false)
          }}
        />
      </Popover>
    </>
  )
}
