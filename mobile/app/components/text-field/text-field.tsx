import { Input, InputProps, TextProps } from '@ui-kitten/components'
import { useLocalization } from 'i18n/i18n'
import React from 'react'
import { spacing } from 'theme'
import { Text } from 'components/text/text'

export interface TextFieldProps extends InputProps {
  inputRef?: any
  ref?: any
}

const presets = {
  primary: {
    label: {
      marginBottom: spacing[3],
    } as TextProps,
  },
}

export const TextField = (props: TextFieldProps) => {
  // grab the props
  const { t: translate } = useLocalization()
  const {
    style,
    caption: cap,
    label: PLabel,
    placeholder: PPlaceholder,
    ref,
    status: PStatus,
    ...rest
  } = props
  const label =
    typeof PLabel === 'string'
      ? (evaProps: any) => (
          <Text {...evaProps} style={[evaProps.style, presets.primary.label]} tx={PLabel} />
        )
      : PLabel
  const placeholder = translate(PPlaceholder)
  const caption = typeof cap === 'string' ? translate(cap) : cap
  let status = PStatus
  if (caption) status = 'danger'

  return <Input {...{ placeholder, caption, label, status }} {...rest} ref={ref} style={style} />
}
