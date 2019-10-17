import { TagPickerValues } from "../../components/Pickers/TagPicker/TagPicker"
import { TagFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"
import { createPromiseType } from "../../utilities/ReduxFunctions"

import { Tag } from "./tagRedux"

/* ------------- Action Types ------------- */
const CREATE_TAG = createPromiseType("CREATE_TAG")
const DELETE_TAG = createPromiseType("DELETE_TAG")
const GET_TAG_LIST = createPromiseType("GET_TAG_LIST")

export const types = { CREATE_TAG, DELETE_TAG, GET_TAG_LIST }

/* ------------- Action Creators ------------- */

const createTagInit = () => ({
  type: CREATE_TAG.INIT,
})

const createTagRequest = (
  projectId: number,
  tag: TagPickerValues,
  setValues: () => void
) => ({
  type: CREATE_TAG.REQUEST,
  payload: {
    projectId,
    tag,
    setValues,
  },
})

const createTagSuccess = (tag: TagFormValues) => ({
  type: CREATE_TAG.SUCCESS,
  payload: tag,
})

const createTagFailure = (error: string) => ({
  type: CREATE_TAG.FAILURE,
  error,
})

export const createTagActions = {
  createTagInit,
  createTagRequest,
  createTagSuccess,
  createTagFailure,
}

const deleteTagInit = () => ({
  type: DELETE_TAG.INIT,
})

const deleteTagRequest = (id: number, setValues: () => void) => ({
  type: DELETE_TAG.REQUEST,
  payload: {
    id,
    setValues,
  },
})

const deleteTagSuccess = () => ({
  type: DELETE_TAG.SUCCESS,
})

const deleteTagFailure = (error: string) => ({
  type: DELETE_TAG.FAILURE,
  error,
})

export const deleteTagActions = {
  deleteTagInit,
  deleteTagRequest,
  deleteTagSuccess,
  deleteTagFailure,
}

const getTagListInit = () => ({
  type: GET_TAG_LIST.INIT,
})

const getTagListRequest = (projectId: number) => ({
  type: GET_TAG_LIST.REQUEST,
  payload: {
    projectId,
  },
})

const getTagListSuccess = (tagList: Tag[]) => ({
  type: GET_TAG_LIST.SUCCESS,
  payload: tagList,
})

const getTagListFailure = (error: string) => ({
  type: GET_TAG_LIST.FAILURE,
  error,
})

export const getTagListActions = {
  getTagListInit,
  getTagListRequest,
  getTagListSuccess,
  getTagListFailure,
}
