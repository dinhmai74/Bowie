import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { Text } from '../text/text'
// import { useStores } from "../../models/root-store"
import { authHeaderStyles as styles } from './auth-header.styles'
import { Icon } from '@ui-kitten/components'
import { metrics, useThemes } from 'theme'
import { useNavigation } from '@react-navigation/native'

export interface AuthHeaderProps {
  onBack?: () => void
}

export const AuthHeader: React.FunctionComponent<AuthHeaderProps> = props => {
  // const { someStore } = useStores()

  const { color, toggle, theme } = useThemes()
  const { onBack } = props
  const navigation = useNavigation()

  const themeIcon = theme === 'light' ? 'sun' : 'moon'

  return useObserver(() => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          onBack ? onBack() : navigation.goBack()
        }}
      >
        <Icon
          name="ios-arrow-back"
          size={metrics.icon.md}
          fill={color['color-basic-600']}
          pack="ionicons"
        />
        <Text style={styles.title}>auth.welcome</Text>
      </TouchableOpacity>

      <Icon
        name={themeIcon}
        size={metrics.icon.md}
        fill={color['color-basic-600']}
        pack="feather"
        onPress={() => toggle()}
      />
    </View>
  ))
}
