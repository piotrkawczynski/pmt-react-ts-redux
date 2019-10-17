import { CreateProjectPageFormValues } from "../../pages/CreateProjectPage/CreateProjectPage"
import { Project } from "../../types/project"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const PROJECT_LIST = createPromiseType("PROJECT_LIST")
const CREATE_PROJECT = createPromiseType("CREATE_PROJECT")

export const types = { PROJECT_LIST, CREATE_PROJECT }

/* ------------- Action Creators ------------- */

const projectListRequest = () => ({
  type: PROJECT_LIST.REQUEST,
})

const projectListSuccess = (project: Project[]) => ({
  type: PROJECT_LIST.SUCCESS,
  payload: project,
})

const projectListFailure = (error: string) => ({
  type: PROJECT_LIST.FAILURE,
  error,
})

const createProjectRequest = (project: CreateProjectPageFormValues) => ({
  type: CREATE_PROJECT.REQUEST,
  payload: { project },
})

const createProjectSuccess = () => ({
  type: CREATE_PROJECT.SUCCESS,
})

const createProjectFailure = (error: string) => ({
  type: CREATE_PROJECT.FAILURE,
  error,
})

export const projectListActions = {
  projectListRequest,
  projectListSuccess,
  projectListFailure,
}

export const createProjectActions = {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
}
