import React, { Component } from "react"
import { connect } from "react-redux"

import { RouteComponentProps, withRouter } from "react-router"
import IssueModal from "../../components/IssueModal/IssueModal"
import SprintChooser from "../../components/SprintChooser/SprintChooser"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import { getSprintListActions } from "../../store/sprint/sprintActions"
import { getStatusListActions } from "../../store/status/statusActions"
import { getTagListActions } from "../../store/tag/tagActions"
import { getUserListActions } from "../../store/user/userActions"

interface PropsFromDispatch {
  getUserListRequest: typeof getUserListActions.getUserListRequest
  getStatusListRequest: typeof getStatusListActions.getStatusListRequest
  getTagListRequest: typeof getTagListActions.getTagListRequest
  getPermissionListRequest: typeof getPermissionListActions.getPermissionListRequest
  getSprintListRequest: typeof getSprintListActions.getSprintListRequest
}

interface PropsFromState {
  userList: ApplicationState["user"]["users"]
  tagList: ApplicationState["tag"]["tagList"]
  statusList: ApplicationState["status"]["statusList"]
  permissionList: ApplicationState["permission"]["permissionList"]
  sprintList: ApplicationState["sprint"]["sprintList"]
}

interface RouteParams {
  id: string
}

type BacklogPageProps = PropsFromDispatch &
  PropsFromState &
  RouteComponentProps<RouteParams>

class BacklogPage extends Component<BacklogPageProps> {
  componentDidMount() {
    const {
      getPermissionListRequest,
      getStatusListRequest,
      getTagListRequest,
      getUserListRequest,
      getSprintListRequest,
      match: { params },
    } = this.props

    const projectId = Number(params.id)

    getTagListRequest(projectId)
    getStatusListRequest(projectId)
    getPermissionListRequest()
    getUserListRequest(projectId)
    getSprintListRequest(projectId)
  }

  areListsReady = () => {
    const { statusList, tagList, permissionList, userList } = this.props

    return (
      statusList.data && tagList.data && permissionList.data && userList.data
    )
  }

  render() {
    const {
      statusList,
      tagList,
      permissionList,
      userList,
      sprintList: { data: sprintListData },
    } = this.props

    return (
      <div>
        {sprintListData && !!sprintListData.length && (
          <SprintChooser sprintList={sprintListData} />
        )}
        <div>Backlog</div>

        {/*{this.areListsReady() && (*/}
        {/*  <IssueModal*/}
        {/*    statusList={statusList.data}*/}
        {/*    tagList={tagList.data}*/}
        {/*    permissionList={permissionList.data}*/}
        {/*    userList={userList.data}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  userList: state.user.users,
  tagList: state.tag.tagList,
  statusList: state.status.statusList,
  permissionList: state.permission.permissionList,
  sprintList: state.sprint.sprintList,
})

const mapDispatchToProps = {
  getUserListRequest: getUserListActions.getUserListRequest,
  getStatusListRequest: getStatusListActions.getStatusListRequest,
  getTagListRequest: getTagListActions.getTagListRequest,
  getPermissionListRequest: getPermissionListActions.getPermissionListRequest,
  getSprintListRequest: getSprintListActions.getSprintListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BacklogPage))
