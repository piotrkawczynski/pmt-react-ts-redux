import { createReducer } from "reduxsauce"
import { ActionType } from "typesafe-actions"

import { types as userTypes } from "../user/userActions"
import { setSidebarExtension, types } from "./componentsActions"

/* ------------- Initial UserRedux ------------- */
export interface ComponentsRedux {
  isSidebarExtended: boolean
}

export const INITIAL_STATE: ComponentsRedux = {
  isSidebarExtended: true,
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */
const isSidebarExtendedReducer = (
  state = INITIAL_STATE,
  action: ActionType<typeof setSidebarExtension>
) => {
  const { isExtended } = action

  return {
    ...state,
    isSidebarExtended: isExtended,
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [types.SET_SIDEBAR_EXTENSION]: isSidebarExtendedReducer,
  [userTypes.LOGOUT_USER]: () => INITIAL_STATE,
})
