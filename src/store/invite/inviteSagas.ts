import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { InviteFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"
import { api } from "../../services/api"
import {
  createInviteActions,
  deleteInviteActions,
  getInviteListActions,
  types,
} from "./inviteActions"

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
    // tslint:disable-next-line:no-console
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
    // tslint:disable-next-line:no-console
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
        id,
        email,
        permission: permissionId.toString(),
      })
    )

    yield put(getInviteListActions.getInviteListSuccess(inviteList))
  } catch (error) {
    // tslint:disable-next-line:no-console
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
