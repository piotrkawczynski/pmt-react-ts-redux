import { combineReducers } from "redux"
import invite, { InviteRedux } from "./invite/inviteRedux"
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
}

const rootReducer = combineReducers<ApplicationState>({
  user,
  project,
  tag,
  status,
  invite,
  permission,
  sprint,
})

export default rootReducer
