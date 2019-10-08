import React, { Component } from "react"
import { FormikProps } from "formik"

import FormContainer from "../../FormContainer/FormContainer"
import Input from "../../Inputs/Input/Input"
import { CreateProjectPageFormValues } from "../../../pages/CreateProjectPage/CreateProjectPage"
import ImageLoader from "../../ImageLoader/ImageLoader"

import styles from "./ProjectPicker.module.scss"

interface InnerProps {
  formikProps: FormikProps<CreateProjectPageFormValues>
}

type ProjectPickerProps = InnerProps

export const PICTURE_MAX_SIZE = 250000
export const MEGABYTE_FACTOR = 1000000

class ProjectPicker extends Component<ProjectPickerProps> {
  onSubmit = (name: string) => (file: File | File[]) => {
    this.props.formikProps.setFieldValue(name, file)
  }

  render() {
    const { formikProps } = this.props

    const avatar = formikProps.values.avatar

    return (
      <FormContainer
        label={"project"}
        containerClassName={styles.formContainer}
      >
        <div className={styles.inputsWrapper}>
          <Input
            type="text"
            containerClassName={styles.input}
            label="project name"
            name="name"
          />
          <Input
            type="text"
            containerClassName={styles.input}
            label="company name"
            name="company"
          />
          <Input
            type="text"
            containerClassName={styles.sprintInput}
            label="sprint duration"
            name="sprintDuration"
          />
          <div className={styles.avatarWrapper}>
            <ImageLoader
              name="avatar"
              label="avatar"
              imageMaxSize={PICTURE_MAX_SIZE}
              uploadLabel="avatar"
              errorMessage={`Image cannot be bigger than ${PICTURE_MAX_SIZE /
                MEGABYTE_FACTOR}`}
              formikProps={formikProps}
              previewUrl={(avatar && URL.createObjectURL(avatar)) || ""}
              onLoad={this.onSubmit("avatar")}
            />
          </div>
        </div>
        <div className={styles.inputsWrapper}>
          <Input
            type="text"
            containerClassName={styles.input}
            label="label"
            name="label"
          />
          <Input
            type="color"
            containerClassName={styles.colorInput}
            label="color"
            name="color"
          />
        </div>
      </FormContainer>
    )
  }
}

export default ProjectPicker
