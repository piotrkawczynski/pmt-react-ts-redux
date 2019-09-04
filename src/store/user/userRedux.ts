import { createReducer } from "reduxsauce"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { ApplicationState } from "../redux"
import { types } from "./userActions"
import { Auth } from "../../types/auth"
import { User } from "../../types/user"

/* ------------- Initial UserRedux ------------- */
export interface UserRedux {
  loggedIn: boolean
  user: PromiseState<Auth, string>
  registerUser: PromiseState<void, string>
  users: PromiseState<User[], string>
}

export const INITIAL_STATE: UserRedux = {
  loggedIn: false,
  user: { ...createPromiseState<Auth, string>() },
  registerUser: { ...createPromiseState<void, string>() },
  users: { ...createPromiseState<User[], string>() },
}

/* ------------- Selectors ------------- */
const token = (state: ApplicationState) => {
  const user = state.user.user.data

  return (user && user.token) || null
}
const user = (state: ApplicationState) => state.user.user
const loggedIn = (state: ApplicationState) => state.user.loggedIn

export const userSelector = {
  user,
  loggedIn,
  token,
}

/* ------------- Reducers ------------- */

export const setUserLoggedInReducer = (state = INITIAL_STATE) => {
  return {
    ...state,
    loggedIn: true,
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [types.SET_USER_LOGGED_IN]: setUserLoggedInReducer,
  ...createNestedReducer<UserRedux>(types.LOGIN, INITIAL_STATE, "user"),
  ...createNestedReducer<UserRedux>(
    types.REGISTER,
    INITIAL_STATE,
    "registerUser"
  ),
  ...createNestedReducer<UserRedux>(
    types.GET_USER_LIST,
    INITIAL_STATE,
    "users"
  ),
})
