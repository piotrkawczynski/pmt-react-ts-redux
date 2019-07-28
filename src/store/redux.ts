import { combineReducers } from "redux"
import user, { UserRedux } from "./user/userRedux"

export interface ApplicationState {
  user: UserRedux
}

const rootReducer = combineReducers<ApplicationState>({
  user,
})

export default rootReducer
