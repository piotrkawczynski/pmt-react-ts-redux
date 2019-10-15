import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns"
import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import {
  getBacklogIssuesActions,
  getIssueListActions,
  updateIssueSprintActions,
} from "../../store/issue/issueActions"
import { getPermissionListActions } from "../../store/permission/permissionActions"
import { ApplicationState } from "../../store/redux"
import {
  createSprintActions,
  deleteSprintActions,
  getSprintListActions,
  updateSprintActions,
} from "../../store/sprint/sprintActions"
import { getStatusListActions } from "../../store/status/statusActions"
import { getTagListActions } from "../../store/tag/tagActions"
import { getUserListActions } from "../../store/user/userActions"
import { Sprint } from "../../types/sprint"
import SprintModal, { SprintFormValues } from "../SprintModal/SprintModal"

import styles from "./SprintChooser.module.scss"

interface PropsFromDispatch {
  updateSprintRequest: typeof updateSprintActions.updateSprintRequest
}

interface InnerProps {
  sprintList: ApplicationState["sprint"]["sprintList"]
  getIssueListRequest: typeof getIssueListActions.getIssueListRequest
  projectId: number
  setSprintId: (sprintId: number) => void
}

interface SprintChooserState {
  previousSprint: Sprint | null
  currentSprint: Sprint | null
  nextSprint: Sprint | null
  showUpdateSprintModal: boolean
}

interface RouteParams {
  id: string
}

type SprintChooserProps = InnerProps &
  RouteComponentProps<RouteParams> &
  PropsFromDispatch

class SprintChooser extends Component<SprintChooserProps, SprintChooserState> {
  constructor(props: SprintChooserProps) {
    super(props)
    const {
      sprintList: { data },
    } = props

    const sprintList = data!

    this.state = {
      ...this.prepareSprints(sprintList[sprintList.length - 1], sprintList),
      showUpdateSprintModal: false,
    }
  }

  componentDidUpdate(prevProps: SprintChooserProps) {
    const { sprintList: prevSprintList } = prevProps
    const sprintList = this.props.sprintList.data!

    if (
      prevSprintList.status === "loading" &&
      this.props.sprintList.status === "success"
    ) {
      this.setState({
        ...this.prepareSprints(sprintList[sprintList.length - 1], sprintList),
      })
    }
  }

  prepareSprints(currentSprint: Sprint | null, sprintList: Sprint[]) {
    const sprintIndex =
      (currentSprint &&
        sprintList.findIndex((sprint) => sprint.id === currentSprint.id)) ||
      0

    let previousSprint = null
    let nextSprint = null

    if (sprintIndex > 0) {
      previousSprint = sprintList[sprintIndex - 1]
    }
    if (sprintIndex < sprintList.length - 1) {
      nextSprint = sprintList[sprintIndex + 1]
    }

    if (currentSprint) {
      this.props.setSprintId(currentSprint!.id)
    }

    return {
      previousSprint,
      currentSprint: sprintList[sprintIndex] || null,
      nextSprint,
    }
  }

  getSprint = (sprintId: number) => () => {
    this.props.getIssueListRequest(this.props.projectId, sprintId)
  }

  previousSprintClick = () => {
    this.setState(
      this.prepareSprints(
        this.state.previousSprint,
        this.props.sprintList.data!
      ),
      this.getSprint(this.state.previousSprint!.id)
    )
  }

  nextSprintClick = () => {
    this.setState(
      this.prepareSprints(this.state.nextSprint, this.props.sprintList.data!),
      this.getSprint(this.state.nextSprint!.id)
    )
  }

  openUpdateSprintModal = () => {
    this.setState({ showUpdateSprintModal: true })
  }

  onSubmitUpdateSprint = (values: SprintFormValues) => {
    const { projectId, updateSprintRequest } = this.props
    const { currentSprint } = this.state
    updateSprintRequest(values, currentSprint!.id, projectId)
    this.setState({ showUpdateSprintModal: false })
  }

  onCancelUpdateSprint = () => {
    this.setState({ showUpdateSprintModal: false })
  }

  render() {
    const { currentSprint } = this.state

    return (
      <div className={styles.sprintChooserContainer}>
        <div className={styles.buttonContainer}>
          {this.renderPreviousSprint()}
        </div>
        <div
          className={styles.titleContainer}
          onClick={this.openUpdateSprintModal}
        >
          <div className={styles.title}>
            {currentSprint && currentSprint.description}
          </div>
          <div className={styles.dateWrapper}>
            <div className={styles.date}>
              {currentSprint &&
                format(new Date(currentSprint.dateFrom), "yyyy-MM-dd")}
            </div>
            <div className={styles.date}>
              {currentSprint &&
                format(new Date(currentSprint.dateTo), "yyyy-MM-dd")}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>{this.renderNextSprint()}</div>
        {this.renderUpdateSprintModal()}
      </div>
    )
  }

  private renderNextSprint = () => {
    if (!this.state.nextSprint) {
      return null
    }

    return (
      <button
        type="button"
        className={styles.sprintPaginateRight}
        onClick={this.nextSprintClick}
      >
        <FontAwesomeIcon icon={faCaretRight} size={"lg"} />
      </button>
    )
  }

  private renderPreviousSprint = () => {
    if (!this.state.previousSprint) {
      return null
    }

    return (
      <button
        type="button"
        className={styles.sprintPaginateLeft}
        onClick={this.previousSprintClick}
      >
        <FontAwesomeIcon icon={faCaretLeft} size={"lg"} />
      </button>
    )
  }

  private renderUpdateSprintModal = () => {
    const { currentSprint, showUpdateSprintModal } = this.state

    if (!showUpdateSprintModal) {
      return null
    }

    const { dateFrom, dateTo, description } = currentSprint!

    const initialValues = {
      dateFrom: format(new Date(dateFrom), "yyyy-MM-dd"),
      dateTo: format(new Date(dateTo), "yyyy-MM-dd"),
      description,
    }

    return (
      <SprintModal
        initialValues={initialValues}
        projectId={this.props.projectId}
        onSubmit={this.onSubmitUpdateSprint}
        onCancel={this.onCancelUpdateSprint}
      />
    )
  }
}

const mapDispatchToProps = {
  updateSprintRequest: updateSprintActions.updateSprintRequest,
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SprintChooser))
