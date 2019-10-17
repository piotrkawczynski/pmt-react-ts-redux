import React, { Component } from "react"
import { connect } from "react-redux"

import { deleteCommentActions } from "../../../store/comment/commentActions"
import { ApplicationState } from "../../../store/redux"
import { Comment as CommentType } from "../../../types/comment"
import { User } from "../../../types/user"
import { CloseButton } from "../../CloseButton/CloseButton"

import styles from "./Comment.module.scss"

interface InnerProps {
  comment: CommentType
  author: User
  permissionList: ApplicationState["permission"]["permissionList"]["data"]
}

interface PropsFromState {
  user: ApplicationState["user"]["user"]["data"]
}

interface PropsFromDispatch {
  deleteCommentRequest: typeof deleteCommentActions.deleteCommentRequest
}

type CommentProps = InnerProps & PropsFromState & PropsFromDispatch

class Comment extends Component<CommentProps> {
  handleDelete = () => {
    const { deleteCommentRequest, comment } = this.props
    deleteCommentRequest(comment.id, comment.issueId)
  }

  render() {
    const { comment, author, user } = this.props

    if (!comment) {
      return null
    }

    const { attachments, description, permissionId, createdAt } = comment

    if (author.permission === permissionId && permissionId === 3) {
      return null
    }

    return (
      <div className={styles.comment}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div
              className={styles.leftInner}
            >{`${author.firstName} ${author.lastName}`}</div>
          </div>
          <div className={styles.right}>{createdAt}</div>
          <div className={styles.buttonContainer}>
            {author.id === user!.id && (
              <CloseButton
                onClick={this.handleDelete}
                containerClassName={styles.buttonClose}
                armClassName={styles.armsButtonClose}
              />
            )}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.description}>{description}</div>
          {attachments.length > 0 && (
            <div className={styles.attachmentsContainer}>
              <div className={styles.attachments}>
                {attachments.map((attachment, index) => (
                  <img
                    key={`attachment${index}`}
                    className={styles.attachedImage}
                    src={attachment}
                    alt={`attachment${index}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user.user.data,
})

const mapDispatchToProps = {
  deleteCommentRequest: deleteCommentActions.deleteCommentRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
