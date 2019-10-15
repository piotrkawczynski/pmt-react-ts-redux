import classnames from "classnames"
import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import { Button } from "reactstrap"

import CreateIssueModal from "../../components/CreateIssueModal/CreateIssueModal"
import SprintChooser from "../../components/SprintChooser/SprintChooser"
import SprintModal, {
  SprintFormValues,
} from "../../components/SprintModal/SprintModal"
import UpdateIssueModal from "../../components/UpdateIssueModal/UpdateIssueModal"
import {
  getBacklogIssuesActions,
  getIssueListActions,
  updateIssueSprintActions,
} from "../../store/issue/issueActions"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import {
  createSprintActions,
  deleteSprintActions,
  getSprintListActions,
} from "../../store/sprint/sprintActions"
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
  createSprintRequest: typeof createSprintActions.createSprintRequest
  deleteSprintRequest: typeof deleteSprintActions.deleteSprintRequest
}

interface PropsFromState {
  userList: ApplicationState["user"]["users"]
  tagList: ApplicationState["tag"]["tagList"]
  statusList: ApplicationState["status"]["statusList"]
  permissionList: ApplicationState["permission"]["permissionList"]
  sprintList: ApplicationState["sprint"]["sprintList"]
  deleteSprint: ApplicationState["sprint"]["deleteSprint"]
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
  openCreateSprintModal: boolean
  openUpdateSprintModal: boolean
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
      openCreateSprintModal: false,
      openUpdateSprintModal: false,
    }
  }

  componentDidMount() {
    const {
      getPermissionListRequest,
      getStatusListRequest,
      getTagListRequest,
      getUserListRequest,
      getSprintListRequest,
      getBacklogIssueListRequest,
    } = this.props

    getTagListRequest(this.projectId)
    getStatusListRequest(this.projectId)
    getPermissionListRequest()
    getUserListRequest(this.projectId)
    getSprintListRequest(this.projectId)
    getBacklogIssueListRequest(this.projectId)
  }

  componentDidUpdate(prevProps: BacklogPageProps) {
    const { sprintList } = this.props

    if (
      prevProps.sprintList.status === "loading" &&
      sprintList.status === "success" &&
      sprintList.data &&
      !sprintList.data.length
    ) {
      this.setState({
        sprintId: null,
      })
    }
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

  handleDeleteSprint = () => {
    this.props.deleteSprintRequest(this.state.sprintId!, this.projectId)
  }

  isLastSprint = () => {
    const { sprintId } = this.state

    const {
      sprintList: { data },
    } = this.props

    if (data && !!data.length) {
      const sprintListIndex = data.findIndex(({ id }) => id === sprintId)

      return sprintListIndex === data.length - 1
    }

    return false
  }

  render() {
    const {
      statusList,
      tagList,
      permissionList,
      userList,
      sprintList,
      issueList: { data: issueListData },
      getIssueListRequest,
      backlogIssueList: { data: backlogIssueListData },
      updateIssueSprintRequest,
    } = this.props

    const { openCreateIssueModal, sprintId, selectedIssueId } = this.state

    // console.log(this.state)

    return (
      <div className={styles.containerWrapper}>
        {sprintList.data && !!sprintList.data.length && (
          <SprintChooser
            sprintList={sprintList}
            getIssueListRequest={getIssueListRequest}
            projectId={this.projectId}
            setSprintId={this.setSprintId}
          />
        )}
        <div className={styles.createButtonsWrapper}>
          <Button
            type="button"
            className="button"
            onClick={() => this.setState({ openCreateIssueModal: true })}
          >
            Create issue
          </Button>
          {this.isLastSprint() && (
            <Button
              type="button"
              className={classnames("button", styles.createSprintButton)}
              onClick={this.handleDeleteSprint}
            >
              Delete latest sprint
            </Button>
          )}
          <Button
            type="button"
            className={classnames("button", styles.createSprintButton)}
            onClick={this.openCreateSprintModal}
          >
            Create next sprint
          </Button>
        </div>
        {statusList.data && userList.data && (
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
        {statusList.data && userList.data && (
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
        {this.renderCreateSprintModal()}
      </div>
    )
  }

  openCreateSprintModal = () => {
    this.setState({ openCreateSprintModal: true })
  }

  onSubmitCreateSprint = (values: SprintFormValues) => {
    this.props.createSprintRequest(values, this.projectId)
    this.setState({ openCreateSprintModal: false })
  }

  onCancelCreateSprint = () => {
    this.setState({ openCreateSprintModal: false })
  }

  private renderCreateSprintModal = () => {
    if (!this.state.openCreateSprintModal) {
      return null
    }

    return (
      <SprintModal
        projectId={this.projectId}
        onSubmit={this.onSubmitCreateSprint}
        onCancel={this.onCancelCreateSprint}
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
  backlogIssueList: state.issue.backlogIssueList,
  deleteSprint: state.sprint.deleteSprint,
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
  createSprintRequest: createSprintActions.createSprintRequest,
  deleteSprintRequest: deleteSprintActions.deleteSprintRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BacklogPage))
