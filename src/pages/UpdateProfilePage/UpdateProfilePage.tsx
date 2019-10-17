import { Form, Formik, FormikActions } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import { Button } from "reactstrap"
import * as Yup from "yup"

import Input from "../../components/Inputs/Input/Input"
import { ApplicationState } from "../../store/redux"
import { updateProfileActions } from "../../store/user/userActions"

import styles from "./UpdateProfilePage.module.scss"

interface PropsFromDispatch {
  updateProfileRequest: typeof updateProfileActions.updateProfileRequest
}

interface PropsFromState {
  user: ApplicationState["user"]["user"]["data"]
}

type UpdateProfilePageProps = PropsFromDispatch &
  PropsFromState &
  RouteComponentProps

interface UpdateProfilePageState {
  values: UpdateProfileValues
}

export interface UpdateProfileValues {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
}

const INITIAL_VALUES: UpdateProfileValues = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Wrong email format"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password need to be minimum 8 length"),
})

class UpdateProfilePage extends Component<
  UpdateProfilePageProps,
  UpdateProfilePageState
> {
  constructor(props: UpdateProfilePageProps) {
    super(props)

    const user = props.user!

    this.state = {
      values: {
        ...INITIAL_VALUES,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    }
  }

  render() {
    return (
      <div className={styles.formWrapper}>
        <Formik
          enableReinitialize
          initialValues={this.state.values}
          onSubmit={this.onSubmit}
          validationSchema={VALIDATION_SCHEMA}
        >
          {(formikProps) => {
            const { isSubmitting, handleChange } = formikProps

            return (
              <Form>
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Email"
                  type="text"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                />
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  label="First name"
                  onChange={handleChange}
                />
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  label="Last name"
                  onChange={handleChange}
                />
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Username"
                  type="text"
                  name="username"
                  label="Username"
                  onChange={handleChange}
                />
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Password"
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                />
                <div className={styles.buttonWrapper}>
                  <Button
                    type="submit"
                    className="button"
                    disabled={isSubmitting}
                  >
                    Update profile
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  }

  private onSubmit = (
    values: UpdateProfileValues,
    formikActions: FormikActions<UpdateProfileValues>
  ) => {
    this.props.updateProfileRequest(values)
    formikActions.setSubmitting(false)
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user.user.data,
})

const mapDispatchToProps = {
  updateProfileRequest: updateProfileActions.updateProfileRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProfilePage))
