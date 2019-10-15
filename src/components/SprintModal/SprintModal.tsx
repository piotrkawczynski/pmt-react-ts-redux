import classnames from "classnames"
import { format } from "date-fns"
import { Form, Formik } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"

import { ApplicationState } from "../../store/redux"
import { LoaderImage } from "../../types/loaderImage"
import Input from "../Inputs/Input/Input"
import Modal from "../Modal/Modal"

import styles from "./SprintModal.module.scss"

interface PropsFromDispatch {}

interface PropsFromState {}

interface InnerProps {
  initialValues?: SprintFormValues
  projectId: number
  onCancel?: () => void
  onSubmit: (values: SprintFormValues) => void
}

type SprintModalProps = PropsFromDispatch & PropsFromState & InnerProps

export interface SprintFormValues {
  dateFrom: string
  dateTo: string
  description: string
}

interface SprintModalState {
  formValues: SprintFormValues
}

class SprintModal extends Component<SprintModalProps, SprintModalState> {
  constructor(props: SprintModalProps) {
    super(props)

    console.log("sprint moda", props)

    this.state = {
      formValues: {
        dateFrom: format(new Date(), "yyyy-MM-dd"),
        dateTo: format(new Date(), "yyyy-MM-dd"),
        description: "",
        ...props.initialValues,
      },
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { initialValues, onSubmit, onCancel } = this.props

    const title = initialValues ? "Update sprint" : "Create sprint"

    return (
      <Modal alignCenter>
        <Formik
          initialValues={this.state.formValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formikProps) => {
            return (
              <Form>
                <div className={styles.containerWrapper}>
                  <div className={styles.card}>
                    <h2 className={styles.title}>{title}</h2>
                    <div>
                      <div className={styles.datesWrapper}>
                        <Input type="date" name="dateFrom" label="Start date" />
                        <Input type="date" name="dateTo" label="End date" />
                      </div>
                      <Input
                        type="text"
                        name="description"
                        label="Description"
                      />
                    </div>
                    <div className={styles.buttonsWrapper}>
                      {onCancel && (
                        <Button
                          type="button"
                          className="simple-button"
                          style={{ fontSize: "14px" }}
                          onClick={onCancel}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        type="submit"
                        className={classnames(
                          "simple-button",
                          styles.submitButton
                        )}
                        style={{ fontSize: "14px" }}
                      >
                        {title}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SprintModal)
