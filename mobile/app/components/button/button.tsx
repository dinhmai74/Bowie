import { Button as KTButton, useStyleSheet } from '@ui-kitten/components'
import { Text } from 'components/text/text'
import { flatten, mergeAll, view } from 'ramda'
import * as React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { TextPresets, ViewPresets } from './button.presets'
import { ButtonProps } from './button.props'
import { useThemes } from 'theme'

export const Button: React.FC<ButtonProps> = props => {
  const { color } = useThemes()
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

  let viewStyle = mergeAll(
    // @ts-ignore
    flatten([preset && viewPresets[preset], notFullStyle, styleOverride, { opacity }]),
  )

  const status = props.status || 'primary'
  let density = 500
  if (status === 'basic') density = 600

  if (preset) {
    if (preset === 'outlineWithoutBorder') {
      viewStyle = { ...viewStyle, backgroundColor: color[`color-${status}-100`] }
    } else if (preset === 'bordered') {
      viewStyle = { ...viewStyle, borderColor: color[`color-${status}-${density}`] }
    }
  }

  let textStyle = mergeAll(
    // @ts-ignore
    flatten([textPresets[preset] && textPresets[preset], textStyleOverride]),
  )

  const customProps = {}

  return (
    <KTButton
      style={viewStyle}
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

        // get color by preset
        if (preset) {
          if (preset === 'bordered' || preset === 'outlineWithoutBorder') {
            textStyle = { ...textStyle, color: color[`color-${status}-${density}`] }
          }
        }

        return <Text {...evaProps} style={[evaProps.style, textStyle]} tx={content} />
      }}
    </KTButton>
  )
}
