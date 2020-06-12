import * as React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'
import { spacing, Spacing } from 'theme'
import { mergeAll, flatten } from 'ramda'

export interface SizedBoxProps extends ViewProps {
  /* ------------- height of box ------------- */
  h?: Spacing
  /* ------------- width of box ------------- */
  w?: Spacing
  /* ------------- bg of box ------------- */
  bg?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const SizedBox = (props: SizedBoxProps) => {
  // grab the props
  const { bg, h, w, style: styleOver, ...rest } = props
  const height: ViewStyle = h && { paddingVertical: spacing[h] / 2 }
  const width: ViewStyle = w && { paddingHorizontal: spacing[w] / 2 }
  const style = mergeAll(flatten([height, width, bg && { backgroundColor: bg }, styleOver]))

  return <View style={style} {...rest} />
}
