import { FormikProps } from "formik"
import React, { Component } from "react"

import { LoaderImage } from "../../types/loaderImage"
import AttachmentPreview from "../AttachmentPreview/AttachmentPreview"
import ImageUploader from "../ImageUploader/ImageUploader"
import { UpdateIssueFormValues } from "../UpdateIssueModal/UpdateIssueModal"

import styles from "./AttachmentForm.module.scss"

interface AttachmentPreviewProps {
  formikProps: FormikProps<UpdateIssueFormValues>
  name: string
  attachmentList: LoaderImage[]
}

class AttachmentForm extends Component<AttachmentPreviewProps> {
  render() {
    const { formikProps, name, attachmentList } = this.props

    return (
      <div className={styles.imageUploaderWrapper}>
        <label htmlFor={name} className={styles.label}>
          Attachments
        </label>
        <div className={styles.imagesWrapper}>
          {attachmentList &&
            attachmentList.map((image, index) => (
              <AttachmentPreview
                key={`attachmentPreview-${index}`}
                alternativeText={`attachmentPreview-${index}`}
                loaderImage={image}
                handleOnDelete={() => {
                  const attachments = [...attachmentList]

                  formikProps.setFieldValue(name, [
                    ...attachments.slice(0, index),
                    ...attachments.slice(index + 1),
                  ])
                }}
              />
            ))}
          {!attachmentList.length && (
            <ImageUploader
              formikProps={formikProps}
              name={name}
              multipleImages
              errorMessage="File rejected"
            />
          )}
        </div>
      </div>
    )
  }
}

export default AttachmentForm
