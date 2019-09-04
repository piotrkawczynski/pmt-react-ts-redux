import { createReducer } from "reduxsauce"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./inviteActions"
import { InviteFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"

/* ------------- Initial UserRedux ------------- */
export interface InviteRedux {
  createInvite: PromiseState<InviteFormValues, string>
  deleteInvite: PromiseState<void, string>
  inviteList: PromiseState<InviteFormValues[], string>
}

export const INITIAL_STATE: InviteRedux = {
  createInvite: { ...createPromiseState<InviteFormValues, string>() },
  deleteInvite: { ...createPromiseState<void, string>() },
  inviteList: { ...createPromiseState<InviteFormValues[], string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<InviteRedux>(
    types.CREATE_INVITE,
    INITIAL_STATE,
    "createInvite"
  ),
  ...createNestedReducer<InviteRedux>(
    types.DELETE_INVITE,
    INITIAL_STATE,
    "deleteInvite"
  ),
  ...createNestedReducer<InviteRedux>(
    types.GET_INVITE_LIST,
    INITIAL_STATE,
    "inviteList"
  ),
})
