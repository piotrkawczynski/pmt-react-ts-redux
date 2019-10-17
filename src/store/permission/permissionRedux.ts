import { createReducer } from "reduxsauce"
import { Permission } from "../../types/permission"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types as userTypes } from "../user/userActions"
import { types } from "./permissionActions"

/* ------------- Initial UserRedux ------------- */
export interface PermissionRedux {
  permissionList: PromiseState<Permission[], string>
}

export const INITIAL_STATE: PermissionRedux = {
  permissionList: { ...createPromiseState<Permission[], string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<PermissionRedux>(
    types.GET_PERMISSION_LIST,
    INITIAL_STATE,
    "permissionList"
  ),
  [userTypes.LOGOUT_USER]: () => INITIAL_STATE,
})
