import classnames from "classnames"
import { Form, Formik, FormikActions } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import * as Yup from "yup"

import Input from "../../components/Inputs/Input/Input"
import { ApplicationState } from "../../store/redux"
import { remainPasswordActions } from "../../store/user/userActions"

import styles from "./RemainPasswordPage.module.scss"

interface PropsFromDispatch {
  remainPasswordRequest: typeof remainPasswordActions.remainPasswordRequest
}

type RemainPasswordPageProps = PropsFromDispatch

const INITIAL_VALUES = {
  email: "",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Wrong email format"),
})

export interface RemainPasswordFormValues {
  email: string
}

class RemainPasswordPage extends Component<RemainPasswordPageProps> {
  componentDidMount() {}

  onSubmit = (
    values: RemainPasswordFormValues,
    formikActions: FormikActions<RemainPasswordFormValues>
  ) => {
    this.props.remainPasswordRequest(values.email)

    formikActions.setSubmitting(false)
  }

  render() {
    return (
      <div className={styles.containerWrapper}>
        <h2 className={styles.logo}>Project Management Tool</h2>
        <p className={styles.title}>Remain password</p>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={this.onSubmit}
          >
            {({ touched, errors, handleChange }) => (
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
                <div className={styles.buttonWrapper}>
                  <Button type="submit" className="button">
                    Send mail
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={classnames(styles.linkWrapper, styles.loginLink)}>
          <Link to={"/login"} className="link">
            Direct me to sign in
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = {
  remainPasswordRequest: remainPasswordActions.remainPasswordRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemainPasswordPage)
