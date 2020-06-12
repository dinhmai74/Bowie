import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, View, ViewStyle } from 'react-native'
import styled from 'styled-components'
import { images, metrics } from 'theme'
import { smallHeroStyles as styles } from './SmallHero.styles'

const StyledImage = styled(Image)({
  resizeMode: 'contain',
})

export interface SmallHeroProps {
  heroImg?: ImageSourcePropType
  imgStyle?: ImageStyle
  wraperStyle?: ViewStyle
}

export const SmallHero: React.FunctionComponent<SmallHeroProps> = props => {
  // const { someStore } = useStores()
  const { wraperStyle, heroImg, children, imgStyle } = props

  return (
    <View style={[styles.wrapper, wraperStyle]}>
      <StyledImage source={heroImg} style={[metrics.images.sm, imgStyle]} />
      {children}
    </View>
  )
}

SmallHero.defaultProps = {
  heroImg: images.loading,
}
