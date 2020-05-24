import { Button as KTButton, useStyleSheet } from '@ui-kitten/components'
import { Text } from 'components/text/text'
import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { TextPresets, ViewPresets } from './button.presets'
import { ButtonProps } from './button.props'

export const Button: React.FC<ButtonProps> = props => {
  const renderLoading = () => {
    const { loadingColor, loadingSize } = props
    return <ActivityIndicator size={loadingSize} color={loadingColor || '#fff'} />
  }

  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    full,
    loading,
    onPress: onPressProps,
    ...rest
  } = props

  const textPresets = useStyleSheet(TextPresets)
  const viewPresets = useStyleSheet(ViewPresets)

  const notFullStyle: ViewStyle = !full && { alignSelf: 'flex-start' }
  const opacity = disabled ? 0.2 : 1
  const viewStyle = mergeAll(
    // @ts-ignore
    flatten([viewPresets[preset] || viewPresets.primary, notFullStyle, styleOverride, { opacity }]),
  )
  const textStyle = mergeAll(
    // @ts-ignore
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const customProps = {}

  return (
    <KTButton
      style={viewStyle}
      {...{ textStyle }}
      onPress={!disabled ? onPressProps : () => {}}
      activeOpacity={disabled ? opacity : 0.5}
      {...rest}
      {...customProps}
    >
      {evaProps => {
        if (loading) {
          return renderLoading()
        }

        let content = tx || text
        if (children && typeof children !== 'string') {
          return React.cloneElement(children, { ...evaProps })
        } else if (children) content = children

        return <Text {...evaProps} style={[evaProps.style, textStyle]} tx={content} />
      }}
    </KTButton>
  )
}
