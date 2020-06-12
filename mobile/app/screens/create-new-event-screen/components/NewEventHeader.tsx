import { useNavigation } from '@react-navigation/native'
import { AppKittenIcon, Text } from 'components'
import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { metrics, spacing } from 'theme'
import { AppRoutes } from 'utils/strings'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing[5],
    paddingTop: spacing[5],
  },
})

interface NewEventHeaderProps {
  headerTx: string
  style?: ViewStyle
}

export const NewEventHeader: React.FunctionComponent<NewEventHeaderProps> = props => {
  const { headerTx, style } = props
  const navigation = useNavigation()

  return (
    <View style={{ ...styles.root, ...style }}>
      <View style={styles.header}>
        <Text tx={headerTx} preset="h1medium" />
      </View>
      <AppKittenIcon
        name={'x'}
        onPress={() => navigation.navigate(AppRoutes.primaryStack)}
        size={metrics.icon.lg}
      />
    </View>
  )
}
