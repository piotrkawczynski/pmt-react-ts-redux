import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"

import { StatusFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"
import { api } from "../../services/api"

import {
  createStatusActions,
  deleteStatusActions,
  getStatusListActions,
  types,
  updateStatusOrderActions,
} from "./statusActions"
import { Status } from "./statusRedux"

function* createStatusFlow(
  action: ActionType<typeof createStatusActions.createStatusRequest>
) {
  try {
    const { projectId, status, setValues } = action.payload

    const { data } = yield call(api.statuses.createStatus, {
      projectId,
      ...status,
    })

    const createdStatus = data as StatusFormValues

    yield put(createStatusActions.createStatusSuccess(createdStatus))
    setValues()
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(createStatusActions.createStatusFailure(error.message))
  }
}

function* updateStatusOrderFlow(
  action: ActionType<typeof updateStatusOrderActions.updateStatusOrderRequest>
) {
  try {
    const { firstStatus, secondStatus } = action.payload

    yield call(api.statuses.updateStatusOrder, {
      firstStatus,
      secondStatus,
    })

    yield put(updateStatusOrderActions.updateStatusOrderSuccess())
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(updateStatusOrderActions.updateStatusOrderFailure(error.message))
  }
}

function* deleteStatusFlow(
  action: ActionType<typeof deleteStatusActions.deleteStatusRequest>
) {
  try {
    const { id, setValues } = action.payload

    yield call(api.statuses.deleteStatus, id)

    yield put(deleteStatusActions.deleteStatusSuccess())
    yield call(setValues)
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(deleteStatusActions.deleteStatusFailure(error.message))
  }
}

function* getStatusListFlow(
  action: ActionType<typeof getStatusListActions.getStatusListRequest>
) {
  try {
    const { projectId } = action.payload

    const { data } = yield call(api.statuses.getStatusList, projectId)

    yield put(getStatusListActions.getStatusListSuccess(data as Status[]))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getStatusListActions.getStatusListFailure(error.message))
  }
}

function* statusSaga() {
  yield takeLatest(types.CREATE_STATUS.REQUEST, createStatusFlow)
  yield takeLatest(types.UPDATE_STATUS_ORDER.REQUEST, updateStatusOrderFlow)
  yield takeLatest(types.DELETE_STATUS.REQUEST, deleteStatusFlow)
  yield takeLatest(types.GET_STATUS_LIST.REQUEST, getStatusListFlow)
}

export { statusSaga }
