import { useNavigation } from '@react-navigation/native'
import { Button, Screen, SizedBox, TextField, View, Wallpaper } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { metrics, spacing, sw } from 'theme'
import { AppRoutes } from 'utils'
import { NewEventHeader } from './components/NewEventHeader'
import { useStores } from 'models/root-store'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

const Container = styled(View)({
  flex: 1,
  paddingHorizontal: spacing[6],
  paddingVertical: spacing[2],
})

const StyledScreen = styled(Screen)({
  backgroundColor: 'transparent',
  flex: 1,
  height: '100%',
})

const StyledWallpaper = styled(Wallpaper)(() => ({
  ...metrics.images.md,
  left: sw / 2 - metrics.images.md.width / 2,
  bottom: spacing[7],
}))

const StyledButton = styled(Button)(() => ({
  alignSelf: 'flex-end',
}))

export interface CreateNewEventScreenProps {
  navigation: NavigationScreenProp<any, any>
}

type FormData = {
  pos: string
  title: string
}

export const CreateNewEventScreen: React.FunctionComponent<CreateNewEventScreenProps> = observer(
  () => {
    const { createNewEventStore } = useStores()
    const navigation = useNavigation()
    const { setValue, register, handleSubmit, errors } = useForm<FormData>()

    React.useEffect(() => {
      register(
        { name: 'pos' },
        {
          // required: 'errors.requiredField',
          // pattern: {
          // message: 'You should fill with coord like : 1232.100,120.222',
          // value: /^([0-9/.\s]*),([0-9/.\s]*)$/,
          // },
        },
      )
      register(
        { name: 'title' },
        {
          // required: 'errors.requiredField'
        },
      )
    }, [register])

    const onSubmit = (data: FormData) => {
      // const pos = data.pos.replace(/ /g, '').split(',')
      // createNewEventStore.setPlaceInfo(Number(pos[0]), Number(pos[1]), data.title)
      navigation.navigate(AppRoutes.createNewEventTime, {
        // title: data.title,
        title: '21321',
      })
    }

    return (
      <View full bgBaseOnTheme>
        <StyledWallpaper preset="bottom" />

        <StyledScreen preset="scroll">
          <NewEventHeader headerTx="createNewEventScreen.header" />
          <Container>
            <TextField
              onChangeText={text => setValue('pos', text, true)}
              label="createNewEventScreen.chosePosLabel"
              caption={errors.pos?.message.toString()}
            />
            <SizedBox h={4} />
            <TextField
              onChangeText={text => setValue('title', text, true)}
              label="createNewEventScreen.chosePlaceTitleLabel"
              caption={errors.title?.message.toString()}
            />

            <SizedBox h={6} />
            <StyledButton tx="common.next" onPress={handleSubmit(onSubmit)} />
          </Container>
        </StyledScreen>
      </View>
    )
  },
)
