import classnames from "classnames"
import { Form, Formik, FormikActions } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import * as Yup from "yup"

import Input from "../../components/Inputs/Input/Input"
import { registerActions } from "../../store/user/userActions"

import styles from "../SignInPage/SignInPage.module.scss"

interface PropsFromDispatch {
  registerActionRequest: typeof registerActions.registerRequest
}

type RegisterPageProps = PropsFromDispatch

const INITIAL_VALUES: RegisterFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Confirm password is required"),
})

export interface RegisterFormValues {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}

class RegisterPage extends React.Component<RegisterPageProps> {

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
                      Sign up
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
  private onSubmit = (
    values: RegisterFormValues,
    formikActions: FormikActions<RegisterFormValues>
  ) => {
    const { registerActionRequest } = this.props
    registerActionRequest(values, formikActions)
  }
}

const mapDispatchToProps = {
  registerActionRequest: registerActions.registerRequest,
}

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage)
