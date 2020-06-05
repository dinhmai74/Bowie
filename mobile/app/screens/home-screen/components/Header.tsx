import { Icon } from '@ui-kitten/components'
import { Text, View, AppKittenIcon } from 'components'
import React from 'react'
import styled from 'styled-components'
import { spacing } from 'theme'

const Container = styled(View)`
  flex-direction: row;
  padding: ${spacing[5]}px ${spacing[4]}px;
  justify-content: space-between;
`

interface HeaderProps {
  onRefresh: () => void
}

export const Header: React.FC<HeaderProps> = props => {
  const { onRefresh } = props
  return (
    <Container>
      <Text tx="homeScreen.header" preset="h1medium" />
      <View>
        <AppKittenIcon
          name="refresh-cw"
          onPress={() => {
            onRefresh()
          }}
        />
      </View>
    </Container>
  )
}

Header.defaultProps = {
  onRefresh: () => {},
}
