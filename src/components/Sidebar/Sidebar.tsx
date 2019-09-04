import React, { Component } from "react"
import { faCode, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import ItemList from "./Components/ItemList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { ApplicationState } from "../../store/redux"

import styles from "./Sidebar.module.scss"

export interface SidebarItem {
  route: string
  icon: IconDefinition
  name: string
}

const data: SidebarItem[] = [
  { route: "/", icon: faCode, name: "Home" },
  { route: "/create-project", icon: faCode, name: "Create Project" },
  { route: "/profile", icon: faCode, name: "Profile" },
]

// const projectLinks: SidebarItem[] = [
//   { route: "/backlog", icon: faCode, name: "Backlog" },
//   { route: "/project", icon: faCode, name: "Project" },
// ]


interface RouteParams {
  projectId: string
}

type SidebarProps = RouteComponentProps<RouteParams>

class Sidebar extends Component<SidebarProps> {
  // updateRoutes = (projectId) => {
  //   return projectLinks
  //     .map((item) => ({ ...item }))
  //     .map((item) => {
  //       item.route += `/${projectId}`
  //       return item
  //     })
  // }

  render() {
    // const {
    //   match: {
    //     params: { projectId },
    //   },
    // } = this.props

    return (
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <FontAwesomeIcon icon={faReact} className={styles.faSpin} size={"lg"} />
          <h6>Project Management Tool</h6>
        </div>
        <div className={styles.line} />
        <div>
          <ItemList data={data} />
          {/*{projectId && <ItemList data={this.updateRoutes(projectId)} />}*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
)
