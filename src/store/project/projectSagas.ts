import * as objectToFormdata from "object-to-formdata"
import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { api } from "../../services/api"
import {
  createProjectActions,
  projectListActions,
  types,
} from "./projectActions"

function* projectListFlow() {
  try {
    const { data } = yield call(api.projects.getProjectList)

    yield put(projectListActions.projectListSuccess(data))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(projectListActions.projectListFailure(error.message))
  }
}

function* createProjectFlow(
  action: ActionType<typeof createProjectActions.createProjectRequest>
) {
  try {
    const { project } = action.payload

    const formData = objectToFormdata(project, { nulls: false })

    // const formData = new FormData()
    // for (let i = 0; i < action.payload.tags.length; i++) {
    //   formData.append(`tag[${i}].name`, action.payload.tags[i].name)
    //
    //   const file = action.payload.tags[i].image
    //
    //   if (file) {
    //     formData.append(`image`, file)
    //   }
    // }

    yield call(api.projects.createProject, formData)

    // yield put(projectListActions.projectListSuccess(data))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(projectListActions.projectListFailure(error.message))
  }
}

function* projectSaga() {
  yield takeLatest(types.PROJECT_LIST.REQUEST, projectListFlow)
  yield takeLatest(types.CREATE_PROJECT.REQUEST, createProjectFlow)
}

export { projectSaga }
