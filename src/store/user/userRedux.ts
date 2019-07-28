import { createReducer } from "reduxsauce"
import {
  createFailureExtendedReducer,
  createInitExtendedReducer,
  createRequestExtendedReducer,
  createSuccessExtendedReducer,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { ApplicationState } from "../redux"
import { types } from "./userActions"

/* ------------- Initial UserRedux ------------- */
export interface UserRedux {
  loggedIn: boolean
  userList: PromiseState<string>
  permissionList: PromiseState<string>
  user: PromiseState<string>
}

const PROMISE_STATE: PromiseState<string> = {
  status: "init",
  isLoading: false,
  data: null,
  error: null,
}

export const INITIAL_STATE: UserRedux = {
  loggedIn: false,
  userList: { ...PROMISE_STATE },
  permissionList: { ...PROMISE_STATE },
  user: { ...PROMISE_STATE },
}

/* ------------- Selectors ------------- */
const user = (state: ApplicationState) => state.user.user
const loggedIn = (state: ApplicationState) => state.user.loggedIn

export const UserSelector = {
  user,
  loggedIn,
}

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [types.LOGIN.INIT]: createInitExtendedReducer<UserRedux>(
    INITIAL_STATE,
    "user"
  ),
  [types.LOGIN.REQUEST]: createRequestExtendedReducer<UserRedux>(
    INITIAL_STATE,
    "user"
  ),
  [types.LOGIN.SUCCESS]: createSuccessExtendedReducer<UserRedux>(
    INITIAL_STATE,
    "user"
  ),
  [types.LOGIN.FAILURE]: createFailureExtendedReducer<UserRedux>(
    INITIAL_STATE,
    "user"
  ),
})
