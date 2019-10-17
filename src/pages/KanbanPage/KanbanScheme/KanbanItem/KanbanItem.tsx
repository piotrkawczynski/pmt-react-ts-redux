import React, { Component } from "react"

import { ApplicationState } from "../../../../store/redux"
import { Issue } from "../../../../types/issue"

import styles from "./KanbanItem.module.scss"

interface KanbanItemProps {
  issue: Issue
  tagList: ApplicationState["tag"]["tagList"]["data"]
  onClick: () => void
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void
}

class KanbanItem extends Component<KanbanItemProps> {
  render() {
    const {
      issue,
      onDragStart,
      onDrop,
      onDragEnd,
      tagList,
      onClick,
    } = this.props

    const { id, title, code, tagId, description } = issue

    const tag = tagList!.find((tagElement) => tagElement.id === tagId)!

    return (
      <div
        id={id.toString()}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        onDrop={onDrop}
        onClick={onClick}
        className={styles.kanbanItem}
      >
        <div className={styles.kanbanItemHeader}>
          <img
            className={styles.image}
            src={tag.image}
            alt={`${title}-${new Date()}`}
          />
          <div className={styles.tag}>{tag.name}</div>
          <div className={styles.code}>#{code}</div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    )
  }
}

export default KanbanItem
