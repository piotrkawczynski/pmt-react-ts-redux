import React, { Component } from "react"
import classnames from "classnames"

import styles from "./FormContainer.module.scss"

interface FormContainerProps {
  containerClassName?: string
  label: string
}

class FormContainer extends Component<FormContainerProps> {
  render() {
    const { children, label, containerClassName } = this.props

    return (
      <div className={classnames(styles.formContainer, containerClassName)}>
        <div className={styles.label}>{label}</div>
        {children}
      </div>
    )
  }
}

export default FormContainer
