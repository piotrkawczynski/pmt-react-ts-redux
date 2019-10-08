import { createReducer } from "reduxsauce"

import { Comment } from "../../types/comment"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./commentActions"

/* ------------- Initial UserRedux ------------- */
export interface CommentRedux {
  commentList: PromiseState<Comment[], string>
  createComment: PromiseState<void, string>
  deleteComment: PromiseState<void, string>
}

export const INITIAL_STATE: CommentRedux = {
  commentList: { ...createPromiseState<Comment[], string>() },
  createComment: { ...createPromiseState<void, string>() },
  deleteComment: { ...createPromiseState<void, string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<CommentRedux>(
    types.GET_COMMENT_LIST,
    INITIAL_STATE,
    "commentList"
  ),
  ...createNestedReducer<CommentRedux>(
    types.CREATE_COMMENT,
    INITIAL_STATE,
    "createComment"
  ),
  ...createNestedReducer<CommentRedux>(
    types.DELETE_COMMENT,
    INITIAL_STATE,
    "deleteComment"
  ),
})
