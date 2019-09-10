import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { Sprint } from "../../types/sprint"

import styles from "./SprintChooser.module.scss"

interface InnerProps {
  sprintList: Sprint[]
}

interface SprintChooserState {
  previousSprint: Sprint | null
  currentSprint: Sprint | null
  nextSprint: Sprint | null
}

interface RouteParams {
  id: string
}

type SprintChooserProps = InnerProps & RouteComponentProps<RouteParams>

class SprintChooser extends Component<SprintChooserProps, SprintChooserState> {
  constructor(props: SprintChooserProps) {
    super(props)
    const { sprintList } = props

    this.state = {
      ...this.prepareSprints(sprintList[sprintList.length - 1], sprintList),
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

    return {
      previousSprint,
      currentSprint: (sprintList[sprintIndex]) || null,
      nextSprint,
    }
  }

  previousSprintClick = () => {
    this.setState(
      this.prepareSprints(this.state.previousSprint, this.props.sprintList)
    )
  }

  nextSprintClick = () => {
    this.setState(
      this.prepareSprints(this.state.nextSprint, this.props.sprintList)
    )
  }

  renderPreviousSprint = () => {
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

  renderNextSprint = () => {
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

  render() {
    const { currentSprint } = this.state

    console.log(this.state)

    return (
      <div className={styles.sprintChooserContainer}>
        <div className={styles.buttonContainer}>
          {this.renderPreviousSprint()}
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            {currentSprint && currentSprint.description}
          </div>
        </div>
        <div className={styles.buttonContainer}>{this.renderNextSprint()}</div>
      </div>
    )
  }
}

export default withRouter(SprintChooser)
