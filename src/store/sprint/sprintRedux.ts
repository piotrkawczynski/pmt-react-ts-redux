import { createReducer } from "reduxsauce"
import { Sprint } from "../../types/sprint"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types as userTypes } from "../user/userActions"
import { types } from "./sprintActions"

/* ------------- Initial UserRedux ------------- */
export interface SprintRedux {
  sprintList: PromiseState<Sprint[], string>
  createSprint: PromiseState<void, string>
  updateSprint: PromiseState<Sprint, string>
  deleteSprint: PromiseState<void, string>
}

export const INITIAL_STATE: SprintRedux = {
  sprintList: { ...createPromiseState<Sprint[], string>() },
  createSprint: { ...createPromiseState<void, string>() },
  updateSprint: { ...createPromiseState<Sprint, string>() },
  deleteSprint: { ...createPromiseState<void, string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<SprintRedux>(
    types.GET_SPRINT_LIST,
    INITIAL_STATE,
    "sprintList"
  ),
  ...createNestedReducer<SprintRedux>(
    types.CREATE_SPRINT,
    INITIAL_STATE,
    "createSprint"
  ),
  ...createNestedReducer<SprintRedux>(
    types.UPDATE_SPRINT,
    INITIAL_STATE,
    "updateSprint"
  ),
  ...createNestedReducer<SprintRedux>(
    types.DELETE_SPRINT,
    INITIAL_STATE,
    "deleteSprint"
  ),

  [userTypes.LOGOUT_USER]: () => INITIAL_STATE,
})
