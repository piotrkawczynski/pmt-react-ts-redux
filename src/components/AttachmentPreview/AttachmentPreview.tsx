import classnames from "classnames"
import React, { Component } from "react"
import { LoaderImage } from "../../types/loaderImage"
import { CloseButton } from "../CloseButton/CloseButton"

import styles from "./AttachmentPreview.module.scss"

interface AttachmentPreviewProps {
  alternativeText: string
  loaderImage: LoaderImage
  handleOnDelete: () => void
  imageClassName?: string
}

class AttachmentPreview extends Component<AttachmentPreviewProps> {
  render() {
    const {
      alternativeText,
      loaderImage: { previewUrl },
      handleOnDelete,
      imageClassName,
    } = this.props

    return (
      <div className={styles.itemContainer}>
        {previewUrl && (
          <img
            className={classnames(styles.attachment, imageClassName)}
            src={previewUrl}
            alt={alternativeText}
          />
        )}
        <CloseButton
          containerClassName={styles.closeButtonContainer}
          armClassName={styles.arms}
          onClick={handleOnDelete}
        />
      </div>
    )
  }
}

export default AttachmentPreview
