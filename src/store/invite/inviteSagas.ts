import { takeLatest, call, put } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { api } from "../../services/api"
import {
  types,
  createInviteActions,
  deleteInviteActions,
  getInviteListActions,
} from "./inviteActions"
import { InviteFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"

function* createInviteFlow(
  action: ActionType<typeof createInviteActions.createInviteRequest>
) {
  try {
    const { projectId, invite, setValues } = action.payload

    const { data } = yield call(api.invites.createInvite, {
      projectId,
      email: invite.email,
      permissionId: Number(invite.permission),
    })

    const createdInvite: InviteFormValues = {
      id: data.id,
      email: data.email,
      permission: data.permissionId,
    }

    yield put(createInviteActions.createInviteSuccess(createdInvite))
    yield call(setValues)
  } catch (error) {
    console.error(error.message)
    yield put(createInviteActions.createInviteFailure(error.message))
  }
}

function* deleteInviteFlow(
  action: ActionType<typeof deleteInviteActions.deleteInviteRequest>
) {
  try {
    const { id, setValues } = action.payload

    yield call(api.invites.deleteInvite, id)

    yield put(deleteInviteActions.deleteInviteSuccess())
    yield call(setValues)
    setValues()
  } catch (error) {
    console.error(error.message)
    yield put(deleteInviteActions.deleteInviteFailure(error.message))
  }
}

interface InviteListResponse {
  id: number
  email: string
  permissionId: number
}

function* getInviteListFlow(
  action: ActionType<typeof getInviteListActions.getInviteListRequest>
) {
  try {
    const { projectId } = action.payload

    const { data } = yield call(api.invites.getInviteList, projectId)

    const inviteListResponse = data as InviteListResponse[]

    const inviteList: InviteFormValues[] = inviteListResponse.map(
      ({ id, email, permissionId }) => ({
        id: id,
        email: email,
        permission: permissionId.toString(),
      })
    )

    yield put(getInviteListActions.getInviteListSuccess(inviteList))
  } catch (error) {
    console.error(error.message)
    yield put(getInviteListActions.getInviteListFailure(error.message))
  }
}

function* inviteSaga() {
  yield takeLatest(types.CREATE_INVITE.REQUEST, createInviteFlow)
  yield takeLatest(types.DELETE_INVITE.REQUEST, deleteInviteFlow)
  yield takeLatest(types.GET_INVITE_LIST.REQUEST, getInviteListFlow)
}

export { inviteSaga }
