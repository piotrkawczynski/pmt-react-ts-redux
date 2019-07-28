import classnames from "classnames"
import { ErrorMessage } from "formik"
import React from "react"

import styles from "./Input.module.scss"
import { Input as ReactInput } from "reactstrap"
import { InputType } from "reactstrap/lib/Input"

interface InputProps {
  type: InputType
  value: string
  name: string
  error?: string | false
  label: string
  placeholder?: string
  isDisabled?: boolean
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  className?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    value,
    type,
    label,
    isDisabled,
    onChange,
    onBlur,
    placeholder = "",
    className
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
      <ReactInput
        type={type}
        id={name}
        className={classnames(styles.input, {
          [styles.isDisabled]: isDisabled,
        })}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        invalid={false}
        value={value}
        onChange={onChange}
        {...(onBlur && { onBlur })}
      />
    </div>
  )
}

export default Input
