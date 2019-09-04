import React, { Component } from "react"

import { CloseButton } from "../../../CloseButton/CloseButton"

import styles from "./UserItemPreview.module.scss"
import { InviteFormValues } from "../../../../pages/FulfillProjectPage/FulfillProjectPage"
import { PERMISSION_LIST } from "../../../../consts/userPermission"

interface StatusItemPreviewProps {
  user: InviteFormValues
  handleOnDelete: () => void
}

class UserItemPreview extends Component<StatusItemPreviewProps> {
  getPermissionName = () => {
    const { permission } = this.props.user

    const permissionOption = PERMISSION_LIST.find((option) => {
      return option.value === permission
    })

    return (permissionOption && permissionOption.label) || "User"
  }

  render() {
    const {
      user: { email },
      handleOnDelete,
    } = this.props

    return (
      <div className={styles.itemContainer}>
        <div className={styles.email}>{email}</div>
        <div className={styles.permission}>{this.getPermissionName()}</div>
        <CloseButton
          containerClassName={styles.closeButtonContainer}
          armClassName={styles.arms}
          onClick={handleOnDelete}
        />
      </div>
    )
  }
}

export default UserItemPreview
