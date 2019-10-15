import { takeLatest, call, put, select } from "redux-saga/effects"
import {
  updateApiHeader,
  types,
  loginActions,
  registerActions,
  setUserLoggedIn,
  getUserListActions,
  remainPasswordActions,
  changePasswordActions,
} from "./userActions"
import { ActionType } from "typesafe-actions"
import { userSelector } from "./userRedux"
import history from "../../utilities/history"
import { api, updateApiHeaders } from "../../services/api"
import { User } from "../../types/user"

function* updateApiHeaderFlow() {
  try {
    const token = yield select(userSelector.token)

    if (token) {
      yield call(updateApiHeaders, token)
      yield put(setUserLoggedIn())
    }
  } catch (error) {
    console.log(error)
  }
}

function* registerUserFlow(
  action: ActionType<typeof registerActions.registerRequest>
) {
  const { formikActions, values } = action.payload
  try {
    yield call(api.auth.register, values)

    yield put(updateApiHeader())
    yield put(registerActions.registerSuccess())

    history.push("/login")
  } catch (error) {
    const { errors } = error.response.data
    Object.keys(errors).map((error) =>
      formikActions.setFieldError(error, errors[error])
    )

    yield put(registerActions.registerFailure(error.message))
  }
}

function* loginUserFlow(action: ActionType<typeof loginActions.loginRequest>) {
  const { formikActions, values } = action.payload
  try {
    const { data } = yield call(api.auth.login, values)

    yield put(updateApiHeader())
    yield put(loginActions.loginSuccess(data))
  } catch (error) {
    const { errors } = error.response.data
    Object.keys(errors).map((error) =>
      formikActions.setFieldError(error, errors[error])
    )

    yield put(loginActions.loginFailure(error.message))
  }
}

function* getUserListFlow(
  action: ActionType<typeof getUserListActions.getUserListRequest>
) {
  try {
    const response = yield call(api.users.getUserList, action.payload.projectId)

    const userList = response.data as User[]

    yield put(getUserListActions.getUserListSuccess(userList))
  } catch (error) {
    console.error(error.message)
    yield put(getUserListActions.getUserListFailure(error.message))
  }
}

function* remainPasswordFlow(
  action: ActionType<typeof remainPasswordActions.remainPasswordRequest>
) {
  try {
    yield call(api.auth.remainPassword, action.payload.email)

    yield put(remainPasswordActions.remainPasswordSuccess())
    history.push("/login")
  } catch (error) {
    console.error(error.message)
    yield put(remainPasswordActions.remainPasswordFailure(error.message))
  }
}

function* changePasswordFlow(
  action: ActionType<typeof changePasswordActions.changePasswordRequest>
) {
  try {
    const { changePasswordValues, token } = action.payload

    yield call(api.auth.changePassword, changePasswordValues, token)

    yield put(changePasswordActions.changePasswordSuccess())
    history.push("/login")
  } catch (error) {
    console.error(error.message)
    yield put(changePasswordActions.changePasswordFailure(error.message))
  }
}

function* userSaga() {
  yield takeLatest(types.UPDATE_API_HEADER, updateApiHeaderFlow)
  yield takeLatest(types.LOGIN.REQUEST, loginUserFlow)
  yield takeLatest(types.REGISTER.REQUEST, registerUserFlow)
  yield takeLatest(types.GET_USER_LIST.REQUEST, getUserListFlow)
  yield takeLatest(types.REMAIN_PASSWORD.REQUEST, remainPasswordFlow)
  yield takeLatest(types.CHANGE_PASSWORD.REQUEST, changePasswordFlow)
}

export { userSaga }
