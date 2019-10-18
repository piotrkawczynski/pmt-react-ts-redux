import { faReact } from "@fortawesome/free-brands-svg-icons"
import {
  faCaretLeft,
  faCaretRight,
  faEdit,
  faListOl,
  faPlusSquare,
  faTable,
  faTasks,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
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
  show: boolean
}

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
  getRoutes = (projectId: string | null, pathName: string) => {
    const regexp = new RegExp("\\/project\\/\\d+\\/edit")

    if (regexp.test(pathName)) {
      projectId = null
    }

    const sidebarProjectData: SidebarItem[] = [
      {
        route: "/",
        icon: faListOl,
        name: "Projects",
        show: true,
      },
      {
        route: `/project/${projectId}`,
        icon: faTable,
        name: "Kanban Scheme",
        show: !!projectId,
      },
      {
        route: `/project/${projectId}/backlog`,
        icon: faTasks,
        name: "Backlog",
        show: !!projectId,
      },
      {
        route: "/project/create",
        icon: faPlusSquare,
        name: "Create Project",
        show: true,
      },
      {
        route: `/project/${projectId}/edit`,
        icon: faEdit,
        name: "Edit project",
        show: !!projectId,
      },
    ]

    return sidebarProjectData.filter(({ show }) => show)
  }

  onExtend = () => {
    const { setSidebarExtension, isSidebarExtended } = this.props

    setSidebarExtension(!isSidebarExtended)
  }

  render() {
    const {
      match: {
        params: { projectId },
      },
      location: { pathname },
    } = this.props

    return (
      <div
        className={classNames(styles.sidebar, {
          [styles.sidebarShrink]: this.props.isSidebarExtended,
        })}
      >
        {this.renderHeader()}
        {this.renderExtendButton()}
        <div>
          <ItemList data={this.getRoutes(projectId, pathname)} />
        </div>
      </div>
    )
  }

  private renderHeader = () => {
    return (
      <>
        <div className={styles.headerWrapper}>
          <FontAwesomeIcon
            icon={faReact}
            className={styles.faSpin}
            size={"lg"}
          />
          <h6 className={styles.header}>Project Management Tool</h6>
        </div>
        <div className={styles.line} />
      </>
    )
  }

  private renderExtendButton = () => {
    const sidebarExtendedIcon = this.props.isSidebarExtended
      ? faCaretRight
      : faCaretLeft

    return (
      <div
        className={classNames(styles.extendButton, {
          [styles.extendButtonShrink]: this.props.isSidebarExtended,
        })}
        onClick={this.onExtend}
      >
        <FontAwesomeIcon
          icon={sidebarExtendedIcon}
          size={"lg"}
          className={classNames(
            styles.iconWrapper,
            !this.props.isSidebarExtended && styles.iconWrapperRight
          )}
        />
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
