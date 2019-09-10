import { createPromiseType } from "../../utilities/ReduxFunctions"
import { StatusFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"
import { Status } from "./statusRedux"

export interface CreateStatusBody {
  projectId: number
  name: string
  order: number
}

export interface UpdateStatusOrderBody {
  firstStatus: StatusFormValues
  secondStatus: StatusFormValues
}

/* ------------- Action Types ------------- */
const CREATE_STATUS = createPromiseType("CREATE_STATUS")
const UPDATE_STATUS_ORDER = createPromiseType("UPDATE_STATUS_ORDER")
const DELETE_STATUS = createPromiseType("DELETE_STATUS")
const GET_STATUS_LIST = createPromiseType("GET_STATUS_LIST")

export const types = {
  CREATE_STATUS,
  UPDATE_STATUS_ORDER,
  DELETE_STATUS,
  GET_STATUS_LIST,
}

/* ------------- Action Creators ------------- */

const createStatusInit = () => ({
  type: CREATE_STATUS.INIT,
})

const createStatusRequest = (
  projectId: number,
  status: StatusFormValues,
  setValues: () => void
) => ({
  type: CREATE_STATUS.REQUEST,
  payload: {
    projectId,
    status,
    setValues,
  },
})

const createStatusSuccess = (statuses: StatusFormValues) => ({
  type: CREATE_STATUS.SUCCESS,
  payload: statuses,
})

const createStatusFailure = (error: string) => ({
  type: CREATE_STATUS.FAILURE,
  error,
})

export const createStatusActions = {
  createStatusInit,
  createStatusRequest,
  createStatusSuccess,
  createStatusFailure,
}

const updateStatusOrderInit = () => ({
  type: UPDATE_STATUS_ORDER.INIT,
})

const updateStatusOrderRequest = (
  firstStatus: StatusFormValues,
  secondStatus: StatusFormValues
) => ({
  type: UPDATE_STATUS_ORDER.REQUEST,
  payload: {
    firstStatus,
    secondStatus,
  },
})

const updateStatusOrderSuccess = () => ({
  type: UPDATE_STATUS_ORDER.SUCCESS,
})

const updateStatusOrderFailure = (error: string) => ({
  type: UPDATE_STATUS_ORDER.FAILURE,
  error,
})

export const updateStatusOrderActions = {
  updateStatusOrderInit,
  updateStatusOrderRequest,
  updateStatusOrderSuccess,
  updateStatusOrderFailure,
}

const deleteStatusInit = () => ({
  type: DELETE_STATUS.INIT,
})

const deleteStatusRequest = (id: number, setValues: () => void) => ({
  type: DELETE_STATUS.REQUEST,
  payload: {
    id,
    setValues,
  },
})

const deleteStatusSuccess = () => ({
  type: DELETE_STATUS.SUCCESS,
})

const deleteStatusFailure = (error: string) => ({
  type: DELETE_STATUS.FAILURE,
  error,
})

export const deleteStatusActions = {
  deleteStatusInit,
  deleteStatusRequest,
  deleteStatusSuccess,
  deleteStatusFailure,
}

const getStatusListInit = () => ({
  type: GET_STATUS_LIST.INIT,
})

const getStatusListRequest = (projectId: number) => ({
  type: GET_STATUS_LIST.REQUEST,
  payload: {
    projectId,
  },
})

const getStatusListSuccess = (statusList: Status[]) => ({
  type: GET_STATUS_LIST.SUCCESS,
  payload: statusList,
})

const getStatusListFailure = (error: string) => ({
  type: GET_STATUS_LIST.FAILURE,
  error,
})

export const getStatusListActions = {
  getStatusListInit,
  getStatusListRequest,
  getStatusListSuccess,
  getStatusListFailure,
}
