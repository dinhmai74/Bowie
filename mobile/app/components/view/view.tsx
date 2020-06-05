import { Layout, LayoutProps } from '@ui-kitten/components'
import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { ViewStyle, View as RNView } from 'react-native'

export interface ViewProps extends LayoutProps {
  style?: ViewStyle | ViewStyle[]
  children?: JSX.Element | JSX.Element[]
  full?: boolean
  row?: boolean
  bgBaseOnTheme?: boolean
  [rest: string]: any
}

export const View = (props: ViewProps) => {
  // grab the props
  const { full, style, bgBaseOnTheme, children, row, ...rest } = props
  const styleOver: any = mergeAll(
    flatten([style, full && { flex: 1 }, row && { flexDirection: 'row' }]),
  )

  const Wrapper = bgBaseOnTheme ? Layout : RNView

  return (
    <Wrapper style={styleOver} {...rest}>
      {children}
    </Wrapper>
  )
}
