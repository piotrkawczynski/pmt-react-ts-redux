import classnames from "classnames"
import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import { Button } from "reactstrap"

import CreateIssueModal from "../../components/CreateIssueModal/CreateIssueModal"
import SprintChooser from "../../components/SprintChooser/SprintChooser"
import UpdateIssueModal from "../../components/UpdateIssueModal/UpdateIssueModal"
import {
  getBacklogIssuesActions,
  getIssueListActions,
  updateIssueSprintActions,
} from "../../store/issue/issueActions"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import { getSprintListActions } from "../../store/sprint/sprintActions"
import { getStatusListActions } from "../../store/status/statusActions"
import { getTagListActions } from "../../store/tag/tagActions"
import { getUserListActions } from "../../store/user/userActions"
import BacklogList from "./BacklogList/BacklogList"

import styles from "./BacklogPage.module.scss"

interface PropsFromDispatch {
  getUserListRequest: typeof getUserListActions.getUserListRequest
  getStatusListRequest: typeof getStatusListActions.getStatusListRequest
  getTagListRequest: typeof getTagListActions.getTagListRequest
  getPermissionListRequest: typeof getPermissionListActions.getPermissionListRequest
  getSprintListRequest: typeof getSprintListActions.getSprintListRequest
  getIssueListRequest: typeof getIssueListActions.getIssueListRequest
  getBacklogIssueListRequest: typeof getBacklogIssuesActions.getBacklogIssuesRequest
  updateIssueSprintRequest: typeof updateIssueSprintActions.updateIssueSprintRequest
}

interface PropsFromState {
  userList: ApplicationState["user"]["users"]
  tagList: ApplicationState["tag"]["tagList"]
  statusList: ApplicationState["status"]["statusList"]
  permissionList: ApplicationState["permission"]["permissionList"]
  sprintList: ApplicationState["sprint"]["sprintList"]
  issueList: ApplicationState["issue"]["issueList"]
  backlogIssueList: ApplicationState["issue"]["backlogIssueList"]
}

interface RouteParams {
  id: string
}

type BacklogPageProps = PropsFromDispatch &
  PropsFromState &
  RouteComponentProps<RouteParams>

interface BacklogPageState {
  openCreateIssueModal: boolean
  openUpdateIssueModal: boolean
  sprintId: number | null
  selectedIssueId: number | null
}

class BacklogPage extends Component<BacklogPageProps, BacklogPageState> {
  private projectId: number

  constructor(props: BacklogPageProps) {
    super(props)
    const {
      match: { params },
    } = props

    this.projectId = Number(params.id)

    this.state = {
      openCreateIssueModal: false,
      openUpdateIssueModal: true,
      sprintId: null,
      selectedIssueId: null,
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
      getBacklogIssueListRequest,
    } = this.props

    getTagListRequest(this.projectId)
    getStatusListRequest(this.projectId)
    getPermissionListRequest()
    getUserListRequest(this.projectId)
    getSprintListRequest(this.projectId)
    getIssueListRequest(this.projectId, 1, true)
    getBacklogIssueListRequest(this.projectId)
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
    this.setState({ selectedIssueId: issueId })
  }

  onCancel = () => {
    this.setState({ openCreateIssueModal: false, selectedIssueId: null })
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
      backlogIssueList: { data: backlogIssueListData },
      updateIssueSprintRequest,
    } = this.props

    const { openCreateIssueModal, sprintId, selectedIssueId } = this.state

    console.log(this.props)

    return (
      <div className={styles.containerWrapper}>
        {sprintListData && !!sprintListData.length && (
          <SprintChooser
            sprintList={sprintListData}
            getIssueListRequest={getIssueListRequest}
            projectId={this.projectId}
            setSprintId={this.setSprintId}
          />
        )}
        <div className={styles.createButtonsWrapper}>
          {sprintId && (
            <Button
              type="button"
              className="button"
              onClick={() => this.setState({ openCreateIssueModal: true })}
            >
              Create issue
            </Button>
          )}
          <Button
            type="button"
            className={classnames("button", styles.createSprintButton)}
          >
            Create next sprint
          </Button>
        </div>
        {sprintId && statusList.data && userList.data && (
          <BacklogList
            issueListSource="sprint"
            setIssueId={this.setIssueId}
            issueList={issueListData}
            statusList={statusList.data}
            userList={userList.data}
            updateIssueSprintRequest={updateIssueSprintRequest}
            sprintId={sprintId}
          />
        )}
        <div className={styles.titleContainer}>
          <div className={styles.title}>Backlog</div>
        </div>
        {sprintId && statusList.data && userList.data && (
          <BacklogList
            issueListSource="backlog"
            setIssueId={this.setIssueId}
            issueList={backlogIssueListData}
            statusList={statusList.data}
            userList={userList.data}
            updateIssueSprintRequest={updateIssueSprintRequest}
            sprintId={sprintId}
          />
        )}
        {this.areListsReady() && openCreateIssueModal && (
          <CreateIssueModal
            projectId={this.projectId}
            sprintId={sprintId}
            statusList={statusList.data}
            tagList={tagList.data}
            permissionList={permissionList.data}
            userList={userList.data}
            onCancel={this.onCancel}
          />
        )}
        {this.areListsReady() && selectedIssueId && (
          <UpdateIssueModal
            setIssueId={this.setIssueId}
            issueId={selectedIssueId}
            projectId={this.projectId}
            sprintId={sprintId}
            statusList={statusList.data}
            tagList={tagList.data}
            permissionList={permissionList.data}
            userList={userList.data}
            onCancel={this.onCancel}
          />
        )}
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
  backlogIssueList: state.issue.backlogIssueList,
})

const mapDispatchToProps = {
  getUserListRequest: getUserListActions.getUserListRequest,
  getStatusListRequest: getStatusListActions.getStatusListRequest,
  getTagListRequest: getTagListActions.getTagListRequest,
  getPermissionListRequest: getPermissionListActions.getPermissionListRequest,
  getSprintListRequest: getSprintListActions.getSprintListRequest,
  getIssueListRequest: getIssueListActions.getIssueListRequest,
  getBacklogIssueListRequest: getBacklogIssuesActions.getBacklogIssuesRequest,
  updateIssueSprintRequest: updateIssueSprintActions.updateIssueSprintRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BacklogPage))
