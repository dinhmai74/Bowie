import { Input, InputProps } from '@ui-kitten/components'
import React from 'react'
import { translate } from '../../i18n'

export interface TextFieldProps extends InputProps {
  inputRef?: any
}

export const TextField = (props: TextFieldProps) => {
  // grab the props
  const { style, caption: cap, label: PLabel, placeholder: PPlaceholder, inputRef, ...rest } = props
  const label = typeof PLabel === 'string' ? translate(PLabel) : PLabel
  const placeholder = translate(PPlaceholder)
  const caption = typeof cap === 'string' ? translate(cap) : cap

  return <Input {...{ label, placeholder, caption }} {...rest} ref={inputRef} />
}
