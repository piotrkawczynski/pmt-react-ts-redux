import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { api } from "../../services/api"
import { Sprint } from "../../types/sprint"
import { getSprintListActions, types } from "./sprintActions"

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

    const inviteList: Sprint[] = sprintListResponse.map(
      ({ dateFrom, dateTo, ...sprint }) => ({
        ...sprint,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      })
    )

    yield put(getSprintListActions.getSprintListSuccess(inviteList))
  } catch (error) {
    console.error(error.message)
    yield put(getSprintListActions.getSprintListFailure(error.message))
  }
}

function* sprintSaga() {
  yield takeLatest(types.GET_SPRINT_LIST.REQUEST, getSprintListFlow)
}

export { sprintSaga }
