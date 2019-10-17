import produce from "immer"
import React, { Component } from "react"

import {
  FulfillProjectPageState,
  InviteFormValues,
} from "../../../pages/FulfillProjectPage/FulfillProjectPage"
import { deleteInviteActions } from "../../../store/invite/inviteActions"
import FormContainer from "../../FormContainer/FormContainer"
import UserItemPreview from "./UserItemPreview/UserItemPreview"

import styles from "./UserPreview.module.scss"

interface UserPreviewProps {
  users: InviteFormValues[]
  updateState: (state: FulfillProjectPageState) => void
  fulfillmentState: FulfillProjectPageState
  deleteInviteRequest: typeof deleteInviteActions.deleteInviteRequest
}

class UserPreview extends Component<UserPreviewProps> {
  handleOnDelete = (id: number) => () => {
    const { fulfillmentState, updateState, deleteInviteRequest } = this.props

    const nextState = produce(fulfillmentState, (draft) => {
      const inviteIndex = draft.users.findIndex(
        (draftElement) => draftElement.id === id
      )

      draft.users.splice(inviteIndex, 1)
    })

    deleteInviteRequest(id, () => updateState(nextState))
  }

  render() {
    const { users } = this.props

    return (
      <FormContainer label={"here will appear users"}>
        <div className={styles.userList}>
          {users &&
            users.map((user) => (
              <UserItemPreview
                key={user.email}
                user={user}
                handleOnDelete={this.handleOnDelete(user.id!)}
              />
            ))}
        </div>
      </FormContainer>
    )
  }
}

export default UserPreview
