import DateTimePicker from '@react-native-community/datetimepicker'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppDivider, AppIcon, Button, Screen, SizedBox, Text, View } from 'components'
import { AppFooter } from 'components/AppFooter/AppFooter'
import moment from 'moment'
import { PrimaryModalParamList } from 'navigation/types'
import React from 'react'
import { Platform } from 'react-native'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { images, metrics, spacing } from 'theme'
import { DatePicker } from './DatePicker'
import { useImmer } from 'use-immer'

const Container = styled(View)({
  flex: 1,
  paddingHorizontal: spacing[6],
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

type ScreenRouteProps = RouteProp<PrimaryModalParamList, 'createNewEventTime'>

export const ChoseEventTimeScreen: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<ScreenRouteProps>()
  const [date, setDate] = React.useState(moment())
  const [show, setShow] = React.useState(false)
  const [showTimepicker, setShowTimepicker] = useImmer({
    to: false,
    from: false,
  })
  const [time, setTime] = useImmer({
    to: new Date(),
    from: new Date(),
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

  return (
    <View full bgBaseOnTheme>
      <Screen preset="scroll">
        <NewEventHeader headerTx={params.title} />

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
          <Button tx="common.next" onPress={() => {}} />
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
