import classNames from "classnames"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import {
  faCode,
  faCaretLeft,
  faCaretRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { setSidebarExtension as setSidebarExtensionAction } from "../../store/components/componentsActions"
import { ApplicationState } from "../../store/redux"
import ItemList from "./Components/ItemList"

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

interface PropsFromDispatch {
  setSidebarExtension: typeof setSidebarExtensionAction
}

interface PropsFromState {
  isSidebarExtended: boolean
}

type SidebarProps = RouteComponentProps<RouteParams> &
  PropsFromDispatch &
  PropsFromState

class Sidebar extends Component<SidebarProps> {
  // updateRoutes = (projectId) => {
  //   return projectLinks
  //     .map((item) => ({ ...item }))
  //     .map((item) => {
  //       item.route += `/${projectId}`
  //       return item
  //     })
  // }
  onExtend = () => {
    const { setSidebarExtension, isSidebarExtended } = this.props

    setSidebarExtension(!isSidebarExtended)
  }

  render() {
    // const {
    //   match: {
    //     params: { projectId },
    //   },
    // } = this.props

    const sidebarExtendedIcon = this.props.isSidebarExtended
      ? faCaretRight
      : faCaretLeft

    return (
      <div
        className={classNames(styles.sidebar, {
          [styles.sidebarShrink]: this.props.isSidebarExtended,
        })}
      >
        <div
          className={classNames(styles.extendButton, {
            [styles.extendButtonShrink]: this.props.isSidebarExtended,
          })}
          onClick={this.onExtend}
        >
          <FontAwesomeIcon
            icon={sidebarExtendedIcon}
            size={"lg"}
            className={classNames(styles.iconWrapper,
              !this.props.isSidebarExtended && styles.iconWrapperRight)
            }
          />
        </div>
        <div className={styles.headerWrapper}>
          <FontAwesomeIcon
            icon={faReact}
            className={styles.faSpin}
            size={"lg"}
          />
          <h6 className={styles.header}>Project Management Tool</h6>
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

const mapStateToProps = (state: ApplicationState) => ({
  isSidebarExtended: state.components.isSidebarExtended,
})

const mapDispatchToProps = {
  setSidebarExtension: setSidebarExtensionAction,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
)
