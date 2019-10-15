import { Dictionary } from "lodash"
import React, { Component } from "react"
import { connect } from "react-redux"
import UpdateIssueModal from "../../../components/UpdateIssueModal/UpdateIssueModal"

import { updateIssueStatusActions } from "../../../store/issue/issueActions"
import { IssueSelectors } from "../../../store/issue/issueRedux"
import { ApplicationState } from "../../../store/redux"
import { Tag } from "../../../store/tag/tagRedux"
import { Issue } from "../../../types/issue"
import KanbanItem from "./KanbanItem/KanbanItem"

import styles from "./KanbanScheme.module.scss"

interface PropsFromDispatch {
  updateIssueStatusRequest: typeof updateIssueStatusActions.updateIssueStatusRequest
}

interface PropsFromState {
  groupedIssuesByStatus: Dictionary<Issue[]>
}

interface InnerProps {
  statusList: ApplicationState["status"]["statusList"]["data"]
  issueList: ApplicationState["issue"]["issueList"]["data"]
  tagList: ApplicationState["tag"]["tagList"]["data"]
  permissionList: ApplicationState["permission"]["permissionList"]
  userList: ApplicationState["user"]["users"]
  sprintId: number | null
  projectId: number
}

type KanbanSchemeProps = PropsFromDispatch & PropsFromState & InnerProps

interface KanbanSchemeState {
  selectedIssueId: number | null
  draggedIssue: Issue | null
}

class KanbanScheme extends Component<KanbanSchemeProps, KanbanSchemeState> {
  constructor(props: KanbanSchemeProps) {
    super(props)

    this.state = {
      draggedIssue: null,
      selectedIssueId: null,
    }
  }

  handleShowModal = (issueId: number) => () => {
    console.log(issueId)
    this.setState({ selectedIssueId: issueId })
  }

  setIssueId = (issueId: number | null) => {
    this.setState({ selectedIssueId: issueId })
  }

  resetAfterDrop = () => {
    this.setState({ draggedIssue: null })
  }

  onDragStart = (issue: Issue) => (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "0.4"

    this.setState({ draggedIssue: issue })
  }

  onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "1"
  }

  onDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault()

  onDropContainer = (statusId: number) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    const { updateIssueStatusRequest } = this.props
    const { draggedIssue } = this.state

    if (draggedIssue && draggedIssue.statusId !== statusId) {
      updateIssueStatusRequest(draggedIssue.id, draggedIssue.statusId, statusId)
    }

    this.resetAfterDrop()
    event.stopPropagation()
  }

  onDropItem = (issue: Issue) => (event: React.DragEvent<HTMLDivElement>) => {
    const { updateIssueStatusRequest } = this.props
    const { draggedIssue } = this.state

    if (draggedIssue && draggedIssue.id !== issue.id) {
      updateIssueStatusRequest(
        draggedIssue.id,
        draggedIssue.statusId,
        issue.statusId
      )
    }

    this.resetAfterDrop()
    event.stopPropagation()
  }

  areListsReady = () => {
    const { statusList, tagList, permissionList, userList } = this.props

    return (
      statusList && tagList && permissionList.data && userList.data
    )
  }

  onCancel = () => {
    this.setState({ selectedIssueId: null })
  }

  render() {
    const {
      statusList,
      issueList,
      groupedIssuesByStatus,
      tagList,
      projectId,
      sprintId,
      permissionList,
      userList,
    } = this.props
    const { selectedIssueId } = this.state

    if (!issueList) {
      return null
    }

    return (
      <div className={styles.kanbanScheme}>
        {statusList &&
          statusList.map((status) => (
            <div key={status.id} className={styles.statusColumnContainer}>
              <div className={styles.header}>{status.name}</div>
              <div
                className={styles.statusColumn}
                onDragOver={this.onDragOver}
                onDrop={this.onDropContainer(status.id)}
              >
                {issueList &&
                  tagList &&
                  groupedIssuesByStatus[status.id] &&
                  groupedIssuesByStatus[status.id].map((issue) =>
                    this.renderItem(issue, tagList)
                  )}
              </div>
            </div>
          ))}
        {this.areListsReady() && selectedIssueId && (
          <UpdateIssueModal
            setIssueId={this.setIssueId}
            issueId={selectedIssueId}
            projectId={projectId}
            sprintId={sprintId}
            statusList={statusList}
            tagList={tagList}
            permissionList={permissionList.data}
            userList={userList.data}
            onCancel={this.onCancel}
          />
        )}
      </div>
    )
  }

  private renderItem = (issue: Issue, tagList: Tag[]) => (
    <KanbanItem
      key={issue.id}
      issue={issue}
      tagList={tagList}
      onClick={this.handleShowModal(issue.id)}
      onDragStart={this.onDragStart(issue)}
      onDrop={this.onDropItem(issue)}
      onDragEnd={this.onDragEnd}
    />
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  groupedIssuesByStatus: IssueSelectors.groupedIssuesByStatus(state),
})

const mapDispatchToProps = {
  updateIssueStatusRequest: updateIssueStatusActions.updateIssueStatusRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanScheme)
