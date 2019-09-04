import { createReducer } from "reduxsauce"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./tagActions"
import { TagFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"

export interface Tag {
  id: number
  name: string
  image: string
}

/* ------------- Initial UserRedux ------------- */
export interface TagRedux {
  createTag: PromiseState<TagFormValues, string>
  deleteTag: PromiseState<void, string>
  tagList: PromiseState<Tag[], string>
}

export const INITIAL_STATE: TagRedux = {
  createTag: { ...createPromiseState<TagFormValues, string>() },
  deleteTag: { ...createPromiseState<void, string>() },
  tagList: { ...createPromiseState<Tag[], string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<TagRedux>(
    types.CREATE_TAG,
    INITIAL_STATE,
    "createTag"
  ),
  ...createNestedReducer<TagRedux>(
    types.DELETE_TAG,
    INITIAL_STATE,
    "deleteTag"
  ),
  ...createNestedReducer<TagRedux>(
    types.GET_TAG_LIST,
    INITIAL_STATE,
    "tagList"
  ),
})
