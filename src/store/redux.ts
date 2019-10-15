import { combineReducers } from "redux"
import comment, { CommentRedux } from "./comment/commentRedux"
import components, { ComponentsRedux } from "./components/componentsRedux"
import invite, { InviteRedux } from "./invite/inviteRedux"
import issue, { IssueRedux } from "./issue/issueRedux"
import permission, { PermissionRedux } from "./permission/permissionRedux"
import project, { ProjectRedux } from "./project/projectRedux"
import sprint, { SprintRedux } from "./sprint/sprintRedux"
import status, { StatusRedux } from "./status/statusRedux"
import tag, { TagRedux } from "./tag/tagRedux"
import user, { UserRedux } from "./user/userRedux"

export interface ApplicationState {
  user: UserRedux
  project: ProjectRedux
  tag: TagRedux
  status: StatusRedux
  invite: InviteRedux
  permission: PermissionRedux
  sprint: SprintRedux
  issue: IssueRedux
  comment: CommentRedux
  components: ComponentsRedux
}

const rootReducer = combineReducers<ApplicationState>({
  user,
  project,
  tag,
  status,
  invite,
  permission,
  sprint,
  issue,
  comment,
  components,
})

export default rootReducer
