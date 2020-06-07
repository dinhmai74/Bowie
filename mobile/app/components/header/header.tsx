import { useNavigation } from '@react-navigation/native'
import { AppIcon, Text } from 'components'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { spacing, useThemes } from '../../theme'
import { HeaderProps } from './header.props'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: spacing[1],
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: spacing[5],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
  },
})

export const Header: React.FunctionComponent<HeaderProps> = props => {
  const { onLeftPress: onLeft, leftIcon, headerTx, style } = props
  const { color } = useThemes()
  const navigation = useNavigation()

  const LeftIcon = ({ style, ...rest }) => (
    <AppIcon icon={leftIcon} style={[style, { tintColor: color['text-basic-color'] }]} {...rest} />
  )

  const onLeftPress = () => {
    onLeft ? onLeft() : navigation.goBack()
  }

  const LeftWrapper: any = leftIcon ? TouchableOpacity : View

  const iconOpacity = leftIcon ? 1 : 0
  return (
    <View style={{ ...styles.root, ...style }}>
      <LeftWrapper style={styles.header} onPress={onLeftPress}>
        {leftIcon && <LeftIcon style={[styles.leftIcon, { opacity: iconOpacity }]} />}
        <Text tx={headerTx} preset="h1medium" />
      </LeftWrapper>
    </View>
  )
}
