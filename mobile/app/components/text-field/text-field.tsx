import { Input, InputProps, TextProps } from '@ui-kitten/components'
import { useLocalization } from 'i18n/i18n'
import React, { useImperativeHandle, useRef } from 'react'
import { spacing } from 'theme'
import { Text } from 'components/text/text'

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
  const caption = typeof cap === 'string' ? translate(cap) : cap
  let status = PStatus
  if (caption) status = 'danger'

  return <Input {...{ size, placeholder, caption, label, status, style }} {...rest} ref={ref} />
}

export const TextField = React.forwardRef(TextFieldComp)
