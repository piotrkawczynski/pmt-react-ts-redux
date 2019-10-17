import classnames from "classnames"
import { Form, Formik } from "formik"
import * as queryString from "querystring"
import React from "react"
import { connect } from "react-redux"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Button } from "reactstrap"
import * as Yup from "yup"

import Input from "../../components/Inputs/Input/Input"
import { changePasswordActions } from "../../store/user/userActions"

import styles from "../SignInPage/SignInPage.module.scss"

interface PropsFromDispatch {
  changePasswordActionRequest: typeof changePasswordActions.changePasswordRequest
}

type ChangePasswordPageProps = PropsFromDispatch & RouteComponentProps

const INITIAL_VALUES: ChangePasswordFormValues = {
  password: "",
  confirmPassword: "",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password need to be minimum 8 length"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Confirm password is required"),
})

export interface ChangePasswordFormValues {
  password: string
  confirmPassword: string
}

class ChangePasswordPage extends React.Component<ChangePasswordPageProps> {
  private readonly token: string

  constructor(props: ChangePasswordPageProps) {
    super(props)

    const { location } = props

    const searchParams = queryString.parse(location.search.substring(1))

    this.token = typeof searchParams.token === "string" ? searchParams.token : ""
  }

  render() {
    return (
      <div className={styles.containerWrapper}>
        <h2 className={styles.logo}>Project Management Tool</h2>
        <p className={styles.title}>Change password</p>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={this.onSubmit}
          >
            {(formikProps) => {
              const { isSubmitting, handleChange } = formikProps

              return (
                <Form>
                  <Input
                    containerClassName={styles.inputWrapper}
                    placeholder="Password"
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                  />
                  <Input
                    containerClassName={styles.inputWrapper}
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    label="Confirm password"
                    onChange={handleChange}
                  />
                  <div className={styles.buttonWrapper}>
                    <Button
                      type="submit"
                      className="button"
                      disabled={isSubmitting}
                    >
                      Change password
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
        <div className={classnames(styles.linkWrapper, styles.loginLink)}>
          <Link to={"/login"} className="link">
            Direct me to Log in
          </Link>
        </div>
      </div>
    )
  }

  private onSubmit = (values: ChangePasswordFormValues) => {
    const { changePasswordActionRequest } = this.props
    changePasswordActionRequest(values, this.token)
  }
}

const mapDispatchToProps = {
  changePasswordActionRequest: changePasswordActions.changePasswordRequest,
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ChangePasswordPage)
)
