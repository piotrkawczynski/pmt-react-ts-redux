import classnames from "classnames"
import React, { Component } from "react"
import { Button } from "reactstrap"
import * as Yup from "yup"
import { Form, Formik, FormikActions, FormikProps } from "formik"

import FormContainer from "../../FormContainer/FormContainer"
import Input from "../../Inputs/Input/Input"
import ImageLoader from "../../ImageLoader/ImageLoader"
import {
  MEGABYTE_FACTOR,
  PICTURE_MAX_SIZE,
} from "../ProjectPicker/ProjectPicker"
import { TagFormValues } from "../../../pages/FulfillProjectPage/FulfillProjectPage"
import { createTagActions } from "../../../store/tag/tagActions"

import styles from "./TagPicker.module.scss"

interface InnerProps {
  tags: TagFormValues[]
  createTagRequest: typeof createTagActions.createTagRequest
  projectId: number
}

export interface TagPickerValues {
  name: "",
  image: File | null
}

const INITIAL_VALUES: TagPickerValues = {
  name: "",
  image: null,
}

type TagPickerProps = InnerProps

const VALIDATION_SCHEMA = Yup.object<TagPickerValues>().shape({
  name: Yup.string().required(),
  image: Yup.mixed<File>().required(),
})

class TagPicker extends Component<TagPickerProps> {
  state = {
    image: "",
  }

  onLoad = (name: string, tagFormikProps: FormikProps<TagPickerValues>) => (
    file: File | File[]
  ) => {
    tagFormikProps.setFieldValue(name, file)
    this.setState({ image: URL.createObjectURL(file) })
  }

  onSubmit = (
    values: TagPickerValues,
    formikActions: FormikActions<TagPickerValues>
  ) => {
    const { setFieldError } = formikActions
    const { createTagRequest, projectId, tags } = this.props

    const tag = tags.find(({ name }) => name === values.name)

    if (!tag) {
      createTagRequest(projectId, values, this.setFormValues(formikActions))
    } else {
      setFieldError("name", "Tag name already added")
    }
  }

  setFormValues = (formikActions: FormikActions<TagPickerValues>) => () => {
    formikActions.setValues({
      name: "",
      image: null,
    })
    this.setState({ image: "" })
    formikActions.setSubmitting(false)
  }

  render() {
    return (
      <Formik
        initialValues={INITIAL_VALUES}
        enableReinitialize
        onSubmit={this.onSubmit}
        validationSchema={VALIDATION_SCHEMA}
      >
        {(formikProps) => {
          return (
            <FormContainer
              label={"add your tags for issue recognition"}
              containerClassName={styles.formContainer}
            >
              <Form>
                <div className={styles.inputsWrapper}>
                  <Input
                    type="text"
                    className={styles.input}
                    label="tag"
                    name="name"
                  />
                  <div className={classnames(styles.imageWrapper)}>
                    <ImageLoader
                      name="image"
                      label="image"
                      imageMaxSize={PICTURE_MAX_SIZE}
                      uploadLabel="tag image"
                      errorMessage={`Image cannot be bigger than ${PICTURE_MAX_SIZE /
                        MEGABYTE_FACTOR}`}
                      formikProps={formikProps}
                      previewUrl={this.state.image}
                      onLoad={this.onLoad("image", formikProps)}
                    />
                  </div>
                </div>
                <div className={styles.buttonsWrapper}>
                  <Button
                    type="submit"
                    className={classnames("button", styles.button)}
                    // disabled={!formikProps.isValid}
                  >
                    Add tag
                  </Button>
                </div>
              </Form>
            </FormContainer>
          )
        }}
      </Formik>
    )
  }
}

export default TagPicker
