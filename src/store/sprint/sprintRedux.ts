import { createReducer } from "reduxsauce"
import { Sprint } from "../../types/sprint"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./sprintActions"

/* ------------- Initial UserRedux ------------- */
export interface SprintRedux {
  sprintList: PromiseState<Sprint[], string>
}

export const INITIAL_STATE: SprintRedux = {
  sprintList: { ...createPromiseState<Sprint[], string>() },
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
})
