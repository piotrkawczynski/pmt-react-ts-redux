import * as objectToFormdata from "object-to-formdata"
import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"

import { api } from "../../services/api"
import { Comment } from "../../types/comment"
import { LoaderImage } from "../../types/loaderImage"
import { CreateComment } from "../../types/request/createComment"
import {
  createCommentActions,
  deleteCommentActions,
  getCommentListActions,
  types,
} from "./commentActions"

function* getCommentListFlow(
  action: ActionType<typeof getCommentListActions.getCommentListRequest>
) {
  try {
    const { issueId } = action.payload

    const { data } = yield call(api.issues.getCommentList, issueId)

    const commentListResponse = data as Comment[]

    yield put(getCommentListActions.getCommentListSuccess(commentListResponse))
  } catch (error) {
    console.error(error.message)
    yield put(getCommentListActions.getCommentListFailure(error.message))
  }
}

function* createCommentFlow(
  action: ActionType<typeof createCommentActions.createCommentRequest>
) {
  try {
    const { comment: commentFormValues, issueId } = action.payload

    const attachments = commentFormValues.attachments.map(
      (image) => image.file!
    )

    const createCommentBody = {
      ...commentFormValues,
      description: commentFormValues.comment,
      attachments,
      issueId,
    }

    const formData = objectToFormdata(
      { ...createCommentBody },
      { nulls: false }
    )

    yield call(api.comments.createComment, formData)

    yield put(createCommentActions.createCommentSuccess())
    yield put(getCommentListActions.getCommentListRequest(issueId))
  } catch (error) {
    console.error(error.message)
    yield put(createCommentActions.createCommentFailure(error.message))
  }
}

function* deleteCommentFlow(
  action: ActionType<typeof deleteCommentActions.deleteCommentRequest>
) {
  try {
    const { commentId, issueId } = action.payload

    yield call(api.comments.deleteComment, commentId)

    yield put(deleteCommentActions.deleteCommentSuccess())
    yield put(getCommentListActions.getCommentListRequest(issueId))
  } catch (error) {
    console.error(error.message)
    yield put(deleteCommentActions.deleteCommentFailure(error.message))
  }
}

function* commentSaga() {
  yield takeLatest(types.GET_COMMENT_LIST.REQUEST, getCommentListFlow)
  yield takeLatest(types.CREATE_COMMENT.REQUEST, createCommentFlow)
  yield takeLatest(types.DELETE_COMMENT.REQUEST, deleteCommentFlow)
}

export { commentSaga }
