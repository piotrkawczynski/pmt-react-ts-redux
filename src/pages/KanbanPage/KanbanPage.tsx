import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"

import SprintChooser from "../../components/SprintChooser/SprintChooser"
import { getIssueListActions } from "../../store/issue/issueActions"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import { getSprintListActions } from "../../store/sprint/sprintActions"
import { getStatusListActions } from "../../store/status/statusActions"
import { getTagListActions } from "../../store/tag/tagActions"
import { getUserListActions } from "../../store/user/userActions"

import styles from "./KanbanPage.module.scss"
import KanbanScheme from "./KanbanScheme/KanbanScheme"

interface PropsFromDispatch {
  getUserListRequest: typeof getUserListActions.getUserListRequest
  getStatusListRequest: typeof getStatusListActions.getStatusListRequest
  getTagListRequest: typeof getTagListActions.getTagListRequest
  getPermissionListRequest: typeof getPermissionListActions.getPermissionListRequest
  getSprintListRequest: typeof getSprintListActions.getSprintListRequest
  getIssueListRequest: typeof getIssueListActions.getIssueListRequest
}

interface PropsFromState {
  userList: ApplicationState["user"]["users"]
  tagList: ApplicationState["tag"]["tagList"]
  statusList: ApplicationState["status"]["statusList"]
  permissionList: ApplicationState["permission"]["permissionList"]
  sprintList: ApplicationState["sprint"]["sprintList"]
  issueList: ApplicationState["issue"]["issueList"]
}

interface RouteParams {
  id: string
}

type KanbanPageProps = PropsFromDispatch &
  PropsFromState &
  RouteComponentProps<RouteParams>

interface KanbanPageState {
  openUpdateIssueModal: boolean
  sprintId: number | null
  issueId: number | null
}

class Project extends Component<KanbanPageProps, KanbanPageState> {
  private readonly projectId: number

  constructor(props: KanbanPageProps) {
    super(props)
    const {
      match: { params },
    } = props

    this.projectId = Number(params.id)

    this.state = {
      openUpdateIssueModal: true,
      sprintId: null,
      issueId: 4,
    }
  }

  componentDidMount() {
    const {
      getPermissionListRequest,
      getStatusListRequest,
      getTagListRequest,
      getUserListRequest,
      getSprintListRequest,
      getIssueListRequest,
    } = this.props

    getTagListRequest(this.projectId)
    getStatusListRequest(this.projectId)
    getPermissionListRequest()
    getUserListRequest(this.projectId)
    getSprintListRequest(this.projectId)
    getIssueListRequest(this.projectId, 1, true)
  }

  areListsReady = () => {
    const { statusList, tagList, permissionList, userList } = this.props

    return (
      statusList.data && tagList.data && permissionList.data && userList.data
    )
  }

  setSprintId = (sprintId: number) => {
    this.setState({ sprintId })
  }

  setIssueId = (issueId: number | null) => {
    this.setState({ issueId })
  }

  render() {
    const {
      statusList,
      tagList,
      permissionList,
      userList,
      sprintList: { data: sprintListData },
      issueList: { data: issueListData },
      getIssueListRequest,
    } = this.props

    const { sprintId } = this.state

    return (
      <div className={styles.project}>
        {sprintListData && !!sprintListData.length && (
          <SprintChooser
            sprintList={sprintListData}
            getIssueListRequest={getIssueListRequest}
            projectId={this.projectId}
            setSprintId={this.setSprintId}
          />
        )}
        <KanbanScheme
          sprintId={sprintId}
          statusList={statusList.data}
          issueList={issueListData}
          tagList={tagList.data}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  userList: state.user.users,
  tagList: state.tag.tagList,
  statusList: state.status.statusList,
  permissionList: state.permission.permissionList,
  sprintList: state.sprint.sprintList,
  issueList: state.issue.issueList,
})

const mapDispatchToProps = {
  getUserListRequest: getUserListActions.getUserListRequest,
  getStatusListRequest: getStatusListActions.getStatusListRequest,
  getTagListRequest: getTagListActions.getTagListRequest,
  getPermissionListRequest: getPermissionListActions.getPermissionListRequest,
  getSprintListRequest: getSprintListActions.getSprintListRequest,
  getIssueListRequest: getIssueListActions.getIssueListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Project))
