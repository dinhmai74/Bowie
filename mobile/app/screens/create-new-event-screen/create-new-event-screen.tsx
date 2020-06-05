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

export const CreateNewEventScreen: React.FunctionComponent<CreateNewEventScreenProps> = observer(
  () => {
    // const { someStore } = useStores()
    const navigation = useNavigation()
    return (
      <View full bgBaseOnTheme>
        <StyledWallpaper preset="bottom" />

        <StyledScreen preset="scroll">
          <NewEventHeader headerTx="createNewEventScreen.header" />
          <Container>
            <TextField label="createNewEventScreen.chosePosLabel" />
            <SizedBox h={4} />
            <TextField label="createNewEventScreen.chosePlaceTitleLabel" />
            <SizedBox h={6} />
            <StyledButton
              tx="common.next"
              onPress={() =>
                navigation.navigate(AppRoutes.createNewEventTime, {
                  title: 'Testing',
                })
              }
            />
          </Container>
        </StyledScreen>
      </View>
    )
  },
)
