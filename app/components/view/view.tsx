import * as React from "react"
import { View as RNView, ViewStyle } from "react-native"
import mergeAll from "ramda/es/mergeAll"
import flatten from "ramda/es/flatten"

export interface ViewProps {
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
