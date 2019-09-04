import React from "react"

import {
  FulfillProjectPageState,
  StatusFormValues,
} from "../../../pages/FulfillProjectPage/FulfillProjectPage"
import FormContainer from "../../FormContainer/FormContainer"
import StatusItemPreview from "./StatusItemPreview/StatusItemPreview"

import styles from "./StatusListPreview.module.scss"
import produce from "immer"
import {
  deleteStatusActions,
  updateStatusOrderActions,
} from "../../../store/status/statusActions"

interface StatusListPreviewProps {
  statuses: StatusFormValues[]
  updateState: (state: FulfillProjectPageState) => void
  fulfillmentState: FulfillProjectPageState
  updateStatusOrderRequest: typeof updateStatusOrderActions.updateStatusOrderRequest
  deleteStatusRequest: typeof deleteStatusActions.deleteStatusRequest
}

interface StatusListPreviewState {
  draggedStatus: StatusFormValues | null
  draggedStatusRef: HTMLDivElement | null
}

class StatusListPreview extends React.Component<
  StatusListPreviewProps,
  StatusListPreviewState
> {
  constructor(props: StatusListPreviewProps) {
    super(props)

    this.state = { draggedStatus: null, draggedStatusRef: null }
  }

  handleOnDelete = (id: number) => () => {
    const { fulfillmentState, updateState, deleteStatusRequest } = this.props

    const nextState = produce(fulfillmentState, (draft) => {
      const statusIndex = draft.statuses.findIndex(
        (draftElement) => draftElement.id === id
      )

      draft.statuses.splice(statusIndex, 1)

      draft.statuses.forEach((draftElement, index) => {
        if (index >= statusIndex) {
          draftElement.order -= 1
        }
      })
    })

    deleteStatusRequest(id, () => updateState(nextState))
  }

  onDragStart = (status: StatusFormValues) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.currentTarget.style.opacity = "0.4"

    this.setState({
      draggedStatus: status,
      draggedStatusRef: event.currentTarget,
    })
  }

  onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  onDrop = (status: StatusFormValues) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    const { draggedStatus, draggedStatusRef } = this.state

    if (draggedStatusRef) {
      draggedStatusRef.style.opacity = ""
    }

    if (draggedStatus && draggedStatusRef) {
      const { fulfillmentState, updateState } = this.props

      const nextState = produce(fulfillmentState, (draft) => {
        const draggedStatusIndex = draft.statuses.findIndex(
          ({ id }) => id === draggedStatus.id
        )

        const onDroppedStatusIndex = draft.statuses.findIndex(
          ({ id }) => id === status.id
        )

        const temp = draft.statuses[draggedStatusIndex].name
        draft.statuses[draggedStatusIndex].name =
          draft.statuses[onDroppedStatusIndex].name
        draft.statuses[onDroppedStatusIndex].name = temp
      })

      updateState(nextState)
      this.props.updateStatusOrderRequest(
        { ...draggedStatus, name: status.name },
        { ...status, name: draggedStatus.name }
      )
      this.setState({ draggedStatus: null, draggedStatusRef: null })
    }

    event.stopPropagation()
  }

  onDropContainer = (event: React.DragEvent<HTMLDivElement>) => {
    const { draggedStatusRef } = this.state

    if (draggedStatusRef) {
      draggedStatusRef.style.opacity = ""
    }

    this.setState({ draggedStatus: null, draggedStatusRef: null })

    event.stopPropagation()
  }

  render() {
    const { statuses } = this.props

    return (
      <FormContainer label={"here will appear statuses"}>
        <div
          className={styles.createdStatusList}
          onDragOver={this.onDragOver}
          onDrop={this.onDropContainer}
        >
          {statuses &&
            statuses.map((status) => (
              <StatusItemPreview
                key={`${status.name}-${status.order}`}
                status={status}
                handleOnDelete={this.handleOnDelete(status.id!)}
                draggable
                onDragStart={this.onDragStart(status)}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop(status)}
              />
            ))}
        </div>
      </FormContainer>
    )
  }
}

export default StatusListPreview
