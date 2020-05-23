import React from 'react'
import { View } from 'react-native'
import styled, { StyledComponent } from 'styled-components'
import { Color, spacing } from 'theme'
import { getElevation } from 'utils'
import { Text } from '../text/text'

interface WrapperProps {
  c: keyof Color
  theme: Color
}
const Wrapper = styled(View)<WrapperProps>`
  ${p => `
   border-left-color: ${p.theme[p.c]};
   background-color: ${p.theme['color-basic-100']};
  `};
  padding: ${spacing[3]}px ${spacing[5]}px;
  margin: ${spacing[4]}px 0;
  border-style: solid;
  border-left-width: 2px;
  border-radius: ${spacing[1]}px;
  ${() => ({ ...getElevation(9) })};
`

export type SnackbarType = 'success' | 'warning' | 'alert' | 'info'

export interface SnackbarValue {
  message?: string
  // default is success
  type?: SnackbarType
}

export interface AppSnackbarProps {
  value: SnackbarValue
}

interface AppSnackbarColor {
  [key: string]: keyof Color
}

const colors: AppSnackbarColor = {
  warning: 'color-warning-500',
  success: 'color-success-500',
  error: 'color-danger-500',
  info: 'color-info-500',
}

export const AppSnackbar: React.FunctionComponent<AppSnackbarProps> = props => {
  const { value } = props
  const { message, type } = value

  return (
    <Wrapper c={colors[type || 'success']}>
      <Text preset="secondary">{message}</Text>
    </Wrapper>
  )
}
