import { Header, Text, View } from 'components'
import React from 'react'
import { Image, ScrollView, RefreshControl } from 'react-native'
import styled from 'styled-components'
import { images, spacing } from 'theme'
import { Container } from './SavedScreen.styles'

const EmptyImg = styled(Image)({
  width: 375,
  height: 250,
  alignSelf: 'center',
  marginTop: spacing[6],
})

interface EmptyScreenProps {
  fetchData: () => void
}

export const EmptyScreen: React.FC<EmptyScreenProps> = props => {
  const { fetchData } = props
  return (
    <View bgBaseOnTheme full>
      <Container autoPaddingHorizontal>
        <Header headerTx="savedScreen.header" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                fetchData()
              }}
              title="Loading..."
            />
          }
        >
          <Text tx="savedScreen.empty.desc" />
          <EmptyImg source={images.iEmpty} resizeMode="contain" />
        </ScrollView>
      </Container>
    </View>
  )
}
