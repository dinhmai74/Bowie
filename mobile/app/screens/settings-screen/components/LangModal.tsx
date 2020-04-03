import { Text, View } from "components"
import React from "react"
import { StyleSheet, TouchableOpacity as RnTouchable } from "react-native"
import { spacing, useThemes } from "theme"
import { Icon } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { isIos } from "utils"

interface LangItemProps {
  onPress: (value: string) => void
  value: string
}

export const LangItem: React.FC<LangItemProps> = props => {
  const { value, onPress } = props
  const { color } = useThemes()

  const Touchable = isIos ? RnTouchable : TouchableOpacity

  return (
    <Touchable
      onPress={() => {
        onPress(value)
      }}
    >
      <View row style={styles.container}>
        <Text tx={value} />
        <Icon name="ios-arrow-forward" color={color["color-basic-600"]} />
      </View>
    </Touchable>
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
