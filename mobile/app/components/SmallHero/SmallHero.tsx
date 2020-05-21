import { Screen } from 'components/screen/screen'
import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, View, ViewStyle } from 'react-native'
import { images, metrics } from 'theme'
import { smallHeroStyles as styles } from './SmallHero.styles'

export interface SmallHeroProps {
  heroImg?: ImageSourcePropType
  imgStyle?: ImageStyle
  wraperStyle?: ViewStyle
}

export const SmallHero: React.FunctionComponent<SmallHeroProps> = props => {
  // const { someStore } = useStores()
  const { wraperStyle, heroImg, children, imgStyle } = props

  return (
    <Screen>
      <View style={[styles.wrapper, wraperStyle]}>
        <Image source={heroImg} style={[metrics.images.sm, imgStyle]} />
        {children}
      </View>
    </Screen>
  )
}

SmallHero.defaultProps = {
  heroImg: images.loading,
}
