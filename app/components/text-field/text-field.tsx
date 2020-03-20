import * as React from "react"
import { translate } from "i18n"
import { TextFieldProps } from "./text-field.props"
import { Input } from "@ui-kitten/components"

/**
 * A component which has a label and an input together.
 */
export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const { placeholder: placeholderTx, label: labelOver, forwardedRef, ...rest } = props

  const label = translate(labelOver)
  const placeholder = translate(placeholderTx)

  return <Input {...{ label, placeholder }} ref={forwardedRef} {...rest} />
}
