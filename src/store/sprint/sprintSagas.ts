import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { api } from "../../services/api"
import { Sprint } from "../../types/sprint"
import {
  getBacklogIssuesActions,
  getIssueListActions,
} from "../issue/issueActions"
import {
  createSprintActions,
  deleteSprintActions,
  getSprintListActions,
  types,
  updateSprintActions,
} from "./sprintActions"

interface SprintListResponse {
  id: number
  numb: number
  description: string
  dateFrom: string
  dateTo: string
}

function* getSprintListFlow(
  action: ActionType<typeof getSprintListActions.getSprintListRequest>
) {
  try {
    const { projectId } = action.payload

    const { data } = yield call(api.sprints.getSprintList, projectId)

    const sprintListResponse = data as SprintListResponse[]

    const sprintList: Sprint[] = sprintListResponse.map(
      ({ dateFrom, dateTo, ...sprint }) => ({
        ...sprint,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      })
    )

    yield put(getSprintListActions.getSprintListSuccess(sprintList))
    if (!!sprintList.length) {
      const lastSprintId = sprintList[sprintList.length - 1].id
      yield put(
        getIssueListActions.getIssueListRequest(projectId, lastSprintId)
      )
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getSprintListActions.getSprintListFailure(error.message))
  }
}

function* createSprintFlow(
  action: ActionType<typeof createSprintActions.createSprintRequest>
) {
  try {
    const { projectId, createIssueFormValues } = action.payload

    yield call(api.sprints.createSprint, createIssueFormValues, projectId)

    yield put(createSprintActions.createSprintSuccess())
    yield put(getSprintListActions.getSprintListRequest(projectId))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(createSprintActions.createSprintFailure(error.message))
  }
}

function* updateSprintFlow(
  action: ActionType<typeof updateSprintActions.updateSprintRequest>
) {
  try {
    const { projectId, sprintId, createIssueFormValues } = action.payload

    const { data } = yield call(
      api.sprints.updateSprint,
      createIssueFormValues,
      sprintId
    )

    const sprint: Sprint = {
      ...data,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
    }

    yield put(updateSprintActions.updateSprintSuccess(sprint))
    yield put(getSprintListActions.getSprintListRequest(projectId))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(updateSprintActions.updateSprintFailure(error.message))
  }
}

function* deleteSprintFlow(
  action: ActionType<typeof deleteSprintActions.deleteSprintRequest>
) {
  try {
    const { projectId, sprintId } = action.payload

    yield call(api.sprints.deleteSprint, sprintId)

    yield put(deleteSprintActions.deleteSprintSuccess())
    yield put(getSprintListActions.getSprintListRequest(projectId))
    yield put(getBacklogIssuesActions.getBacklogIssuesRequest(projectId))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(deleteSprintActions.deleteSprintFailure(error.message))
  }
}

function* sprintSaga() {
  yield takeLatest(types.GET_SPRINT_LIST.REQUEST, getSprintListFlow)
  yield takeLatest(types.CREATE_SPRINT.REQUEST, createSprintFlow)
  yield takeLatest(types.UPDATE_SPRINT.REQUEST, updateSprintFlow)
  yield takeLatest(types.DELETE_SPRINT.REQUEST, deleteSprintFlow)
}

export { sprintSaga }
