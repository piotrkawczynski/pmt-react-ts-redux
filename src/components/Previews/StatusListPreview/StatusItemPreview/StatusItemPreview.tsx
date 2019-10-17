import React, { Component } from "react"

import { CloseButton } from "../../../CloseButton/CloseButton"

import { StatusFormValues } from "../../../../pages/FulfillProjectPage/FulfillProjectPage"

import styles from "./StatusItemPreview.module.scss"

interface StatusItemPreviewProps {
  status: StatusFormValues
  handleOnDelete: () => void
  draggable: boolean
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
}

class StatusItemPreview extends Component<StatusItemPreviewProps> {
  render() {
    const {
      status: { name, order },
      handleOnDelete,
      draggable,
      onDragStart,
      onDragOver,
      onDrop,
    } = this.props

    return (
      <div
        className={styles.itemContainer}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className={styles.name}>{name}</div>
        <div className={styles.order}>Order: {order}</div>
        <CloseButton
          containerClassName={styles.closeButtonContainer}
          armClassName={styles.arms}
          onClick={handleOnDelete}
        />
      </div>
    )
  }
}

export default StatusItemPreview
