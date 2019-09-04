import { createPromiseType } from "../../utilities/ReduxFunctions"
import { InviteFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"

export interface CreateInviteBody {
  projectId: number
  email: string
  permissionId: number
}

/* ------------- Action Types ------------- */
const CREATE_INVITE = createPromiseType("CREATE_INVITE")
const DELETE_INVITE = createPromiseType("DELETE_INVITE")
const GET_INVITE_LIST = createPromiseType("GET_INVITE_LIST")

export const types = { CREATE_INVITE, DELETE_INVITE, GET_INVITE_LIST }

/* ------------- Action Creators ------------- */

const createInviteInit = () => ({
  type: CREATE_INVITE.INIT,
})

const createInviteRequest = (
  projectId: number,
  invite: InviteFormValues,
  setValues: () => void
) => ({
  type: CREATE_INVITE.REQUEST,
  payload: {
    projectId,
    invite,
    setValues,
  },
})

const createInviteSuccess = (invites: InviteFormValues) => ({
  type: CREATE_INVITE.SUCCESS,
  payload: invites,
})

const createInviteFailure = (error: string) => ({
  type: CREATE_INVITE.FAILURE,
  error,
})

export const createInviteActions = {
  createInviteInit,
  createInviteRequest,
  createInviteSuccess,
  createInviteFailure,
}

const deleteInviteInit = () => ({
  type: DELETE_INVITE.INIT,
})

const deleteInviteRequest = (
  id: number,
  setValues: () => void
) => ({
  type: DELETE_INVITE.REQUEST,
  payload: {
    id,
    setValues,
  },
})

const deleteInviteSuccess = () => ({
  type: DELETE_INVITE.SUCCESS,
})

const deleteInviteFailure = (error: string) => ({
  type: DELETE_INVITE.FAILURE,
  error,
})

export const deleteInviteActions = {
  deleteInviteInit,
  deleteInviteRequest,
  deleteInviteSuccess,
  deleteInviteFailure,
}

const getInviteListInit = () => ({
  type: GET_INVITE_LIST.INIT,
})

const getInviteListRequest = (
  projectId: number
) => ({
  type: GET_INVITE_LIST.REQUEST,
  payload: {
    projectId
  },
})

const getInviteListSuccess = (inviteList: InviteFormValues[]) => ({
  type: GET_INVITE_LIST.SUCCESS,
  payload: inviteList
})

const getInviteListFailure = (error: string) => ({
  type: GET_INVITE_LIST.FAILURE,
  error,
})

export const getInviteListActions = {
  getInviteListInit,
  getInviteListRequest,
  getInviteListSuccess,
  getInviteListFailure,
}
