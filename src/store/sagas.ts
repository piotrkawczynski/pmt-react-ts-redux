import { all } from "redux-saga/effects"

/* ------------- Sagas ------------- */
import { userSaga } from "./user/userSagas"
import { projectSaga } from "./project/projectSagas"
import { tagSaga } from "./tag/tagSagas"
import { statusSaga } from "./status/statusSagas"
import { inviteSaga } from "./invite/inviteSagas"
import { permissionSaga } from "./permission/permissionSagas"

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    userSaga(),
    projectSaga(),
    tagSaga(),
    statusSaga(),
    inviteSaga(),
    permissionSaga(),
  ])
}
