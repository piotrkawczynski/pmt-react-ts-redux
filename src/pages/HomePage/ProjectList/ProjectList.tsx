import React, { Component } from "react"

import { Project } from "../../../types/project"
import ProjectListItem from "./ProjectListItem/ProjectListItem"

import styles from "./ProjectList.module.scss"

interface InnerProps {
  data: Project[]
}

class ProjectList extends Component<InnerProps> {
  render() {
    const { data } = this.props

    return (
      <div className={styles.projectListWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.avatar}>Avatar</p>
          <p className={styles.project}>Project name</p>
          <p className={styles.tag}>Tag name</p>
          <p className={styles.company}>Company name</p>
        </div>
        <div className={styles.listGroup}>
          {data.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    )
  }
}

export default ProjectList
