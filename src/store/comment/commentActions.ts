import { CommentInputForm } from "../../components/CommentInput/CommentInput"
import { Comment } from "../../types/comment"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const GET_COMMENT_LIST = createPromiseType("GET_COMMENT_LIST")
const CREATE_COMMENT = createPromiseType("CREATE_COMMENT")
const DELETE_COMMENT = createPromiseType("DELETE_COMMENT")

export const types = {
  GET_COMMENT_LIST,
  CREATE_COMMENT,
  DELETE_COMMENT,
}

/* ------------- Action Creators ------------- */

const getCommentListInit = () => ({
  type: GET_COMMENT_LIST.INIT,
})

const getCommentListRequest = (issueId: number) => ({
  type: GET_COMMENT_LIST.REQUEST,
  payload: {
    issueId,
  },
})

const getCommentListSuccess = (commentList: Comment[]) => ({
  type: GET_COMMENT_LIST.SUCCESS,
  payload: commentList,
})

const getCommentListFailure = (error: string) => ({
  type: GET_COMMENT_LIST.FAILURE,
  error,
})

export const getCommentListActions = {
  getCommentListInit,
  getCommentListRequest,
  getCommentListSuccess,
  getCommentListFailure,
}

const createCommentInit = () => ({
  type: CREATE_COMMENT.INIT,
})

const createCommentRequest = (comment: CommentInputForm, issueId: number) => ({
  type: CREATE_COMMENT.REQUEST,
  payload: { comment, issueId },
})

const createCommentSuccess = () => ({
  type: CREATE_COMMENT.SUCCESS,
})

const createCommentFailure = (error: string) => ({
  type: CREATE_COMMENT.FAILURE,
  error,
})

export const createCommentActions = {
  createCommentInit,
  createCommentRequest,
  createCommentSuccess,
  createCommentFailure,
}

const deleteCommentInit = () => ({
  type: DELETE_COMMENT.INIT,
})

const deleteCommentRequest = (commentId: number, issueId: number) => ({
  type: DELETE_COMMENT.REQUEST,
  payload: { commentId, issueId },
})

const deleteCommentSuccess = () => ({
  type: DELETE_COMMENT.SUCCESS,
})

const deleteCommentFailure = (error: string) => ({
  type: DELETE_COMMENT.FAILURE,
  error,
})

export const deleteCommentActions = {
  deleteCommentInit,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
}
