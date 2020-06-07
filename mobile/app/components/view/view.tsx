import { Layout, LayoutProps } from '@ui-kitten/components'
import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { ViewStyle, View as RNView } from 'react-native'
import { spacing } from 'theme'

export interface ViewProps extends LayoutProps {
  style?: ViewStyle | ViewStyle[]
  children?: any
  full?: boolean
  row?: boolean
  bgBaseOnTheme?: boolean
  autoPaddingHorizontal?: boolean
  [rest: string]: any
}

export const View = (props: ViewProps) => {
  // grab the props
  const { full, style, bgBaseOnTheme, children, autoPaddingHorizontal, row, ...rest } = props
  const paddingHorizontal = autoPaddingHorizontal && { paddingHorizontal: spacing[6] }
  const styleOver: any = mergeAll(
    flatten([style, full && { flex: 1 }, paddingHorizontal, row && { flexDirection: 'row' }]),
  )

  const Wrapper = bgBaseOnTheme ? Layout : RNView

  return (
    <Wrapper style={styleOver} {...rest}>
      {children}
    </Wrapper>
  )
}
