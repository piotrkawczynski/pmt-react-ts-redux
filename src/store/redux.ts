import { combineReducers } from "redux"
import user, { UserRedux } from "./user/userRedux"
import project, { ProjectRedux } from "./project/projectRedux"
import tag, { TagRedux } from "./tag/tagRedux"
import status, { StatusRedux } from "./status/statusRedux"
import invite, { InviteRedux } from "./invite/inviteRedux"
import permission, { PermissionRedux } from "./permission/permissionRedux"

export interface ApplicationState {
  user: UserRedux
  project: ProjectRedux
  tag: TagRedux
  status: StatusRedux
  invite: InviteRedux
  permission: PermissionRedux
}

const rootReducer = combineReducers<ApplicationState>({
  user,
  project,
  tag,
  status,
  invite,
  permission
})

export default rootReducer
