import classnames from "classnames"
import { ErrorMessage, Field } from "formik"
import React from "react"

import styles from "./Input.module.scss"
import { InputType } from "reactstrap/lib/Input"

interface InputProps {
  type: InputType
  name: string
  error?: string | false
  label: string
  placeholder?: string
  isDisabled?: boolean
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  value?: string
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
    className,
  } = props

  const wrapperClassName = classnames(styles.inputWrapper, className)

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
        className={classnames(styles.input, {
          [styles.isDisabled]: isDisabled,
        })}
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
