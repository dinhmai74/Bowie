import { useNavigation } from '@react-navigation/native'
import { Screen, SizedBox, SmallHero, Text, View } from 'components'
import React from 'react'
import styled from 'styled-components'
import { images, metrics, spacing, sw } from 'theme'
import { nDelay, AppRoutes } from 'utils'
import { useStores } from 'models/root-store'

interface SuccessScreenProps {}
const Container = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: sw / 4,
})

const Description = styled(Text)({
  paddingHorizontal: spacing[6],
  textAlign: 'center',
})

export const SuccessScreen: React.FC<SuccessScreenProps> = props => {
  const navigation = useNavigation()
  const { createNewEventStore } = useStores()
  React.useEffect(() => {
    nDelay(2000).then(() => {
      createNewEventStore.reset()
      navigation.navigate(AppRoutes.Home)
    })
  }, [])
  return (
    <View full bgBaseOnTheme>
      <Screen autoPaddingHorizontal>
        <SizedBox h={6} />
        <Text preset="h1medium" tx="createNewEventScreen.info.creatingEvent" />
        <Container>
          <SmallHero heroImg={images.iHappy} imgStyle={metrics.images.md}>
            <SizedBox h={4} />
            <Description tx="createNewEventScreen.info.createSuccess" />
          </SmallHero>
        </Container>
      </Screen>
    </View>
  )
}
