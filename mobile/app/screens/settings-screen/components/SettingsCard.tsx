import { Text } from 'components'
import { useLocalization } from 'i18n/i18n'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { spacing, typography } from 'theme'
import { palette } from 'theme/palette'

interface SettingsCardProps {
  onPress: () => void
  name: string
  color: string
  style?: any
}

export const SettingsCard: React.FC<SettingsCardProps> = props => {
  const { onPress, name, color: backgroundColor, style } = props
  const { t } = useLocalization()
  const maxLength = 15
  const tx = t(name)
  const title = tx.length > maxLength ? tx.slice(0, maxLength) + '...' : tx
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }, style]} onPress={onPress}>
      <Text
        tx={title}
        color={palette.white}
        fontFamily={typography.bold}
        textAlign="center"
        numberOfLines={2}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing[4],
    paddingVertical: spacing[7],
    width: 150,
  },
})
