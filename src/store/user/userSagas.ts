import { takeLatest, call, put } from "redux-saga/effects"
import { updateApiHeader, types, loginActions } from "./userActions"
import { ActionType } from "typesafe-actions"
import { api } from "../../services/api"

function* updateApiHeaderFlow(action: ActionType<typeof updateApiHeader>) {
  try {
    // const user = yield select(UserSelector.user)

    // if (user) {
    //   const { token } = user
    //   yield call(updateApiHeaders, token)
    // }

    yield console.log("UpdateApiHeaderSaga")
  } catch (error) {
    console.log(error)
  }
}

function* loginUserFlow(action: ActionType<typeof loginActions.loginRequest>) {
  const { formikActions } = action.payload
  try {
    const { data, errors } = yield call(api.post, "/auth/login", action.payload)

    yield put(loginActions.loginSuccess(data))

    yield console.log("loginUserFlow")
  } catch (error) {

    const { errors } = error.response.data
    Object.keys(errors).map((error) =>
      formikActions.setFieldError(error, errors[error])
    )
  }
}

function* userSaga() {
  yield takeLatest(types.UPDATE_API_HEADER, updateApiHeaderFlow)
  yield takeLatest(types.LOGIN.REQUEST, loginUserFlow)
}

export { userSaga }
