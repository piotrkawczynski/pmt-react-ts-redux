import { createReducer } from "reduxsauce"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { types } from "./projectActions"
import { Project } from "../../types/project"

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
})
