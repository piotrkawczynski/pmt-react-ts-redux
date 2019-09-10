import { createPromiseType } from "../../utilities/ReduxFunctions"
import { Permission } from "../../types/permission"

/* ------------- Action Types ------------- */
const GET_PERMISSION_LIST = createPromiseType("GET_PERMISSION_LIST")

export const types = { GET_PERMISSION_LIST }

/* ------------- Action Creators ------------- */

const getPermissionListInit = () => ({
  type: GET_PERMISSION_LIST.INIT,
})

const getPermissionListRequest = () => ({
  type: GET_PERMISSION_LIST.REQUEST,
})

const getPermissionListSuccess = (permissionList: Permission[]) => ({
  type: GET_PERMISSION_LIST.SUCCESS,
  payload: permissionList,
})

const getPermissionListFailure = (error: string) => ({
  type: GET_PERMISSION_LIST.FAILURE,
  error,
})

export const getPermissionListActions = {
  getPermissionListInit,
  getPermissionListRequest,
  getPermissionListSuccess,
  getPermissionListFailure,
}
