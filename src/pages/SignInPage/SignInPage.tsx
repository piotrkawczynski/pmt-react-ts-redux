import classnames from "classnames"
import { Form, Formik, FormikActions } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import * as Yup from "yup"
import Input from "../../components/Inputs/Input/Input"
import { loginActions } from "../../store/user/userActions"

import styles from "./SignInPage.module.scss"

interface PropsFromDispatch {
  loginActionsRequest: typeof loginActions.loginRequest
}

type SignInPageProps = PropsFromDispatch

const INITIAL_VALUES = {
  email: "",
  password: "",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password need to be minimum 8 length"),
})

export interface SignInFormValues {
  email: string
  password: string
}

class SignInPage extends Component<SignInPageProps> {
  onSubmit = (
    values: SignInFormValues,
    formikActions: FormikActions<SignInFormValues>
  ) => {
    this.props.loginActionsRequest(values, formikActions)
  }

  render() {
    return (
      <div className={styles.containerWrapper}>
        <h2 className={styles.logo}>Project Management Tool</h2>
        <p className={styles.title}>Sign In</p>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={this.onSubmit}
          >
            {({
              touched,
              errors,
              handleChange,
            }) => (
              <Form>
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Email"
                  type="text"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  error={errors.email && touched.email && errors.email}
                />
                <Input
                  containerClassName={styles.inputWrapper}
                  placeholder="Password"
                  type="text"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  error={errors.password && touched.password && errors.password}
                />
                <div
                  className={classnames(
                    styles.linkWrapper,
                    styles.forgotPassword
                  )}
                >
                  <Link to="/remain-password" className="link">
                    Forgot password
                  </Link>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button type="submit" className="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={classnames(styles.linkWrapper, styles.loginLink)}>
          <Link to={"/register"} className="link">
            Direct me to sign up
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginActionsRequest: loginActions.loginRequest,
}

export default connect(
  null,
  mapDispatchToProps
)(SignInPage)
