import React, { Component } from "react"
import { Formik, Form } from "formik"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import classnames from "classnames"
import * as Yup from "yup"

import { ApplicationState } from "../../store/redux"
import { createProjectActions } from "../../store/project/projectActions"

import ProjectPicker from "../../components/Pickers/ProjectPicker/ProjectPicker"
import FormContainer from "../../components/FormContainer/FormContainer"
import ProjectPreview from "../../components/Previews/ProjectPreview/ProjectPreview"

import styles from "./CreateProjectPage.module.scss"

interface PropsFromState {}

interface PropsFromDispatch {
  createProjectRequest: typeof createProjectActions.createProjectRequest
}

type CreateProjectPageProps = PropsFromDispatch & PropsFromState

export interface CreateProjectPageFormValues {
  name: string
  company: string
  sprintDuration: number
  avatar: File | null
  label: string
  color: string
}

const INITIAL_VALUES: CreateProjectPageFormValues = {
  name: "Project",
  company: "Company",
  sprintDuration: 7,
  avatar: null,
  label: "title label",
  color: "#FFFFFF",
}

const VALIDATION_SCHEMA = Yup.object<CreateProjectPageFormValues>().shape({
  name: Yup.string().required(),
  company: Yup.string().required(),
  sprintDuration: Yup.string().required(),
  avatar: Yup.mixed().required(),
  title: Yup.string().required(),
  color: Yup.string().required(),
})

class CreateProjectPage extends Component<CreateProjectPageProps> {
  onSubmit = (values: CreateProjectPageFormValues) => () => {
    this.props.createProjectRequest(values)
  }

  render() {
    return (
      <div className={styles.createProject}>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={this.onSubmit}
          validationSchema={VALIDATION_SCHEMA}
        >
          {(formikProps) => {

            return (
              <>
                <Form>
                  <ProjectPicker formikProps={formikProps} />
                  <FormContainer
                    label={"here You will see the project setting changes"}
                    containerClassName={styles.formContainer}
                  >
                    <ProjectPreview project={formikProps.values} />
                  </FormContainer>
                  <Button
                    type="button"
                    className={classnames("button", styles.submitButton)}
                    onClick={this.onSubmit(formikProps.values)}
                  >
                    Create project
                  </Button>
                </Form>
              </>
            )
          }}
        </Formik>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = {
  createProjectRequest: createProjectActions.createProjectRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectPage)
