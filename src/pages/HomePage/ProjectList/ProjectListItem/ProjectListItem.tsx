import React, { Component } from "react"

import { Project } from "../../../../types/project"
import history from "../../../../utilities/history"

import { Link } from "react-router-dom"
import styles from "./ProjectListItem.module.scss"

interface InnerProps {
  className?: string
  project: Project
}

class ProjectListItem extends Component<InnerProps> {
  handleDetailProject = (id: number, completed: number) => (
    event: React.MouseEvent
  ) => {
    event.preventDefault()

    const url = `/project/${id}`

    if (completed) {
      history.push(url)
    } else {
      alert(
        "If you are admin, You need to fulfill project details to complete and move forward."
      )
    }
  }

  render() {
    const {
      project: {
        id,
        name,
        company,
        avatar,
        label,
        color,
        completed,
        permissionId,
      },
    } = this.props

    return (
      <div className={styles.itemWrapper} style={{ backgroundColor: color }}>
        <div
          className={styles.item}
          onClick={this.handleDetailProject(id, completed)}
        >
          <div className={styles.imageContainer}>
            <img alt="Avatar" src={avatar} className={styles.image} />
          </div>
          <p className={styles.project}>{name}</p>
          <p className={styles.tag}>{label}</p>
          <p className={styles.company}>{company}</p>
        </div>
        {permissionId === 2 && (
          <div className={styles.linkWrapper}>
            <Link to={`/project/${id}/edit`}>
              <p>edit</p>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default ProjectListItem
