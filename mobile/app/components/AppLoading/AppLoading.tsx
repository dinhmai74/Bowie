import { SmallHero, SmallHeroProps } from 'components/SmallHero/SmallHero'
import React from 'react'
import { images, spacing } from 'theme'
import { Text } from '../text/text'
import styled from 'styled-components'

const StyledText = styled(Text)`
  margin: ${spacing[4]}px 0;
`

interface AppLoadingProps extends SmallHeroProps {}

export const AppLoading: React.FC<AppLoadingProps> = props => {
  // const { someStore } = useStores()

  const { heroImg, imgStyle, wraperStyle } = props

  return (
    <SmallHero {...{ heroImg, imgStyle, wraperStyle }}>
      <StyledText tx="common.loading" />
    </SmallHero>
  )
}

AppLoading.defaultProps = {
  heroImg: images.loading,
}
