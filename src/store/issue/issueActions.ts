import { CreateIssueFormValues } from "../../components/CreateIssueModal/CreateIssueModal"
import { UpdateIssueFormValues } from "../../components/UpdateIssueModal/UpdateIssueModal"
import { Issue, IssueDetails } from "../../types/issue"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const GET_ISSUE_LIST = createPromiseType("GET_ISSUE_LIST")
const GET_ISSUE = createPromiseType("GET_ISSUE")
const CREATE_ISSUE = createPromiseType("CREATE_ISSUE")
const UPDATE_ISSUE = createPromiseType("UPDATE_ISSUE")
const UPDATE_ISSUE_SPRINT = createPromiseType("UPDATE_ISSUE_SPRINT")
const UPDATE_ISSUE_STATUS = {
  ...createPromiseType("UPDATE_ISSUE_STATUS"),
  OPTIMISTIC_CHANGE: "OPTIMISTIC_CHANGE",
}
const GET_BACKLOG_ISSUES = createPromiseType("GET_BACKLOG_ISSUES")

export const types = {
  GET_ISSUE_LIST,
  CREATE_ISSUE,
  UPDATE_ISSUE,
  GET_ISSUE,
  UPDATE_ISSUE_STATUS,
  UPDATE_ISSUE_SPRINT,
  GET_BACKLOG_ISSUES,
}

/* ------------- Action Creators ------------- */

const getIssueListInit = () => ({
  type: GET_ISSUE_LIST.INIT,
})

const getIssueListRequest = (
  projectId: number,
  sprintId: number,
  lastSprint?: boolean
) => ({
  type: GET_ISSUE_LIST.REQUEST,
  payload: {
    projectId,
    sprintId,
    lastSprint,
  },
})

const getIssueListSuccess = (issueList: Issue[]) => ({
  type: GET_ISSUE_LIST.SUCCESS,
  payload: issueList,
})

const getIssueListFailure = (error: string) => ({
  type: GET_ISSUE_LIST.FAILURE,
  error,
})

export const getIssueListActions = {
  getIssueListInit,
  getIssueListRequest,
  getIssueListSuccess,
  getIssueListFailure,
}

const createIssueInit = () => ({
  type: CREATE_ISSUE.INIT,
})

const createIssueRequest = (
  issue: CreateIssueFormValues,
  projectId: number,
  sprintId: number
) => ({
  type: CREATE_ISSUE.REQUEST,
  payload: { issue, projectId, sprintId },
})

const createIssueSuccess = () => ({
  type: CREATE_ISSUE.SUCCESS,
})

const createIssueFailure = (error: string) => ({
  type: CREATE_ISSUE.FAILURE,
  error,
})

export const createIssueActions = {
  createIssueInit,
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
}

const updateIssueInit = () => ({
  type: UPDATE_ISSUE.INIT,
})

const updateIssueRequest = (issue: UpdateIssueFormValues, issueId: number) => ({
  type: UPDATE_ISSUE.REQUEST,
  payload: { issue, issueId },
})

const updateIssueSuccess = () => ({
  type: UPDATE_ISSUE.SUCCESS,
})

const updateIssueFailure = (error: string) => ({
  type: UPDATE_ISSUE.FAILURE,
  error,
})

export const updateIssueActions = {
  updateIssueInit,
  updateIssueRequest,
  updateIssueSuccess,
  updateIssueFailure,
}

const getIssueInit = () => ({
  type: GET_ISSUE.INIT,
})

const getIssueRequest = (issueId: number) => ({
  type: GET_ISSUE.REQUEST,
  payload: { issueId },
})

const getIssueSuccess = (issue: IssueDetails) => ({
  type: GET_ISSUE.SUCCESS,
  payload: issue,
})

const getIssueFailure = (error: string) => ({
  type: GET_ISSUE.FAILURE,
  error,
})

export const getIssueActions = {
  getIssueInit,
  getIssueRequest,
  getIssueSuccess,
  getIssueFailure,
}

const updateIssueStatusInit = () => ({
  type: UPDATE_ISSUE_STATUS.INIT,
})

const updateIssueStatusRequest = (
  issueId: number,
  prevStatusId: number,
  statusId: number
) => ({
  type: UPDATE_ISSUE_STATUS.REQUEST,
  payload: {
    issueId,
    prevStatusId,
    statusId,
  },
})

const updateIssueStatusOptimisticChange = (
  issueId: number,
  statusId: number
) => ({
  type: UPDATE_ISSUE_STATUS.OPTIMISTIC_CHANGE,
  payload: {
    issueId,
    statusId,
  },
})

const updateIssueStatusSuccess = () => ({
  type: UPDATE_ISSUE_STATUS.SUCCESS,
})

const updateIssueStatusFailure = (issueId: number, statusId: number) => ({
  type: UPDATE_ISSUE_STATUS.FAILURE,
  payload: {
    issueId,
    statusId,
  },
})

export const updateIssueStatusActions = {
  updateIssueStatusInit,
  updateIssueStatusRequest,
  updateIssueStatusOptimisticChange,
  updateIssueStatusSuccess,
  updateIssueStatusFailure,
}

const updateIssueSprintInit = () => ({
  type: UPDATE_ISSUE_SPRINT.INIT,
})

const updateIssueSprintRequest = (
  issueId: number,
  sprintId: number,
  projectId: number,
  requestType: "toSprint" | "toBacklog"
) => ({
  type: UPDATE_ISSUE_SPRINT.REQUEST,
  payload: {
    issueId,
    sprintId,
    projectId,
    requestType,
  },
})

const updateIssueSprintSuccess = () => ({
  type: UPDATE_ISSUE_SPRINT.SUCCESS,
})

const updateIssueSprintFailure = (error: string) => ({
  type: UPDATE_ISSUE_SPRINT.FAILURE,
  error,
})

export const updateIssueSprintActions = {
  updateIssueSprintInit,
  updateIssueSprintRequest,
  updateIssueSprintSuccess,
  updateIssueSprintFailure,
}

const getBacklogIssuesInit = () => ({
  type: GET_BACKLOG_ISSUES.INIT,
})

const getBacklogIssuesRequest = (projectId: number) => ({
  type: GET_BACKLOG_ISSUES.REQUEST,
  payload: {
    projectId,
  },
})

const getBacklogIssuesSuccess = (issueList: Issue[]) => ({
  type: GET_BACKLOG_ISSUES.SUCCESS,
  payload: issueList,
})

const getBacklogIssuesFailure = (error: string) => ({
  type: GET_BACKLOG_ISSUES.FAILURE,
  error,
})

export const getBacklogIssuesActions = {
  getBacklogIssuesInit,
  getBacklogIssuesRequest,
  getBacklogIssuesSuccess,
  getBacklogIssuesFailure,
}
