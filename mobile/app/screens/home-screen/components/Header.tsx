import { AppKittenIcon, Button, SizedBox, Text, View } from 'components'
import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { spacing } from 'theme'
import { HomeEventTag } from '../HomeScreen'
import { useNavigation } from '@react-navigation/native'
import { AppRoutes } from 'utils'

export interface HeaderProps {
  style?: any
  onRefresh: () => void
  tags?: HomeEventTag[]
  selectedTags?: Record<string, any>
  onSelectedChange?: (id: string, value: boolean) => void
}

export const Header: React.FC<HeaderProps> = props => {
  const { onRefresh, style, tags, selectedTags, onSelectedChange } = props
  const navigation = useNavigation()

  return (
    <Container style={style}>
      <HeaderWrapper>
        <Text tx="homeScreen.header" preset="h1medium" />
        <IconRow>
          <AppKittenIcon
            name="search"
            onPress={() => {
              navigation.navigate(AppRoutes.searchEventScreen)
            }}
          />

          <SizedBox w={5} />
          <AppKittenIcon
            name="refresh-cw"
            onPress={() => {
              onRefresh()
            }}
          />
        </IconRow>
      </HeaderWrapper>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tags?.map(v => {
          return (
            <TagButton
              key={v.id}
              text={v.name}
              status={selectedTags && selectedTags[v.id] ? 'primary' : 'basic'}
              preset={selectedTags && selectedTags[v.id] ? undefined : 'bordered'}
              appearance="filled"
              onPress={() => {
                onSelectedChange(v.id, !selectedTags[v.id])
              }}
            />
          )
        })}
      </ScrollView>
    </Container>
  )
}

const IconRow = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const Container = styled(View)`
  padding: ${spacing[5]}px ${spacing[4]}px;
`

const HeaderWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${spacing[2]}px;
  padding-bottom: ${spacing[2]}px;
`

const TagButton = styled(Button)({
  marginHorizontal: spacing[2],
})

Header.defaultProps = {
  onRefresh: () => {},
}
