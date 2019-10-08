import { faLevelDownAlt, faLevelUpAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { Tooltip } from "reactstrap"

import { updateIssueSprintActions } from "../../../../store/issue/issueActions"
import { Status } from "../../../../store/status/statusRedux"
import { Issue } from "../../../../types/issue"
import { User } from "../../../../types/user"

import styles from "./BacklogListItem.module.scss"

interface InnerProps {
  className?: string
  issue: Issue
  issueListSource: "backlog" | "sprint"
  statusList: Status[]
  userList: User[]
  onClick: () => void
  updateIssueSprintRequest: typeof updateIssueSprintActions.updateIssueSprintRequest
  sprintId: number
}

interface BacklogListItemState {
  openTooltip: boolean
}

class BacklogListItem extends Component<InnerProps, BacklogListItemState> {
  constructor(props: InnerProps) {
    super(props)

    this.state = {
      openTooltip: false,
    }
  }

  onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    const { issueListSource } = this.props
    const requestHandler =
      issueListSource === "backlog"
        ? this.handleMoveToSprintClick
        : this.handleMoveToBacklog

    requestHandler()
  }

  handleMoveToSprintClick = () => {
    const { issue, updateIssueSprintRequest, sprintId } = this.props

    updateIssueSprintRequest(issue.id, sprintId, issue.projectId, "toSprint")
  }

  handleMoveToBacklog = () => {
    const { issue, sprintId, updateIssueSprintRequest } = this.props

    updateIssueSprintRequest(issue.id, sprintId, issue.projectId, "toBacklog")
  }

  createTooltip = (id: number) => {
    return `Tooltip-${id}`
  }

  toggle = () => {
    this.setState(({ openTooltip }) => ({
      openTooltip: !openTooltip,
    }))
  }

  returnTooltip = (id: number, tooltipText: string) => {
    return (
      <Tooltip
        delay={{ show: 500, hide: 200 }}
        placement={"bottom"}
        isOpen={this.state.openTooltip}
        target={this.createTooltip(id)}
        toggle={this.toggle}
      >
        {tooltipText}
      </Tooltip>
    )
  }

  renderArrowIcon = (issueId: number) => {
    const { issueListSource } = this.props
    const description =
      issueListSource === "backlog"
        ? "Move to selected sprint"
        : "Move to backlog"

    const icon = issueListSource === "backlog" ? faLevelUpAlt : faLevelDownAlt

    return (
      <>
        <FontAwesomeIcon icon={icon} size={"lg"} className={styles.icon} />
        {this.returnTooltip(issueId, description)}
      </>
    )
  }

  render() {
    const { issue, statusList, userList, onClick } = this.props

    const { code, title, statusId, assigneeId, authorId } = issue

    const status = statusList.find(({ id }) => id === statusId)
    const assignee = userList.find(({ id }) => id === assigneeId)
    const author = userList.find(({ id }) => id === authorId)

    const assigneeFullName = assignee
      ? `${assignee.firstName} ${assignee.lastName}`
      : ""
    const authorFullName = author
      ? `${author.firstName} ${author.lastName}`
      : ""
    const statusName = status ? status.name : ""

    return (
      <div className={styles.itemWrapper} onClick={onClick}>
        <div className={styles.item}>
          <p className={styles.code}>{code}</p>
          <p className={styles.status}>{statusName}</p>
          <p className={styles.title}>{title}</p>
          <p className={styles.assignee}>{assigneeFullName}</p>
          <p className={styles.author}>{authorFullName}</p>
        </div>
        <div
          className={styles.buttonWrapper}
          id={this.createTooltip(issue.id)}
          onClick={this.onClick}
        >
          {this.renderArrowIcon(issue.id)}
        </div>
      </div>
    )
  }
}

export default BacklogListItem
