import { Toggle, ToggleProps } from '@ui-kitten/components'
import * as React from 'react'

export interface SwitchProps extends ToggleProps {}

export const Switch: React.FunctionComponent<SwitchProps> = props => {
  const { children, ...rest } = props
  return <Toggle {...rest}>{children}</Toggle>
}
