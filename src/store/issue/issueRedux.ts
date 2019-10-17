import { createReducer } from "reduxsauce"

import produce from "immer"
import { groupBy } from "lodash"
import { ActionType } from "typesafe-actions"
import { Issue, IssueDetails } from "../../types/issue"
import {
  createNestedReducer,
  createPromiseState,
  PromiseState,
} from "../../utilities/ReduxFunctions"
import { ApplicationState } from "../redux"
import { types as userTypes } from "../user/userActions"
import { types, updateIssueStatusActions } from "./issueActions"

/* ------------- Initial UserRedux ------------- */
export interface IssueRedux {
  issueList: PromiseState<Issue[], string>
  backlogIssueList: PromiseState<Issue[], string>
  createIssue: PromiseState<void, string>
  updateIssue: PromiseState<void, string>
  issue: PromiseState<IssueDetails, string>
  updateIssueStatus: PromiseState<void, string>
  updateIssueSprint: PromiseState<void, string>
}

export const INITIAL_STATE: IssueRedux = {
  issueList: { ...createPromiseState<Issue[], string>() },
  backlogIssueList: { ...createPromiseState<Issue[], string>() },
  createIssue: { ...createPromiseState<void, string>() },
  updateIssue: { ...createPromiseState<void, string>() },
  issue: { ...createPromiseState<IssueDetails, string>() },
  updateIssueStatus: { ...createPromiseState<void, string>() },
  updateIssueSprint: { ...createPromiseState<void, string>() },
}

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */
const changeIssueStatus = (
  state = INITIAL_STATE,
  action: ActionType<
    | typeof updateIssueStatusActions.updateIssueStatusOptimisticChange
    | typeof updateIssueStatusActions.updateIssueStatusFailure
  >
) => {
  const { issueId, statusId } = action.payload

  return produce(state, (draft) => {
    const issueList = draft.issueList.data!

    const issue = issueList.find(({ id }) => id === issueId)!

    issue.statusId = statusId
  })
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  ...createNestedReducer<IssueRedux>(
    types.GET_ISSUE_LIST,
    INITIAL_STATE,
    "issueList"
  ),
  ...createNestedReducer<IssueRedux>(
    types.CREATE_ISSUE,
    INITIAL_STATE,
    "createIssue"
  ),
  ...createNestedReducer<IssueRedux>(
    types.UPDATE_ISSUE,
    INITIAL_STATE,
    "updateIssue"
  ),
  ...createNestedReducer<IssueRedux>(types.GET_ISSUE, INITIAL_STATE, "issue"),
  ...createNestedReducer<IssueRedux>(
    types.UPDATE_ISSUE_STATUS,
    INITIAL_STATE,
    "updateIssueStatus"
  ),
  [types.UPDATE_ISSUE_STATUS.OPTIMISTIC_CHANGE]: changeIssueStatus,
  [types.UPDATE_ISSUE_STATUS.FAILURE]: changeIssueStatus,
  ...createNestedReducer<IssueRedux>(
    types.GET_BACKLOG_ISSUES,
    INITIAL_STATE,
    "backlogIssueList"
  ),
  ...createNestedReducer<IssueRedux>(
    types.UPDATE_ISSUE_SPRINT,
    INITIAL_STATE,
    "updateIssueSprint"
  ),
  [userTypes.LOGOUT_USER]: () => INITIAL_STATE,
})

const groupedIssuesByStatus = (state: ApplicationState) => {
  return groupBy(state.issue.issueList.data, "statusId")
}

const getIssue = (state: ApplicationState, issueId: number) => {
  return state.issue.issueList.data!.find((issue) => issue.id === issueId)
}

export const IssueSelectors = {
  groupedIssuesByStatus,
  getIssue,
}
