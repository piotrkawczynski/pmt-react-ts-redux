import produce from "immer"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, RouteComponentProps, withRouter } from "react-router"
import Carousel from "../../components/Carousel/Carousel"

import FormContainer from "../../components/FormContainer/FormContainer"
import StatusPicker from "../../components/Pickers/StatusPicker/StatusPicker"
import TagPicker from "../../components/Pickers/TagPicker/TagPicker"
import UserPicker from "../../components/Pickers/UserPicker/UserPicker"
import StatusListPreview from "../../components/Previews/StatusListPreview/StatusListPreview"
import TagListPreview from "../../components/Previews/TagListPreview/TagListPreview"
import UserPreview from "../../components/Previews/UserPreview/UserPreview"
import {
  createInviteActions,
  deleteInviteActions,
  getInviteListActions,
} from "../../store/invite/inviteActions"
import { projectListActions } from "../../store/project/projectActions"
import { ApplicationState } from "../../store/redux"
import {
  createStatusActions,
  deleteStatusActions,
  getStatusListActions,
  updateStatusOrderActions,
} from "../../store/status/statusActions"
import {
  createTagActions,
  deleteTagActions,
  getTagListActions,
} from "../../store/tag/tagActions"

import styles from "./FulfillProjectPage.module.scss"

interface PropsFromState {
  createInvite: ApplicationState["invite"]["createInvite"]
  createStatus: ApplicationState["status"]["createStatus"]
  createTag: ApplicationState["tag"]["createTag"]
  statusList: ApplicationState["status"]["statusList"]
  tagList: ApplicationState["tag"]["tagList"]
  inviteList: ApplicationState["invite"]["inviteList"]
  projectList: ApplicationState["project"]["projectList"]
}

interface PropsFromDispatch {
  projectListRequest: typeof projectListActions.projectListRequest
  createTagRequest: typeof createTagActions.createTagRequest
  createStatusRequest: typeof createStatusActions.createStatusRequest
  createInviteRequest: typeof createInviteActions.createInviteRequest
  createTagInit: typeof createTagActions.createTagInit
  createStatusInit: typeof createStatusActions.createStatusInit
  createInviteInit: typeof createInviteActions.createInviteInit
  updateStatusOrderRequest: typeof updateStatusOrderActions.updateStatusOrderRequest
  deleteStatusRequest: typeof deleteStatusActions.deleteStatusRequest
  deleteTagRequest: typeof deleteTagActions.deleteTagRequest
  deleteInviteRequest: typeof deleteInviteActions.deleteInviteRequest
  getStatusListRequest: typeof getStatusListActions.getStatusListRequest
  getTagListRequest: typeof getTagListActions.getTagListRequest
  getInviteListRequest: typeof getInviteListActions.getInviteListRequest
}

interface RouteParams {
  projectId: string
}

type FulfillProjectPageProps = PropsFromDispatch &
  PropsFromState &
  RouteComponentProps<RouteParams>

export interface TagFormValues {
  id?: number
  name: string
  image: string
}

export interface StatusFormValues {
  id?: number
  name: string
  order: number
}

export interface InviteFormValues {
  id?: number
  email: string
  permission: string
}

export interface FulfillProjectPageState {
  tags: TagFormValues[]
  statuses: StatusFormValues[]
  users: InviteFormValues[]
}

class FulfillProjectPage extends Component<
  FulfillProjectPageProps,
  FulfillProjectPageState
> {
  constructor(props: FulfillProjectPageProps) {
    super(props)

    this.state = {
      tags: [],
      statuses: [],
      users: [],
    }
  }

  componentDidMount() {
    const {
      getStatusListRequest,
      getTagListRequest,
      getInviteListRequest,
      projectListRequest,
      match: { params },
    } = this.props

    const projectId = Number(params.projectId)

    getStatusListRequest(projectId)
    getTagListRequest(projectId)
    getInviteListRequest(projectId)
    projectListRequest()
  }

  componentDidUpdate(prevProps: FulfillProjectPageProps) {
    const prevStatusListStatus = prevProps.statusList.status
    const { statusList } = this.props
    const { data: statusListData, status: statusListStatus } = statusList

    if (
      statusListData &&
      prevStatusListStatus === "loading" &&
      statusListStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.statuses = statusListData
      })

      this.setState(nextState)
    }

    const prevTagListStatus = prevProps.tagList.status
    const { tagList } = this.props
    const { data: tagListData, status: tagListStatus } = tagList

    if (
      tagListData &&
      prevTagListStatus === "loading" &&
      tagListStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.tags = tagListData
      })

      this.setState(nextState)
    }

    const prevInviteListStatus = prevProps.inviteList.status
    const { inviteList } = this.props
    const { data: inviteListData, status: inviteListStatus } = inviteList

    if (
      inviteListData &&
      prevInviteListStatus === "loading" &&
      inviteListStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.users = inviteListData
      })

      this.setState(nextState)
    }

    const prevInviteStatus = prevProps.createInvite.status
    const { createInvite, createInviteInit } = this.props
    const { data: createInviteData, status: createInviteStatus } = createInvite

    if (
      createInviteData &&
      prevInviteStatus === "loading" &&
      createInviteStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.users.push(createInviteData)
      })

      this.setState(nextState)
      createInviteInit()
    }

    const prevTagStatus = prevProps.createTag.status
    const { createTag, createTagInit } = this.props
    const { data: createTagData, status: createTagStatus } = createTag

    if (
      createTagData &&
      prevTagStatus === "loading" &&
      createTagStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.tags.push(createTagData)
      })

      this.setState(nextState)
      createTagInit()
    }

    const prevStatusStatus = prevProps.createStatus.status
    const { createStatus, createStatusInit } = this.props
    const { data: createStatusData, status: createStatusStatus } = createStatus

    if (
      createStatusData &&
      prevStatusStatus === "loading" &&
      createStatusStatus === "success"
    ) {
      const nextState = produce(this.state, (draft) => {
        draft.statuses.push(createStatusData)
      })

      this.setState(nextState)
      createStatusInit()
    }
  }

  updateState = (state: FulfillProjectPageState) => {
    this.setState(state)
  }

  render() {
    const {
      match: { params },
      createTagRequest,
      createStatusRequest,
      createInviteRequest,
      updateStatusOrderRequest,
      deleteStatusRequest,
      deleteTagRequest,
      deleteInviteRequest,
      projectList,
    } = this.props

    const projectId = Number(params.projectId)

    const project =
      projectList.data && projectList.data!.find(({ id }) => projectId === id)

    if (!project) {
      return <Redirect to={"/"} />
    }

    if (project && project.permissionId !== 2) {
      return <Redirect to={"/"} />
    }

    const { users, tags, statuses } = this.state

    return (
      <div className={styles.createProject}>
        <>
          <Carousel>
            <StatusPicker
              statuses={statuses}
              createStatusRequest={createStatusRequest}
              projectId={projectId}
            />
            <TagPicker
              tags={tags}
              createTagRequest={createTagRequest}
              projectId={projectId}
            />
            <UserPicker
              users={users}
              createInviteRequest={createInviteRequest}
              projectId={projectId}
            />
          </Carousel>
          <FormContainer
            label={"here You will see the project setting changes"}
            containerClassName={styles.formContainer}
          >
            <TagListPreview
              tags={tags}
              fulfillmentState={this.state}
              updateState={this.updateState}
              deleteTagRequest={deleteTagRequest}
            />
            <StatusListPreview
              statuses={statuses}
              updateState={this.updateState}
              fulfillmentState={this.state}
              updateStatusOrderRequest={updateStatusOrderRequest}
              deleteStatusRequest={deleteStatusRequest}
            />
            <UserPreview
              users={users}
              updateState={this.updateState}
              fulfillmentState={this.state}
              deleteInviteRequest={deleteInviteRequest}
            />
          </FormContainer>
        </>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  createInvite: state.invite.createInvite,
  createStatus: state.status.createStatus,
  createTag: state.tag.createTag,
  statusList: state.status.statusList,
  tagList: state.tag.tagList,
  inviteList: state.invite.inviteList,
  projectList: state.project.projectList,
})

const mapDispatchToProps = {
  projectListRequest: projectListActions.projectListRequest,
  createTagInit: createTagActions.createTagInit,
  createStatusInit: createStatusActions.createStatusInit,
  createInviteInit: createInviteActions.createInviteInit,
  createTagRequest: createTagActions.createTagRequest,
  createStatusRequest: createStatusActions.createStatusRequest,
  createInviteRequest: createInviteActions.createInviteRequest,
  updateStatusOrderRequest: updateStatusOrderActions.updateStatusOrderRequest,
  deleteStatusRequest: deleteStatusActions.deleteStatusRequest,
  getStatusListRequest: getStatusListActions.getStatusListRequest,
  deleteTagRequest: deleteTagActions.deleteTagRequest,
  deleteInviteRequest: deleteInviteActions.deleteInviteRequest,
  getTagListRequest: getTagListActions.getTagListRequest,
  getInviteListRequest: getInviteListActions.getInviteListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FulfillProjectPage))
