import { all } from "redux-saga/effects"

/* ------------- Sagas ------------- */
import { commentSaga } from "./comment/commentSagas"
import { inviteSaga } from "./invite/inviteSagas"
import { issueSaga } from "./issue/issueSagas"
import { permissionSaga } from "./permission/permissionSagas"
import { projectSaga } from "./project/projectSagas"
import { sprintSaga } from "./sprint/sprintSagas"
import { statusSaga } from "./status/statusSagas"
import { tagSaga } from "./tag/tagSagas"
import { userSaga } from "./user/userSagas"

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    userSaga(),
    projectSaga(),
    tagSaga(),
    statusSaga(),
    inviteSaga(),
    permissionSaga(),
    sprintSaga(),
    issueSaga(),
    commentSaga(),
  ])
}
