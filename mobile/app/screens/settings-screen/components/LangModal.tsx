import { Text, View } from "components"
import React from "react"
import { StyleSheet } from "react-native"
import { spacing, useThemes } from "theme"
import { Icon } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native-gesture-handler"

interface LangItemProps {
  onPress: (value: string) => void
  value: string
}

export const LangItem: React.FC<LangItemProps> = props => {
  const { value, onPress } = props
  const { color } = useThemes()

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value)
      }}
    >
      <View row style={styles.container}>
        <Text tx={value} />
        <Icon name="ios-arrow-forward" color={color["color-basic-600"]} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
})

