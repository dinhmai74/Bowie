import { AppIcon, Button, Text } from "components"
import * as React from "react"
import { StyleSheet, View } from "react-native"
import { spacing, useThemes, metrics } from "../../theme"
import { HeaderProps } from "./header.props"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: spacing[1],
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: spacing[5],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
  },
})

export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress: onLeft,
    onRightPress,
    rightIcon,
    leftIcon,
    headerTx,
    style,
    titleStyle,
  } = props
  const { color } = useThemes()
  const navigation = useNavigation()

  const LeftIcon = ({ style, ...rest }) => (
    <AppIcon icon={leftIcon} style={[style, { tintColor: color["text-basic-color"] }]} {...rest} />
  )

  const onLeftPress = () => {
    onLeft ? onLeft() : navigation.goBack()
  }

  return (
    <View style={{ ...styles.root, ...style }}>
      <View style={styles.header}>
        {leftIcon && <LeftIcon onPress={onLeftPress} style={styles.leftIcon} />}
        <Text text={headerTx} preset="h2medium" />
      </View>
    </View>
  )
}
