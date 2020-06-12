import { Button, Icon, ButtonProps } from '@ui-kitten/components'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { metrics } from 'theme'
import { ViewStyle } from 'react-native'

const StarIcon = props => <Icon {...props} name="plus" pack="feather" />
const SButton = styled(Button)({
  padding: 0,
})

export interface AppCircleButtonProps extends ButtonProps {
  width?: number
}

export const AppCircleButton: React.FunctionComponent<AppCircleButtonProps> = props => {
  // const { someStore } = useStores()
  const { width = metrics.icon.xl, accessoryLeft = StarIcon, ...rest } = props

  const buttonStyle: ViewStyle = {
    width: width,
    height: width,
    borderRadius: width / 2,
  }

  return useObserver(() => <SButton {...{ accessoryLeft }} style={buttonStyle} {...rest} />)
}
