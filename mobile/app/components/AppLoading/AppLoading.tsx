import { SmallHero, SmallHeroProps } from 'components/SmallHero/SmallHero'
import React from 'react'
import { images } from 'theme'
import { Text } from '../text/text'
import { appLoadingStyles as styles } from './AppLoading.styles'

interface AppLoadingProps extends SmallHeroProps {}

export const AppLoading: React.FC<AppLoadingProps> = props => {
  // const { someStore } = useStores()

  const { heroImg, imgStyle, wraperStyle } = props

  return (
    <SmallHero {...{ heroImg, imgStyle, wraperStyle }}>
      <Text tx="common.loading" style={styles.text} />
    </SmallHero>
  )
}

AppLoading.defaultProps = {
  heroImg: images.loading,
}
