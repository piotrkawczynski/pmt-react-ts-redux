import classnames from "classnames"
import { ErrorMessage, Field } from "formik"
import React from "react"
import { InputType } from "reactstrap/lib/Input"

import styles from "./Input.module.scss"

interface InputProps {
  type: InputType
  name: string
  error?: string | false
  label: string
  placeholder?: string
  isDisabled?: boolean
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  containerClassName?: string
  inputClassName?: string
  value?: string
  textarea?: boolean
}

const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    type,
    label,
    isDisabled,
    onChange = null,
    onBlur,
    placeholder = "",
    inputClassName,
    containerClassName,
    textarea,
  } = props

  const wrapperClassName = classnames(styles.inputWrapper, containerClassName)

  return (
    <div className={wrapperClassName}>
      <div className={styles.labelErrorWrapper}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <ErrorMessage
          component="p"
          name={name}
          className={styles.errorMessage}
        />
      </div>
      <Field
        type={type}
        id={name}
        className={classnames(
          styles.input,
          {
            [styles.isDisabled]: isDisabled,
          },
          inputClassName
        )}
        component={textarea && "textarea"}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        {...(onChange && { onChange })}
        {...(onBlur && { onBlur })}
      />
    </div>
  )
}

export default Input
