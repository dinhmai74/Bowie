import { Screen, SizedBox, SmallHero, Text, View } from 'components'
import React from 'react'
import styled from 'styled-components'
import { images, sw, metrics, spacing } from 'theme'

const Container = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: sw / 4,
})

const Description = styled(Text)({
  paddingHorizontal: spacing[6],
  textAlign: 'center',
})

interface LoadingScreenProps {}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <View full bgBaseOnTheme>
      <Screen autoPaddingHorizontal>
        <SizedBox h={6} />
        <Text preset="h1medium" tx="createNewEventScreen.info.creatingEvent" />
        <Container>
          <SmallHero heroImg={images.loading} imgStyle={metrics.images.md}>
            <SizedBox h={4} />
            <Description tx="createNewEventScreen.info.loadingDesc" />
          </SmallHero>
        </Container>
      </Screen>
    </View>
  )
}
