import { Input, InputProps } from "@ui-kitten/components"
import React from "react"
import { StyleSheet } from "react-native"
import { translate } from "../../i18n"
import { spacing } from "../../theme"

export interface TextFieldProps extends InputProps {
  inputRef?: any
}
const styles = StyleSheet.create({
  label: {
    paddingBottom: spacing[2],
  },
})

export const TextField = (props: TextFieldProps) => {
  // grab the props
  const {
    style,
    caption: cap,
    label: PLabel,
    labelStyle,
    placeholder: PPlaceholder,
    inputRef,
    ...rest
  } = props
  const label = translate(PLabel)
  const placeholder = translate(PPlaceholder)
  const caption = translate(cap)

  return (
    <Input
      labelStyle={[styles.label, labelStyle]}
      style={style}
      {...{ label, placeholder, caption }}
      {...rest}
      ref={inputRef}
    />
  )
}
