import { Divider, DividerProps } from '@ui-kitten/components'
import React from 'react'
import { useThemes, spacing } from 'theme'
import { ViewStyle } from 'react-native'

export interface AppDividerProps extends DividerProps {
  space?: number
}

export const AppDivider: React.FunctionComponent<AppDividerProps> = props => {
  // const { someStore } = useStores()
  const { style: propsStyle, space, ...rest } = props
  const { color } = useThemes()
  const style: ViewStyle = {
    backgroundColor: color['color-basic-300'],
    marginVertical: spacing[space],
  }

  return <Divider style={[style, propsStyle]} {...rest} />
}

AppDivider.defaultProps = {
  space: 4,
}
