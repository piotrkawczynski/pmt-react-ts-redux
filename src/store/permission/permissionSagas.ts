import { call, put, takeLatest } from "redux-saga/effects"
import { api } from "../../services/api"
import { Permission } from "../../types/permission"

import { getPermissionListActions, types } from "./permissionActions"

function* getPermissionListFlow() {
  try {
    const { data } = yield call(api.permissions.getPermissionList)

    yield put(
      getPermissionListActions.getPermissionListSuccess(data as Permission[])
    )
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getPermissionListActions.getPermissionListFailure(error.message))
  }
}

function* permissionSaga() {
  yield takeLatest(types.GET_PERMISSION_LIST.REQUEST, getPermissionListFlow)
}

export { permissionSaga }
