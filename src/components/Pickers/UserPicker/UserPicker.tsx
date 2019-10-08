import React, { Component } from "react"

import FormContainer from "../../FormContainer/FormContainer"
import Input from "../../Inputs/Input/Input"
import { Button } from "reactstrap"

import styles from "./UserPicker.module.scss"
import Dropdown, { Option } from "../../Dropdown/Dropdown"
import classnames from "classnames"
import { Formik, FormikActions, FormikProps, Form } from "formik"
import { createInviteActions } from "../../../store/invite/inviteActions"
import { InviteFormValues } from "../../../pages/FulfillProjectPage/FulfillProjectPage"
import { PERMISSION_LIST } from "../../../consts/userPermission"

interface InnerProps {
  createInviteRequest: typeof createInviteActions.createInviteRequest
  projectId: number
  users: InviteFormValues[]
}

const INITIAL_VALUES: InviteFormValues = {
  email: "",
  permission: "1",
}

type UserPickerProps = InnerProps

class UserPicker extends Component<UserPickerProps> {
  handleSelect = (userFormikProps: FormikProps<InviteFormValues>) => (
    option: Option
  ) => {
    if (!option || Array.isArray(option)) {
      return
    }

    userFormikProps.setFieldValue("permission", option.value)
  }

  onSubmit = (
    values: InviteFormValues,
    formikActions: FormikActions<InviteFormValues>
  ) => {
    const { setFieldError, setSubmitting } = formikActions
    const { createInviteRequest, projectId, users } = this.props

    const user = users.find(({ email }) => email === values.email)

    if (!user) {
      createInviteRequest(projectId, values, this.setFormValues(formikActions))
      setSubmitting(false)
    } else {
      setFieldError("email", "User email already added")
    }
  }

  setFormValues = (formikActions: FormikActions<InviteFormValues>) => () => {
    formikActions.setValues({
      email: "",
      permission: "1",
    })
  }

  render() {
    return (
      <Formik
        initialValues={INITIAL_VALUES}
        enableReinitialize
        onSubmit={this.onSubmit}
      >
        {(userFormikProps) => {
          const permissionOption = PERMISSION_LIST.find((permission) => {
            return permission.value === userFormikProps.values.permission
          })

          return (
            <FormContainer
              label={
                "add your teammates, supervisors, clients and choose their privileges"
              }
              containerClassName={styles.formContainer}
            >
              <Form>
                <div className={styles.inputWrapper}>
                  <Input
                    label="user email"
                    name="email"
                    type="text"
                    containerClassName={styles.email}
                  />
                  <div className={styles.dropdownWrapper}>
                    <Dropdown
                      label="permission"
                      options={PERMISSION_LIST}
                      onSelect={this.handleSelect(userFormikProps)}
                      defaultValue={PERMISSION_LIST[0]}
                      value={permissionOption}
                    />
                  </div>
                </div>
                <div className={styles.buttonsWrapper}>
                  <Button
                    className={classnames("button", styles.button)}
                    type="submit"
                  >
                    Add user
                  </Button>
                </div>
              </Form>
            </FormContainer>
          )
        }}
      </Formik>
    )
  }
}

export default UserPicker
