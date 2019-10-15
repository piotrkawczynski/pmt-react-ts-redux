import { SprintFormValues } from "../../components/SprintModal/SprintModal"
import { Sprint } from "../../types/sprint"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const GET_SPRINT_LIST = createPromiseType("GET_SPRINT_LIST")
const CREATE_SPRINT = createPromiseType("CREATE_SPRINT")
const UPDATE_SPRINT = createPromiseType("UPDATE_SPRINT")
const DELETE_SPRINT = createPromiseType("DELETE_SPRINT")

export const types = {
  GET_SPRINT_LIST,
  CREATE_SPRINT,
  UPDATE_SPRINT,
  DELETE_SPRINT,
}

/* ------------- Action Creators ------------- */

const getSprintListInit = () => ({
  type: GET_SPRINT_LIST.INIT,
})

const getSprintListRequest = (projectId: number) => ({
  type: GET_SPRINT_LIST.REQUEST,
  payload: {
    projectId,
  },
})

const getSprintListSuccess = (sprintList: Sprint[] | null) => ({
  type: GET_SPRINT_LIST.SUCCESS,
  payload: sprintList,
})

const getSprintListFailure = (error: string) => ({
  type: GET_SPRINT_LIST.FAILURE,
  error,
})

export const getSprintListActions = {
  getSprintListInit,
  getSprintListRequest,
  getSprintListSuccess,
  getSprintListFailure,
}

const createSprintInit = () => ({
  type: CREATE_SPRINT.INIT,
})

const createSprintRequest = (
  createIssueFormValues: SprintFormValues,
  projectId: number
) => ({
  type: CREATE_SPRINT.REQUEST,
  payload: {
    createIssueFormValues,
    projectId,
  },
})

const createSprintSuccess = () => ({
  type: CREATE_SPRINT.SUCCESS,
})

const createSprintFailure = (error: string) => ({
  type: CREATE_SPRINT.FAILURE,
  error,
})

export const createSprintActions = {
  createSprintInit,
  createSprintRequest,
  createSprintSuccess,
  createSprintFailure,
}

const updateSprintInit = () => ({
  type: UPDATE_SPRINT.INIT,
})

const updateSprintRequest = (
  createIssueFormValues: SprintFormValues,
  sprintId: number,
  projectId: number
) => ({
  type: UPDATE_SPRINT.REQUEST,
  payload: {
    createIssueFormValues,
    sprintId,
    projectId,
  },
})

const updateSprintSuccess = (updatedSprint: Sprint) => ({
  type: UPDATE_SPRINT.SUCCESS,
  payload: updatedSprint,
})

const updateSprintFailure = (error: string) => ({
  type: UPDATE_SPRINT.FAILURE,
  error,
})

export const updateSprintActions = {
  updateSprintInit,
  updateSprintRequest,
  updateSprintSuccess,
  updateSprintFailure,
}

const deleteSprintInit = () => ({
  type: DELETE_SPRINT.INIT,
})

const deleteSprintRequest = (sprintId: number, projectId: number) => ({
  type: DELETE_SPRINT.REQUEST,
  payload: {
    sprintId,
    projectId,
  },
})

const deleteSprintSuccess = () => ({
  type: DELETE_SPRINT.SUCCESS,
})

const deleteSprintFailure = (error: string) => ({
  type: DELETE_SPRINT.FAILURE,
  error,
})

export const deleteSprintActions = {
  deleteSprintInit,
  deleteSprintRequest,
  deleteSprintSuccess,
  deleteSprintFailure,
}
