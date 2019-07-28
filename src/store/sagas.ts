import { all } from "redux-saga/effects"
import { userSaga } from "./user/userSagas"

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([userSaga()])
}
