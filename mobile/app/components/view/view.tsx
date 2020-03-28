import * as React from "react"
import mergeAll from "ramda/es/mergeAll"
import flatten from "ramda/es/flatten"
import { ViewStyle, View as RNView, ViewProps as RNViewProps } from "react-native"

export interface ViewProps extends RNViewProps {
  style?: ViewStyle | ViewStyle[]
  children?: JSX.Element | JSX.Element[]
  full?: boolean
  [rest: string]: any
}

export const View = (props: ViewProps) => {
  // grab the props
  const { full, style, children, ...rest } = props
  const styleOver = mergeAll(flatten([style, full && { flex: 1 }]))

  return (
    <RNView style={styleOver} {...rest}>
      {children}
    </RNView>
  )
}
