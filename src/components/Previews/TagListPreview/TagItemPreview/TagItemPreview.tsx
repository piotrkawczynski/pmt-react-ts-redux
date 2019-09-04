import React, { Component } from "react"

import styles from "./TagItemPreview.module.scss"
import { CloseButton } from "../../../CloseButton/CloseButton"
import { TagFormValues } from "../../../../pages/FulfillProjectPage/FulfillProjectPage"

interface TagItemPreviewProps {
  tag: TagFormValues
  handleOnDelete: () => void
}

class TagItemPreview extends Component<TagItemPreviewProps> {
  render() {
    const {
      tag: { name, image },
      handleOnDelete,
    } = this.props

    console.log("image", image)

    return (
      <div className={styles.itemContainer}>
        <div>
          {image && (
            <img className={styles.tagImage} src={image} alt="tag" />
          )}
        </div>
        <div className={styles.name}>{name}</div>
        <CloseButton
          containerClassName={styles.closeButtonContainer}
          armClassName={styles.arms}
          onClick={handleOnDelete}
        />
      </div>
    )
  }
}

export default TagItemPreview
