import { Button, Screen, SizedBox, TextField, View, Wallpaper } from 'components'
import { observer } from 'mobx-react-lite'
import { useStores } from 'models/root-store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
// import { useStores } from "models/root-store"
import { metrics, spacing, sw } from 'theme'
import { AppRoutes } from 'utils'
import { NewEventHeader } from './components/NewEventHeader'
import { PickPositionModal } from './PickPositionModal'

const StyledScreen = styled(Screen)({
  backgroundColor: 'transparent',
})

const StyledWallpaper = styled(Wallpaper)(() => ({
  ...metrics.images.lg,
  left: sw / 2 - metrics.images.lg.width / 2,
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
  props => {
    const { createNewEventStore } = useStores()
    const { navigation } = props
    // const navigation = useNavigation()
    const defaultPos = createNewEventStore?.place
      ? createNewEventStore?.place?.coord?.latitude +
        ',' +
        createNewEventStore?.place?.coord?.longitude
      : ''
    const {
      setValue,
      register,
      unregister,
      handleSubmit,
      errors,
      getValues,
      triggerValidation,
    } = useForm<FormData>({
      defaultValues: {
        title: createNewEventStore?.place?.name,
        pos: defaultPos,
      },
    })

    React.useEffect(() => {
      register(
        { name: 'pos' },
        {
          required: 'errors.requiredField',
          pattern: {
            message: 'You should fill with coord like : 1232.100,120.222',
            value: /^([0-9/.\s]*),([0-9/.\s]*)$/,
          },
        },
      )
      register(
        { name: 'title' },
        {
          required: 'errors.requiredField',
        },
      )
      return () => unregister(['pos', 'title']) // unregister input after component unmount
    }, [register])

    const onSubmit = (data: FormData) => {
      const pos = data.pos.replace(/ /g, '').split(',')
      createNewEventStore.setPlaceInfo(Number(pos[0]), Number(pos[1]), data.title)
      navigation.navigate(AppRoutes.createNewEventTime)
    }

    return (
      <View full bgBaseOnTheme>
        <StyledWallpaper preset="bottom" />

        <StyledScreen preset="scroll" autoPaddingHorizontal>
          <NewEventHeader headerTx="createNewEventScreen.header" />
          <TextField
            onChangeText={text => setValue('pos', text, true)}
            label="createNewEventScreen.chosePosLabel"
            caption={errors.pos?.message.toString()}
            defaultValue={getValues().pos}
          />

          <SizedBox h={2} />
          <PickPositionModal
            onSubmit={coord => {
              setValue('pos', `${coord?.latitude}, ${coord?.longitude}`)
              triggerValidation('pos')
            }}
          />
          <SizedBox h={4} />

          <TextField
            onChangeText={text => setValue('title', text, true)}
            label="createNewEventScreen.chosePlaceTitleLabel"
            caption={errors.title?.message.toString()}
            defaultValue={getValues().title}
          />

          <SizedBox h={6} />
          <StyledButton tx="common.next" onPress={handleSubmit(onSubmit)} />
        </StyledScreen>
      </View>
    )
  },
)
