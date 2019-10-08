import React, { Component } from "react"

import { updateIssueSprintActions } from "../../../store/issue/issueActions"
import { Status } from "../../../store/status/statusRedux"
import { Issue } from "../../../types/issue"
import { User } from "../../../types/user"
import BacklogListItem from "./BacklogListItem/BacklogListItem"

import styles from "./BacklogList.module.scss"

interface InnerProps {
  sprintId: number
  setIssueId: (issueId: number | null) => void
  issueListSource: "backlog" | "sprint"
  issueList: Issue[] | null
  statusList: Status[]
  userList: User[]
  updateIssueSprintRequest: typeof updateIssueSprintActions.updateIssueSprintRequest
}

class BacklogList extends Component<InnerProps> {
  onClick = (issueId: number) => () => {
    this.props.setIssueId(issueId)
  }

  render() {
    const {
      issueList,
      statusList,
      userList,
      issueListSource,
      updateIssueSprintRequest,
      sprintId,
    } = this.props

    console.log(issueList)

    return (
      <div className={styles.listWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.code}>code</p>
          <p className={styles.status}>Status</p>
          <p className={styles.title}>Title</p>
          <p className={styles.assignee}>Assignee</p>
          <p className={styles.author}>Author</p>
        </div>
        <div className={styles.listGroup}>
          {issueList &&
            issueList.map((issue) => (
              <BacklogListItem
                key={issue.id}
                issueListSource={issueListSource}
                issue={issue}
                statusList={statusList}
                userList={userList}
                onClick={this.onClick(issue.id)}
                updateIssueSprintRequest={updateIssueSprintRequest}
                sprintId={sprintId}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default BacklogList
