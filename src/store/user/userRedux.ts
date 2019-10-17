import produce from "immer"
import { createReducer } from "reduxsauce"
import { ActionType } from "typesafe-actions"
import { Auth } from "../../types/auth"
import { User } from "../../types/user"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { ApplicationState } from "../redux"
import { types, updateProfileActions } from "./userActions"

/* ------------- Initial UserRedux ------------- */
export interface UserRedux {
  loggedIn: boolean
  user: PromiseState<Auth, string>
  registerUser: PromiseState<void, string>
  users: PromiseState<User[], string>
  remainPassword: PromiseState<void, string>
  changePassword: PromiseState<void, string>
  updateProfile: PromiseState<void, string>
}

export const INITIAL_STATE: UserRedux = {
  loggedIn: false,
  user: { ...createPromiseState<Auth, string>() },
  registerUser: { ...createPromiseState<void, string>() },
  users: { ...createPromiseState<User[], string>() },
  remainPassword: { ...createPromiseState<void, string>() },
  changePassword: { ...createPromiseState<void, string>() },
  updateProfile: { ...createPromiseState<void, string>() },
}

/* ------------- Selectors ------------- */
const token = (state: ApplicationState) => {
  const userData = state.user.user.data!

  return (userData && userData.token) || null
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

export const updateUserReducer = (
  state = INITIAL_STATE,
  action: ActionType<typeof updateProfileActions.updateUser>
) => {
  const { updateProfileValues } = action.payload
  const { email, firstName, lastName, username } = updateProfileValues

  return produce(state, (draft) => {
    draft.user.data!.username = email
    draft.user.data!.firstName = firstName
    draft.user.data!.lastName = lastName
    draft.user.data!.username = username
  })
}

export const logoutUserReducer = () => {
  return INITIAL_STATE
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
  ...createNestedReducer<UserRedux>(
    types.REMAIN_PASSWORD,
    INITIAL_STATE,
    "remainPassword"
  ),
  ...createNestedReducer<UserRedux>(
    types.REMAIN_PASSWORD,
    INITIAL_STATE,
    "changePassword"
  ),
  ...createNestedReducer<UserRedux>(
    types.UPDATE_PROFILE,
    INITIAL_STATE,
    "updateProfile"
  ),
  [types.UPDATE_USER]: updateUserReducer,
  [types.LOGOUT_USER]: () => INITIAL_STATE,
})
