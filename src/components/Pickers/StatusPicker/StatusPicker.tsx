import classnames from "classnames"
import React, { Component } from "react"
import { Button } from "reactstrap"
import { Formik, FormikActions, Form } from "formik"

import FormContainer from "../../FormContainer/FormContainer"
import Input from "../../Inputs/Input/Input"
import { createStatusActions } from "../../../store/status/statusActions"
import { StatusFormValues } from "../../../pages/FulfillProjectPage/FulfillProjectPage"

import styles from "./StatusPicker.module.scss"

interface StatusPickerProps {
  createStatusRequest: typeof createStatusActions.createStatusRequest
  projectId: number
  statuses: StatusFormValues[]
}

interface StatusPickerState {
  initialValues: StatusFormValues
}

const INITIAL_VALUES: StatusFormValues = {
  name: "",
  order: 1,
}

class StatusPicker extends Component<StatusPickerProps, StatusPickerState> {
  constructor(props: StatusPickerProps) {
    super(props)

    this.state = {
      initialValues: INITIAL_VALUES,
    }
  }

  componentDidUpdate(prevProps: StatusPickerProps) {
    const { statuses: currentStatuses } = this.props

    const { statuses: prevStatuses } = prevProps

    if (currentStatuses.length !== prevStatuses.length) {
      this.setState({
        initialValues: {
          ...INITIAL_VALUES,
          order: currentStatuses.length + 1,
        },
      })
    }
  }

  onSubmit = (
    values: StatusFormValues,
    formikActions: FormikActions<StatusFormValues>
  ) => {
    const { setFieldError, setSubmitting } = formikActions
    const { createStatusRequest, projectId, statuses } = this.props

    const status = statuses.find(({ name }) => name === values.name)

    if (!status) {
      createStatusRequest(
        projectId,
        values,
        this.setFormValues(formikActions, values.order)
      )
      setSubmitting(false)
    } else {
      setFieldError("email", "User email already added")
    }
  }

  setFormValues = (
    formikActions: FormikActions<StatusFormValues>,
    order: number
  ) => () => {
    formikActions.setValues({
      name: "",
      order: order + 1,
    })
  }

  render() {
    return (
      <Formik
        initialValues={this.state.initialValues}
        enableReinitialize
        onSubmit={this.onSubmit}
      >
        {() => {
          return (
            <FormContainer
              label={"add your kanban statuses"}
              containerClassName={styles.formContainer}
            >
              <Form>
                <div className={styles.inputsWrapper}>
                  <Input
                    type="text"
                    containerClassName={styles.input}
                    label="status"
                    name="name"
                  />
                  <Input
                    type="text"
                    containerClassName={styles.input}
                    label="order"
                    name="order"
                    isDisabled={true}
                  />
                </div>
                <Button
                  type="submit"
                  className={classnames("button", styles.button)}
                >
                  Add status
                </Button>
              </Form>
            </FormContainer>
          )
        }}
      </Formik>
    )
  }
}

export default StatusPicker
