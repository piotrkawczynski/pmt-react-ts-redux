import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"

import SprintChooser from "../../components/SprintChooser/SprintChooser"
import SprintModal, {
  SprintFormValues,
} from "../../components/SprintModal/SprintModal"
import { getIssueListActions } from "../../store/issue/issueActions"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import { createSprintActions, getSprintListActions } from "../../store/sprint/sprintActions"
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
  createSprintRequest: typeof createSprintActions.createSprintRequest,
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
    } = this.props

    getTagListRequest(this.projectId)
    getStatusListRequest(this.projectId)
    getPermissionListRequest()
    getUserListRequest(this.projectId)
    getSprintListRequest(this.projectId)
  }

  setSprintId = (sprintId: number) => {
    this.setState({ sprintId })
  }

  render() {
    const {
      statusList,
      tagList,
      sprintList,
      issueList: { data: issueListData },
      getIssueListRequest,
      permissionList,
      userList,
    } = this.props

    const { sprintId } = this.state

    if (!!sprintList.data && !sprintList.data.length) {
      return this.renderCreateSprintModal()
    }

    return (
      <div className={styles.project}>
        {sprintList.data && !!sprintList.data.length && (
          <SprintChooser
            sprintList={sprintList}
            getIssueListRequest={getIssueListRequest}
            projectId={this.projectId}
            setSprintId={this.setSprintId}
          />
        )}
        <KanbanScheme
          projectId={this.projectId}
          sprintId={sprintId}
          statusList={statusList.data}
          issueList={issueListData}
          tagList={tagList.data}
          permissionList={permissionList}
          userList={userList}
        />
      </div>
    )
  }

  onSubmitCreateSprint = (values: SprintFormValues) => {
    this.props.createSprintRequest(values, this.projectId)
  }

  private renderCreateSprintModal = () => {
    return (
      <SprintModal
        projectId={this.projectId}
        onSubmit={this.onSubmitCreateSprint}
      />
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
  createSprintRequest: createSprintActions.createSprintRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Project))
