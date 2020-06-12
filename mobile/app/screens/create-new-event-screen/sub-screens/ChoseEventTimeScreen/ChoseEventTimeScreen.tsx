import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { AppDivider, AppIcon, Button, Screen, SizedBox, Text, View } from 'components'
import { AppFooter } from 'components/app-footer/AppFooter'
import { useStores } from 'models/root-store'
import moment from 'moment'
import React from 'react'
import { Platform } from 'react-native'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { images, metrics, spacing } from 'theme'
import { useImmer } from 'use-immer'
import { AppRoutes } from 'utils/strings'
import { DatePicker } from './DatePicker'
import { combineDateAndTime } from 'utils/DateHelper'

const Container = styled(View)({
  flex: 1,
})

const FooterRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing[8],
  paddingHorizontal: spacing[6],
})

const TimepickerWrapper = styled(View)({
  alignItems: 'center',
})

const RowSpaceBetween = styled(View)({
  justifyContent: 'space-between',
  flexDirection: 'row',
})

export const ChoseEventTimeScreen: React.FC = () => {
  const navigation = useNavigation()
  const { createNewEventStore } = useStores()
  const [date, setDate] = React.useState(moment(createNewEventStore.startTime) || moment())
  const [showTimepicker, setShowTimepicker] = useImmer({
    to: false,
    from: false,
  })
  const dffrom = createNewEventStore.startTime
    ? new Date(createNewEventStore.startTime)
    : new Date()
  const dfTo = createNewEventStore.endTime ? new Date(createNewEventStore.endTime) : new Date()
  const [time, setTime] = useImmer({
    from: dffrom,
    to: dfTo,
  })

  const onChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date()
    setShowTimepicker(p => {
      p[type] = Platform.OS === 'ios'
    })
    setTime(p => {
      p[type] = currentDate
    })
  }

  const onSubmit = () => {
    const startDate = combineDateAndTime(date, moment(time.from))
    const endDate = combineDateAndTime(date, moment(time.to))

    createNewEventStore.setEventTime(startDate, endDate)
    navigation.navigate(AppRoutes.createNewEventInfo)
  }

  return (
    <View full bgBaseOnTheme>
      <Screen preset="scroll" autoPaddingHorizontal>
        <NewEventHeader headerTx={createNewEventStore.place?.name} />

        <Container>
          <AppDivider />
          <DatePicker {...{ date, setDate }} />
          <AppDivider />

          <RowSpaceBetween>
            <AppIcon source={images.iCalendar} style={metrics.images.xsm} />
            <TimepickerWrapper row>
              <Text tx="common.from" />
              <SizedBox w={3} />
              <View>
                <Button
                  onPress={() =>
                    setShowTimepicker(p => {
                      p.from = true
                    })
                  }
                  text={moment(time.from).format('HH a')}
                  status="basic"
                  preset="bordered"
                />
              </View>
            </TimepickerWrapper>
          </RowSpaceBetween>
          <SizedBox h={5} />

          <RowSpaceBetween>
            <TimepickerWrapper row>
              <Text tx="common.to" />
              <SizedBox w={3} />
              <View>
                <Button
                  onPress={() =>
                    setShowTimepicker(p => {
                      p.to = true
                    })
                  }
                  text={moment(time.to).format('HH a')}
                  status="basic"
                  preset="bordered"
                />
              </View>
            </TimepickerWrapper>
            <AppIcon source={images.iBooking} style={metrics.images.xsm} />
          </RowSpaceBetween>

          <AppDivider />
        </Container>
      </Screen>

      <AppFooter>
        <FooterRow>
          <Button tx="common.pre" onPress={() => navigation.goBack()} />
          <Button
            tx="common.next"
            onPress={() => {
              onSubmit()
            }}
          />
        </FooterRow>
      </AppFooter>
      {showTimepicker.from && (
        <DateTimePicker
          testID="dateTimePickerTo"
          value={time.from}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={(e, d) => onChange(e, d, 'from')}
        />
      )}

      {showTimepicker.to && (
        <DateTimePicker
          testID="dateTimePickerTo"
          value={time.to}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={(e, d) => onChange(e, d, 'to')}
        />
      )}
    </View>
  )
}
