import { createReducer } from "reduxsauce"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./statusActions"
import { StatusFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"

export interface Status {
  id: number
  name: string
  order: number
}

/* ------------- Initial UserRedux ------------- */
export interface StatusRedux {
  createStatus: PromiseState<StatusFormValues, string>
  updateStatusOrder: PromiseState<void, string>
  deleteStatus: PromiseState<void, string>
  statusList: PromiseState<Status[], string>
}

export const INITIAL_STATE: StatusRedux = {
  createStatus: { ...createPromiseState<StatusFormValues, string>() },
  updateStatusOrder: { ...createPromiseState<void, string>() },
  deleteStatus: { ...createPromiseState<void, string>() },
  statusList: { ...createPromiseState<Status[], string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<StatusRedux>(
    types.CREATE_STATUS,
    INITIAL_STATE,
    "createStatus"
  ),
  ...createNestedReducer<StatusRedux>(
    types.UPDATE_STATUS_ORDER,
    INITIAL_STATE,
    "updateStatusOrder"
  ),
  ...createNestedReducer<StatusRedux>(
    types.DELETE_STATUS,
    INITIAL_STATE,
    "deleteStatus"
  ),
  ...createNestedReducer<StatusRedux>(
    types.GET_STATUS_LIST,
    INITIAL_STATE,
    "statusList"
  ),
})
