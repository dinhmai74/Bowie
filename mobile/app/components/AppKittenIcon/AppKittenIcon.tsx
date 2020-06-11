import { Icon, IconProps } from '@ui-kitten/components'
import React from 'react'
import styled from 'styled-components'
import { useThemes } from 'theme'

const StyledIcon = styled(Icon)({})

export interface AppKittenIconProps extends IconProps {}

export const AppKittenIcon: React.FunctionComponent<AppKittenIconProps> = props => {
  // const { someStore } = useStores()
  const { color } = useThemes()
  const { style: PStyle, ...rest } = props

  return <StyledIcon style={[{ tintColor: color['text-basic-color'] }, PStyle]} {...rest} />
}
