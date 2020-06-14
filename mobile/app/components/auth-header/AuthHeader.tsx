import { useNavigation } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { metrics, useThemes } from 'theme'
import { Text } from '../text/text'
// import { useStores } from "../../models/root-store"
import { authHeaderStyles as styles } from './AuthHeaderstyles'
import { AppKittenIcon } from 'components/app-kitten-icon/AppKittenIcon'

export interface AuthHeaderProps {
  onBack?: () => void
}

export const AuthHeader: React.FunctionComponent<AuthHeaderProps> = props => {
  // const { someStore } = useStores()

  const { toggle, theme } = useThemes()
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
        <AppKittenIcon name="ios-arrow-back" size={metrics.icon.md} pack="ionicons" />
        <Text style={styles.title} tx="auth.welcome" />
      </TouchableOpacity>

      <AppKittenIcon
        name={themeIcon}
        size={metrics.icon.md}
        pack="feather"
        onPress={() => toggle()}
      />
    </View>
  ))
}
