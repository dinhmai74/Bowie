import { useNavigation } from '@react-navigation/native'
import {
  AppCircleButton,
  AppFooter,
  Button,
  Screen,
  SizedBox,
  Text,
  TextField,
  View,
} from 'components'
import { useStores } from 'models/root-store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TextStyle } from 'react-native'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { spacing } from 'theme'
import { ChoseTagBottomSheet } from './ChoseTagBottomSheet'

const SInput = styled(TextField)({
  flex: 1,
  marginLeft: spacing[4],
})

const SView = styled(View)({
  alignItems: 'center',
})

const TEXT_AREA_STYLE: TextStyle = {
  minHeight: 120,
}

const FooterRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing[8],
  paddingHorizontal: spacing[6],
})

interface FillEventInfoScreenProps {}

type FormValue = {
  name: string
  description: string
}

export const FillEventInfoScreen: React.FC<FillEventInfoScreenProps> = props => {
  const { createNewEventStore } = useStores()
  const { setValue, register, handleSubmit, errors } = useForm<FormValue>()

  React.useEffect(() => {
    register({ name: 'name' }, { required: 'errors.requiredField' })
    register({ name: 'description' })
  }, [register])

  const onSubmit = (data: FormValue) => {}

  const navigation = useNavigation()
  const refBts = React.useRef(null)

  return (
    <View full bgBaseOnTheme>
      <Screen autoPaddingHorizontal>
        <NewEventHeader headerTx={createNewEventStore.place?.name} />

        <SView row>
          <Text tx="createNewEventScreen.info.yourEventWillBeName" />
          <SInput
            size="small"
            caption={errors?.name?.message.toString()}
            onChangeText={t => setValue('name', t, true)}
          />
        </SView>

        <SizedBox h={4} />
        <View>
          <Text tx="createNewEventScreen.info.details" />
          <SizedBox h={2} />
          <TextField
            multiline={true}
            textStyle={TEXT_AREA_STYLE}
            onChangeText={t => setValue('description', t)}
          />
        </View>

        <SizedBox h={4} />
        <View>
          <Text tx="createNewEventScreen.info.eventstag" />
          <SizedBox h={2} />
          <AppCircleButton
            onPress={() => {
              // refBts.current.snapTo(1)
              refBts.current.snapTo(1)
            }}
          />
        </View>
      </Screen>

      <AppFooter>
        <FooterRow>
          <Button tx="common.pre" onPress={() => navigation.goBack()} />
          <Button tx="common.done" onPress={handleSubmit(onSubmit)} />
        </FooterRow>
      </AppFooter>

      <ChoseTagBottomSheet bsref={refBts} />
    </View>
  )
}
