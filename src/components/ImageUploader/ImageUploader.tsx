import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import { ErrorMessage, FormikProps } from "formik"
import React from "react"
import Dropzone from "react-dropzone"

import { CommentInputForm } from "../CommentInput/CommentInput"
import { CreateIssueFormValues } from "../CreateIssueModal/CreateIssueModal"

import styles from "./ImageUploader.module.scss"

type Values = CreateIssueFormValues | CommentInputForm

interface ImageUploaderProps {
  name: string
  label?: string
  formikProps: FormikProps<Values>
  errorMessage: string
  multipleImages?: boolean
}

interface ImageUploaderState {
  imagePreview: string
  file: File[] | File | null
}

class ImageUploader extends React.Component<
  ImageUploaderProps,
  ImageUploaderState
> {
  state: ImageUploaderState = {
    imagePreview: "",
    file: null,
  }

  onDrop = () => {
    const { setFieldTouched } = this.props.formikProps

    setFieldTouched(this.props.name, true)
  }

  onDropAccepted = (acceptedFiles: File[]) => {
    const { multipleImages = false, formikProps } = this.props

    let file = null

    if (!multipleImages) {
      file = acceptedFiles[0]
      const imagePreview = URL.createObjectURL(file)

      this.setState({
        imagePreview,
      })
    }

    const files = acceptedFiles.map((acceptedFile) => ({
      file: acceptedFile,
      previewUrl: URL.createObjectURL(acceptedFile),
    }))

    formikProps.setFieldValue(this.props.name, files)
  }

  onDropRejected = (rejectedFiles: File[]) => {
    const { name, multipleImages = false } = this.props
    const { setFieldError, setFieldValue } = this.props.formikProps

    if (multipleImages) {
      setFieldValue(this.props.name, rejectedFiles)
    } else {
      setFieldValue(this.props.name, rejectedFiles[0])

      this.setState({
        imagePreview: "",
      })
    }

    setFieldError(name, "Error")
  }

  render() {
    const { name, label } = this.props
    const { imagePreview } = this.state

    const imageClasses = classnames(
      "form-control",
      styles.image,
      styles[name],
      {
        [styles[`${name}ImagePreview`]]: !!imagePreview,
      }
    )

    return (
      <div>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div className={imageClasses}>
          <div className={styles.uploadWrapper}>
            <Dropzone
              onDrop={this.onDrop}
              onDropAccepted={this.onDropAccepted}
              onDropRejected={this.onDropRejected}
              accept="image/jpeg, image/png"
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div {...getRootProps()} className={styles.uploadWrapper}>
                    <input {...getInputProps()} name={name} id={name} />

                    <div className={styles.iconWrapper}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>

                    <ErrorMessage
                      component="p"
                      name={name}
                      className={styles.errorMessage}
                    />
                  </div>
                )
              }}
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageUploader
