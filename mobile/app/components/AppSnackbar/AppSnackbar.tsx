import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Color, spacing } from 'theme'
import { palette } from 'theme/palette'
import { getElevation } from '../../utils/get-elevation/get-elevation'
import { Text } from '../text/text'

interface WrapperProps {
  c: any
  theme: Color
}
const Wrapper = styled(View)<WrapperProps>`
  ${p => `
   border-left-color: ${p.theme[p.c]};
   background-color: ${p.theme['color-basic-100']};
  `};
  padding: ${spacing[3]}px ${spacing[5]}px;
  margin: ${spacing[3]}px 0;
  border-style: solid;
  border-left-width: 3px;
  border-radius: ${spacing[1]}px;
  ${() => ({ ...getElevation(9) })};
`

export type SnackbarType = 'success' | 'warning' | 'danger' | 'info'

export interface SnackbarValue {
  message?: string
  // default is success
  type?: SnackbarType
}

export interface AppSnackbarProps {
  value: SnackbarValue
}

export const AppSnackbar: React.FunctionComponent<AppSnackbarProps> = props => {
  const { value } = props
  const { message: PMessage, type } = value
  let message = PMessage
  if (type === 'danger') message = PMessage.replace('GraphQL error:', '').trim()

  return (
    <Wrapper c={`color-${type || 'success'}-500`}>
      <Text preset="secondary" color={palette.black} tx={message} />
    </Wrapper>
  )
}
