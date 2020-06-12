import { Input, InputProps, TextProps } from '@ui-kitten/components'
import { Text } from 'components/text/text'
import { useLocalization } from 'i18n/i18n'
import React from 'react'
import { TextStyle } from 'react-native'
import { spacing } from 'theme'

export interface TextFieldProps extends InputProps {
  full?: boolean
}

const presets = {
  primary: {
    label: {
      marginBottom: spacing[3],
    } as TextProps,
  },
}

const TextFieldComp = (props: TextFieldProps, ref) => {
  const { t: translate } = useLocalization()
  const {
    style: PStyle,
    caption: cap,
    label: PLabel,
    placeholder: PPlaceholder,
    status: PStatus,
    full,
    size = 'small',
    textStyle: PTextStyle,
    ...rest
  } = props
  const label =
    typeof PLabel === 'string'
      ? (evaProps: any) => (
          <Text {...evaProps} style={[evaProps.style, presets.primary.label]} tx={PLabel} />
        )
      : PLabel
  const placeholder = translate(PPlaceholder)
  const style = [full && { flex: 1 }, PStyle]
  const textStyle: TextStyle = { textAlignVertical: 'top', marginTop: spacing[2] }
  const caption = typeof cap === 'string' ? translate(cap) : cap
  let status = PStatus
  if (caption) status = 'danger'

  return (
    <Input
      {...{ size, placeholder, caption, label, status, style }}
      {...rest}
      textStyle={[textStyle, PTextStyle]}
      ref={ref}
    />
  )
}

export const TextField = React.forwardRef(TextFieldComp)
