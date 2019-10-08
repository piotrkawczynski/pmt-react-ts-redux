import React, { Component } from "react"
import { connect } from "react-redux"

import { ApplicationState } from "../../store/redux"
import Comment from "./Comment/Comment"

import styles from "./CommentList.module.scss"

interface CommentListProps {
  commentList: ApplicationState["comment"]["commentList"]
  userList: ApplicationState["user"]["users"]["data"]
  permissionList: ApplicationState["permission"]["permissionList"]["data"]
}

class CommentList extends Component<CommentListProps> {
  constructor(props: CommentListProps) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const {
      commentList: { data },
      userList,
      permissionList,
    } = this.props

    if (!data) {
      return null
    }

    return (
      <div className={styles.commentSection}>
        <label className={styles.label}>Comments</label>
        {data &&
          data.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                author={userList!.find(({ id }) => id === comment.authorId)!}
                permissionList={permissionList}
              />
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {}

const mapDispatchToProps = {}

export default connect(
  null,
  mapDispatchToProps
)(CommentList)
