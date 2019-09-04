import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import produce from "immer"

import { ApplicationState } from "../../store/redux"
import {
  createTagActions,
  deleteTagActions,
  getTagListActions,
} from "../../store/tag/tagActions"
import {
  createStatusActions,
  deleteStatusActions,
  getStatusListActions,
  updateStatusOrderActions,
} from "../../store/status/statusActions"
import {
  createInviteActions,
  deleteInviteActions,
  getInviteListActions,
} from "../../store/invite/inviteActions"

import TagPicker from "../../components/Pickers/TagPicker/TagPicker"
import StatusPicker from "../../components/Pickers/StatusPicker/StatusPicker"
import UserPicker from "../../components/Pickers/UserPicker/UserPicker"
import Carousel from "../../components/Carousel/Carousel"
import FormContainer from "../../components/FormContainer/FormContainer"
import StatusListPreview from "../../components/Previews/StatusListPreview/StatusListPreview"
import UserPreview from "../../components/Previews/UserPreview/UserPreview"

import styles from "./FulfillProjectPage.module.scss"
import TagListPreview from "../../components/Previews/TagListPreview/TagListPreview"

interface PropsFromState {
  createInvite: ApplicationState["invite"]["createInvite"]
  createStatus: ApplicationState["status"]["createStatus"]
  createTag: ApplicationState["tag"]["createTag"]
  statusList: ApplicationState["status"]["statusList"]
  tagList: ApplicationState["tag"]["tagList"]
  inviteList: ApplicationState["invite"]["inviteList"]
}

interface PropsFromDispatch {
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
  id: string
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
      match: { params },
    } = this.props

    const projectId = Number(params.id)

    getStatusListRequest(projectId)
    getTagListRequest(projectId)
    getInviteListRequest(projectId)
  }

  componentDidUpdate(prevProps: FulfillProjectPageProps) {
    const prevStatusListStatus = prevProps.statusList.status
    const { statusList } = this.props
    const { data: statusListData, status: statusListStatus } = statusList

    console.log("statusList", statusList)

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
    } = this.props

    const {
      createTagRequest,
      createStatusRequest,
      createInviteRequest,
      updateStatusOrderRequest,
      deleteStatusRequest,
      deleteTagRequest,
      deleteInviteRequest,
    } = this.props

    const { users, tags, statuses } = this.state

    return (
      <div className={styles.createProject}>
        <>
          <Carousel>
            <StatusPicker
              statuses={statuses}
              createStatusRequest={createStatusRequest}
              projectId={Number(params.id)}
            />
            <TagPicker
              tags={tags}
              createTagRequest={createTagRequest}
              projectId={Number(params.id)}
            />
            <UserPicker
              users={users}
              createInviteRequest={createInviteRequest}
              projectId={Number(params.id)}
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
})

const mapDispatchToProps = {
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
  getInviteListRequest: getInviteListActions.getInviteListRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FulfillProjectPage))
