import React from 'react'
import { View, ViewProps } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { spacing } from 'theme'

const Footer = styled(View)({
  justifyContent: 'flex-end',
  paddingBottom: spacing[5],
  paddingTop: spacing[1],
})

export interface AppFooterProps extends ViewProps {}

export const AppFooter: React.FunctionComponent<AppFooterProps> = props => {
  // const { someStore } = useStores()
  const { children } = props
  const insets = useSafeArea()
  return <Footer style={{ paddingBottom: insets.bottom || spacing[7] }}>{children}</Footer>
}
