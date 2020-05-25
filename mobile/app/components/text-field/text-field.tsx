import { Input, InputProps } from '@ui-kitten/components'
import { useLocalization } from 'i18n/i18n'
import React from 'react'

export interface TextFieldProps extends InputProps {
  inputRef?: any
}

export const TextField = (props: TextFieldProps) => {
  // grab the props
  const { t: translate } = useLocalization()
  const { style, caption: cap, label: PLabel, placeholder: PPlaceholder, inputRef, ...rest } = props
  const label = typeof PLabel === 'string' ? translate(PLabel) : PLabel
  const placeholder = translate(PPlaceholder)
  const caption = typeof cap === 'string' ? translate(cap) : cap

  return <Input {...{ label, placeholder, caption }} {...rest} ref={inputRef} style={style} />
}
