import * as objectToFormdata from "object-to-formdata"
import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"
import { TagFormValues } from "../../pages/FulfillProjectPage/FulfillProjectPage"
import { api } from "../../services/api"
import {
  createTagActions,
  deleteTagActions,
  getTagListActions,
  types,
} from "./tagActions"
import { Tag } from "./tagRedux"

function* createTagFlow(
  action: ActionType<typeof createTagActions.createTagRequest>
) {
  try {
    const { projectId, tag, setValues } = action.payload

    const formData = objectToFormdata({ ...tag, projectId }, { nulls: false })

    const { data } = yield call(api.tags.createTag, formData)

    const createdTag: TagFormValues = {
      id: data.id,
      name: data.name,
      image: data.image,
    }
    //
    yield put(createTagActions.createTagSuccess(createdTag))
    setValues()
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
    yield put(createTagActions.createTagFailure(error.message))
  }
}

function* deleteTagFlow(
  action: ActionType<typeof deleteTagActions.deleteTagRequest>
) {
  try {
    const { id, setValues } = action.payload

    yield call(api.tags.deleteTag, id)

    yield put(deleteTagActions.deleteTagSuccess())
    yield call(setValues)
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
    yield put(deleteTagActions.deleteTagFailure(error.message))
  }
}

function* getTagListFlow(
  action: ActionType<typeof getTagListActions.getTagListRequest>
) {
  try {
    const { projectId } = action.payload

    const { data } = yield call(api.tags.getTagList, projectId)

    yield put(getTagListActions.getTagListSuccess(data as Tag[]))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getTagListActions.getTagListFailure(error.message))
  }
}

function* tagSaga() {
  yield takeLatest(types.CREATE_TAG.REQUEST, createTagFlow)
  yield takeLatest(types.DELETE_TAG.REQUEST, deleteTagFlow)
  yield takeLatest(types.GET_TAG_LIST.REQUEST, getTagListFlow)
}

export { tagSaga }
