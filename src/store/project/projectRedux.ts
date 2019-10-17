import { createReducer } from "reduxsauce"
import { Project } from "../../types/project"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types as userTypes } from "../user/userActions"
import { types } from "./projectActions"

/* ------------- Initial UserRedux ------------- */
export interface ProjectRedux {
  projectList: PromiseState<Project[], string>
  createProject: PromiseState<void, string>
}

export const INITIAL_STATE: ProjectRedux = {
  projectList: { ...createPromiseState<Project[], string>() },
  createProject: { ...createPromiseState<void, string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<ProjectRedux>(
    types.PROJECT_LIST,
    INITIAL_STATE,
    "projectList"
  ),
  ...createNestedReducer<ProjectRedux>(
    types.CREATE_PROJECT,
    INITIAL_STATE,
    "createProject"
  ),

  [userTypes.LOGOUT_USER]: () => INITIAL_STATE,
})
