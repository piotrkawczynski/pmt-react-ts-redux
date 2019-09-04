import { takeLatest, call, put } from "redux-saga/effects"
import { api } from "../../services/api"
import { types, getPermissionListActions } from "./permissionActions"
import { Permission } from "../../types/permission"

function* getPermissionListFlow() {
  try {
    const { data } = yield call(api.permissions.getPermissionList)

    yield put(
      getPermissionListActions.getPermissionListSuccess(data as Permission[])
    )
  } catch (error) {
    console.error(error.message)
    yield put(getPermissionListActions.getPermissionListFailure(error.message))
  }
}

function* permissionSaga() {
  yield takeLatest(types.GET_PERMISSION_LIST.REQUEST, getPermissionListFlow)
}

export { permissionSaga }
