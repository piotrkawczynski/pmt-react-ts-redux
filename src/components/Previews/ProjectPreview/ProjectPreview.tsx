import React, { Component } from "react"

import styles from "./ProjectPreview.module.scss"
import { CreateProjectPageFormValues } from "../../../pages/CreateProjectPage/CreateProjectPage"

interface InnerProps {
  className?: string
  project: CreateProjectPageFormValues
}

class ProjectPreview extends Component<InnerProps> {
  render() {
    const {
      project: {
        name = "Project name",
        company = "Company name",
        avatar,
        label = "Title",
        color = "#FFFFFF",
      },
    } = this.props

    return (
      <div className={styles.item} style={{ backgroundColor: color }}>
        <div className={styles.imageContainer}>
          {avatar ? (
            <img
              alt="Avatar"
              src={URL.createObjectURL(avatar)}
              className={styles.image}
            />
          ) : (
            <p className={styles.avatar}>Avatar</p>
          )}
        </div>
        <p className={styles.project}>{name}</p>
        <p className={styles.tag}>{label}</p>
        <p className={styles.company}>{company}</p>
      </div>
    )
  }
}

export default ProjectPreview
