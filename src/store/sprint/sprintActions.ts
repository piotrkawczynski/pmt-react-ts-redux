import { Sprint } from "../../types/sprint"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const GET_SPRINT_LIST = createPromiseType("GET_SPRINT_LIST")

export const types = { GET_SPRINT_LIST }

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

const getSprintListSuccess = (sprintList: Sprint[]) => ({
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
