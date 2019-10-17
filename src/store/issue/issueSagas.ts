import { AxiosRequestConfig } from "axios"
import * as objectToFormdata from "object-to-formdata"
import { call, put, takeLatest } from "redux-saga/effects"
import { ActionType } from "typesafe-actions"

import { api } from "../../services/api"
import { Issue, IssueDetails } from "../../types/issue"
import { LoaderImage } from "../../types/loaderImage"
import { CreateIssue } from "../../types/request/createIssue"
import { UpdateIssue } from "../../types/request/updateIssue"

import {
  createIssueActions,
  getBacklogIssuesActions,
  getIssueActions,
  getIssueListActions,
  types,
  updateIssueActions,
  updateIssueSprintActions,
  updateIssueStatusActions,
} from "./issueActions"

function* getIssueListFlow(
  action: ActionType<typeof getIssueListActions.getIssueListRequest>
) {
  try {
    const { projectId, sprintId, lastSprint } = action.payload

    const requestConfig: AxiosRequestConfig = {
      params: {
        projectId,
        ...(lastSprint && { lastSprint }),
      },
    }

    const { data } = yield call(
      api.issues.getIssueListWithSprintId,
      sprintId,
      requestConfig
    )

    const issueListResponse = data as Issue[]

    yield put(getIssueListActions.getIssueListSuccess(issueListResponse))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getIssueListActions.getIssueListFailure(error.message))
  }
}

function* createIssueFlow(
  action: ActionType<typeof createIssueActions.createIssueRequest>
) {
  try {
    const { issue: issueFormValues, projectId, sprintId } = action.payload

    const attachment = issueFormValues.attachment.map(
      (image: LoaderImage) => image.file!
    )

    const createIssueBody: CreateIssue = {
      ...issueFormValues,
      attachment,
      projectId,
      sprintId,
    }

    const formData = objectToFormdata({ ...createIssueBody }, { nulls: false })

    yield call(api.issues.createIssue, formData)

    yield put(createIssueActions.createIssueSuccess())
    yield put(getIssueListActions.getIssueListRequest(projectId, sprintId))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(createIssueActions.createIssueFailure(error.message))
  }
}

function* updateIssueFlow(
  action: ActionType<typeof updateIssueActions.updateIssueRequest>
) {
  try {
    const { issue: issueFormValues, issueId } = action.payload

    const attachments = issueFormValues.attachment

    const attachmentUrls = attachments
      .filter((attachment) => !attachment.file)
      .map((attachment) => attachment.previewUrl!)

    const attachmentBody = attachments
      .filter((attachment) => attachment.file)
      .map((attachment) => attachment.file!)

    const updateIssueBody: UpdateIssue = {
      ...issueFormValues,
      attachmentUrls,
      attachment: attachmentBody,
      id: issueId,
    }

    const formData = objectToFormdata({ ...updateIssueBody }, { nulls: false })

    const { data } = yield call(api.issues.updateIssue, formData)

    yield put(updateIssueActions.updateIssueSuccess())
    const updatedIssue = data as Issue

    if (updatedIssue.sprintId) {
      yield put(
        getIssueListActions.getIssueListRequest(
          updatedIssue.projectId,
          updatedIssue.sprintId
        )
      )
    } else {
      yield put(
        getBacklogIssuesActions.getBacklogIssuesRequest(updatedIssue.projectId)
      )
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(updateIssueActions.updateIssueFailure(error.message))
  }
}

function* getIssueFlow(
  action: ActionType<typeof getIssueActions.getIssueRequest>
) {
  try {
    const { issueId } = action.payload

    const { data } = yield call(api.issues.getIssue, issueId)

    const issueResponse = data as IssueDetails

    yield put(getIssueActions.getIssueSuccess(issueResponse))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getIssueActions.getIssueFailure(error.message))
  }
}

function* updateIssueStatusFlow(
  action: ActionType<typeof updateIssueStatusActions.updateIssueStatusRequest>
) {
  try {
    const { issueId, statusId } = action.payload

    yield put(
      updateIssueStatusActions.updateIssueStatusOptimisticChange(
        issueId,
        statusId
      )
    )

    yield call(api.issues.updateIssueStatus, issueId, statusId)

    yield put(updateIssueStatusActions.updateIssueStatusSuccess())
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    const { issueId, prevStatusId } = action.payload
    yield put(
      updateIssueStatusActions.updateIssueStatusFailure(issueId, prevStatusId)
    )

    alert("Please, check internet connection.")
  }
}

function* getBacklogIssueListFlow(
  action: ActionType<typeof getBacklogIssuesActions.getBacklogIssuesRequest>
) {
  try {
    const { projectId } = action.payload

    const { data } = yield call(api.projects.getBacklogIssues, projectId)

    const issueListResponse = data as Issue[]

    yield put(
      getBacklogIssuesActions.getBacklogIssuesSuccess(issueListResponse)
    )
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(getBacklogIssuesActions.getBacklogIssuesFailure(error.message))
  }
}

function* updateIssueSprintFlow(
  action: ActionType<typeof updateIssueSprintActions.updateIssueSprintRequest>
) {
  try {
    const { issueId, sprintId, projectId, requestType } = action.payload

    const body = requestType === "toSprint" ? sprintId : null

    yield call(api.issues.updateIssueSprint, issueId, body)

    yield put(updateIssueSprintActions.updateIssueSprintSuccess())
    yield put(getBacklogIssuesActions.getBacklogIssuesRequest(projectId))
    yield put(getIssueListActions.getIssueListRequest(projectId, sprintId))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error.message)
    yield put(updateIssueSprintActions.updateIssueSprintFailure(error.message))
  }
}

function* issueSaga() {
  yield takeLatest(types.GET_ISSUE_LIST.REQUEST, getIssueListFlow)
  yield takeLatest(types.CREATE_ISSUE.REQUEST, createIssueFlow)
  yield takeLatest(types.UPDATE_ISSUE.REQUEST, updateIssueFlow)
  yield takeLatest(types.GET_ISSUE.REQUEST, getIssueFlow)
  yield takeLatest(types.GET_BACKLOG_ISSUES.REQUEST, getBacklogIssueListFlow)
  yield takeLatest(types.UPDATE_ISSUE_STATUS.REQUEST, updateIssueStatusFlow)
  yield takeLatest(types.UPDATE_ISSUE_SPRINT.REQUEST, updateIssueSprintFlow)
}

export { issueSaga }
