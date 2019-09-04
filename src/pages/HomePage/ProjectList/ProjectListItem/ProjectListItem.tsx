import React, { Component } from "react"

import history from "../../../../utilities/history"
import { Project } from "../../../../types/project"

import styles from "./ProjectListItem.module.scss"
import { Link } from "react-router-dom"

interface InnerProps {
  className?: string
  project: Project
}

class ProjectListItem extends Component<InnerProps> {
  handleDetailProject = (id: number, completed: number) => (
    event: React.MouseEvent
  ) => {
    const url = `/project/${id}`

    if (completed) {
      history.push(url)
    } else {
      history.push(`${url}/edit`)
    }

    event.preventDefault()
  }

  render() {
    const {
      project: { id, name, company, avatar, label, color, completed },
    } = this.props

    return (
      <div className={styles.itemWrapper}>
        <div
          onClick={this.handleDetailProject(id, completed)}
          className={styles.item}
          style={{ backgroundColor: color }}
        >
          <div className={styles.imageContainer}>
            <img alt="Avatar" src={avatar} className={styles.image} />
          </div>
          <p className={styles.project}>{name}</p>
          <p className={styles.tag}>{label}</p>
          <p className={styles.company}>{company}</p>
        </div>
        <Link to={`/project/${id}/edit`}>
          <p>edit</p>
        </Link>
      </div>
    )
  }
}

export default ProjectListItem
