import React, { Component } from "react"
import FormContainer from "../../FormContainer/FormContainer"
import Input from "../../Inputs/Input/Input"

import styles from "./LabelPicker.module.scss"

class LabelPicker extends Component {
  render() {
    return (
      <FormContainer label={"label"} containerClassName={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            containerClassName={styles.input}
            label="title"
            name="label.title"
          />
          <Input
            type="color"
            containerClassName={styles.colorInput}
            label="color"
            name="label.color"
          />
        </div>
      </FormContainer>
    )
  }
}
export default LabelPicker
