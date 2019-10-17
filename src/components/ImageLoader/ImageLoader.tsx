import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import { ErrorMessage, FormikProps } from "formik"
import React from "react"
import Dropzone from "react-dropzone"

import { CreateProjectPageFormValues } from "../../pages/CreateProjectPage/CreateProjectPage"
import { TagPickerValues } from "../Pickers/TagPicker/TagPicker"

import styles from "./ImageLoader.module.scss"

type Values = CreateProjectPageFormValues | TagPickerValues

interface ImageLoaderProps {
  name: string
  imageMaxSize: number
  label?: string
  uploadLabel: string
  errorMessage: string
  formikProps: FormikProps<Values>
  previewUrl: string
  multipleImages?: boolean
  onLoad?: (file: File | File[]) => void
}

interface ImageLoaderState {
  imagePreview: string
  file: File[] | File | null
}

class ImageLoader extends React.Component<ImageLoaderProps, ImageLoaderState> {
  state: ImageLoaderState = {
    imagePreview: "",
    file: null,
  }

  componentDidMount() {
    const { previewUrl } = this.props

    if (previewUrl && this.state.imagePreview !== previewUrl) {
      this.setState({ imagePreview: previewUrl })
    }
  }

  componentDidUpdate() {
    const { previewUrl } = this.props

    if (this.state.imagePreview !== previewUrl) {
      this.setState({ imagePreview: previewUrl })
    }
  }

  onDrop = () => {
    const { setFieldTouched } = this.props.formikProps

    setFieldTouched(this.props.name, true)
  }

  onDropAccepted = (acceptedFiles: File[]) => {
    const { multipleImages = false, onLoad } = this.props

    let file = null

    if (multipleImages) {
      file = acceptedFiles
    } else {
      file = acceptedFiles[0]
      const imagePreview = URL.createObjectURL(file)

      this.setState({
        imagePreview,
      })
    }

    if (onLoad) {
      onLoad(file)
    }
  }

  onDropRejected = (rejectedFiles: File[]) => {
    const { name, errorMessage, multipleImages = false } = this.props
    const { setFieldError, setFieldValue } = this.props.formikProps

    if (multipleImages) {
      setFieldValue(this.props.name, rejectedFiles)
    } else {
      setFieldValue(this.props.name, rejectedFiles[0])

      this.setState({
        imagePreview: "",
      })
    }

    setFieldError(name, errorMessage)
  }

  onDeleteImageLoader = () => {
    const { setFieldValue } = this.props.formikProps

    this.setState({
      imagePreview: "",
    })

    setFieldValue(this.props.name, null)
  }

  render() {
    const { name, imageMaxSize, label } = this.props
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
        <div
          className={imageClasses}
          style={{ backgroundImage: `url(${imagePreview})` }}
        >
          <Dropzone
            onDrop={this.onDrop}
            onDropAccepted={this.onDropAccepted}
            onDropRejected={this.onDropRejected}
            maxSize={imageMaxSize}
            accept="image/jpeg, image/png"
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={styles.uploadWrapper}>
                <input {...getInputProps()} name={name} id={name} />

                {!imagePreview && (
                  <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                )}

                <ErrorMessage
                  component="p"
                  name={name}
                  className={styles.errorMessage}
                />
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    )
  }
}

export default ImageLoader
