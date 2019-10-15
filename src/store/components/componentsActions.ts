import { Issue, IssueDetails } from "../../types/issue"
import { createPromiseType } from "../../utilities/ReduxFunctions"
import { CreateIssueFormValues } from "../../components/CreateIssueModal/CreateIssueModal"
import { UpdateIssueFormValues } from "../../components/UpdateIssueModal/UpdateIssueModal"

/* ------------- Action Types ------------- */
const SET_SIDEBAR_EXTENSION = "SET_SIDEBAR_EXTENSION"

export const types = {
  SET_SIDEBAR_EXTENSION,
}

/* ------------- Action Creators ------------- */

export const setSidebarExtension = (isExtended: boolean) => ({
  type: SET_SIDEBAR_EXTENSION,
  isExtended,
})
