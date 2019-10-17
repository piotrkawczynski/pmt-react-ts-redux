import classnames from "classnames"
import { Form, Formik, FormikActions, FormikProps } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"

import { createIssueActions } from "../../store/issue/issueActions"
import { ApplicationState } from "../../store/redux"
import { LoaderImage } from "../../types/loaderImage"
import AttachmentForm from "../AttachmentForm/AttachmentForm"
import Dropdown, { Option } from "../Dropdown/Dropdown"
import Input from "../Inputs/Input/Input"
import Modal from "../Modal/Modal"

import styles from "./CreateIssueModal.module.scss"

interface PropsFromDispatch {
  createIssueRequest: typeof createIssueActions.createIssueRequest
}

interface InnerProps {
  projectId: number
  sprintId: number | null
  userList: ApplicationState["user"]["users"]["data"]
  tagList: ApplicationState["tag"]["tagList"]["data"]
  statusList: ApplicationState["status"]["statusList"]["data"]
  permissionList: ApplicationState["permission"]["permissionList"]["data"]
  onCancel?: () => void
  onCreate?: () => void
}

type CreateIssueModalProps = PropsFromDispatch & InnerProps

export interface CreateIssueFormValues {
  attachment: LoaderImage[]
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number | null
  title: string
  description: string
}

class CreateIssueModal extends Component<
  CreateIssueModalProps,
  CreateIssueFormValues
> {
  private readonly statusOptions: Option[]
  private readonly userOptions: Option[]
  private readonly tagOptions: Option[]

  constructor(props: CreateIssueModalProps) {
    super(props)

    this.statusOptions = props.statusList!.map((status) => {
      return { label: status.name, value: status.id.toString() } as Option
    })

    this.userOptions = props.userList!.map((user) => {
      return {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id.toString(),
      } as Option
    })

    this.tagOptions = props.tagList!.map((tag) => {
      return {
        label: tag.name,
        value: tag.id.toString(),
      } as Option
    })

    this.state = {
      attachment: [],
      statusId: Number(this.statusOptions[0].value),
      tagId: Number(this.statusOptions[0].value),
      assigneeId: Number(this.userOptions[0].value),
      reviewerId: null,
      title: "",
      description: "",
    }
  }

  handleSelect = (
    formikProps: FormikProps<CreateIssueFormValues>,
    key: keyof CreateIssueFormValues
  ) => (option: Option) => {
    if (!option || Array.isArray(option)) {
      return
    }

    formikProps.setFieldValue(key, option.value)
  }

  handleSubmit = (
    values: CreateIssueFormValues,
    formikActions: FormikActions<CreateIssueFormValues>
  ) => {
    const { projectId, sprintId } = this.props

    this.props.createIssueRequest(values, projectId, sprintId!)
    formikActions.setSubmitting(false)
    this.props.onCancel!()
  }

  render() {
    return (
      <Modal>
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          enableReinitialize
        >
          {(formikProps) => {
            return (
              <Form>
                <div className={styles.containerWrapper}>
                  <div className={styles.leftSideWrapper}>
                    {this.renderLeftSideForm(formikProps)}
                  </div>
                  <div className={styles.rightSideWrapper}>
                    {this.renderRightSideForm(formikProps)}
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    )
  }

  private renderLeftSideForm = (
    formikProps: FormikProps<CreateIssueFormValues>
  ) => {
    return (
      <div>
        <h2 className={styles.title}>Create issue</h2>
        <Input
          containerClassName={styles.titleInput}
          placeholder="Title"
          type="text"
          name="title"
          label="Title"
          onChange={formikProps.handleChange}
        />
        <Input
          inputClassName={styles.descriptionInput}
          containerClassName={styles.descriptionInputContainer}
          placeholder="Description"
          type="textarea"
          textarea
          name="description"
          label="Description"
          onChange={formikProps.handleChange}
        />
        <AttachmentForm
          formikProps={formikProps}
          name="attachment"
          attachmentList={formikProps.values.attachment}
        />
        <div className={styles.buttonsWrapper}>
          <Button
            type="button"
            className="simple-button"
            style={{ fontSize: "14px", alignSelf: "flex-start" }}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={classnames("simple-button", styles.createButton)}
            style={{ fontSize: "14px", alignSelf: "flex-start" }}
          >
            Create issue
          </Button>
        </div>
      </div>
    )
  }

  private renderRightSideForm = (
    formikProps: FormikProps<CreateIssueFormValues>
  ) => {
    const {
      assigneeValue,
      reviewerValue,
      statusValue,
      tagValue,
    } = this.getDropdownValues(formikProps)

    return (
      <div>
        <Dropdown
          label="status"
          options={this.statusOptions}
          onSelect={this.handleSelect(formikProps, "statusId")}
          value={statusValue}
        />
        <Dropdown
          label="tag"
          options={this.tagOptions}
          onSelect={this.handleSelect(formikProps, "tagId")}
          value={tagValue}
        />
        <Dropdown
          label="assignee"
          options={this.userOptions}
          onSelect={this.handleSelect(formikProps, "assigneeId")}
          value={assigneeValue}
        />
        <Dropdown
          label="reviewer"
          options={this.userOptions}
          onSelect={this.handleSelect(formikProps, "reviewerId")}
          value={reviewerValue}
        />
      </div>
    )
  }

  private getDropdownValues = (
    formikProps: FormikProps<CreateIssueFormValues>
  ) => {
    const { assigneeId, reviewerId, statusId, tagId } = formikProps.values

    const statusValue =
      this.statusOptions.find(
        (status) => status.value === statusId.toString()
      ) || this.statusOptions[0]

    const tagValue =
      this.tagOptions.find((tag) => tag.value === tagId.toString()) ||
      this.tagOptions[0]

    const assigneeValue =
      this.userOptions.find((user) => user.value === assigneeId.toString()) ||
      this.userOptions[0]

    const reviewerValue =
      (reviewerId &&
        this.userOptions.find(
          (user) => user.value === reviewerId!.toString()
        )) ||
      null

    return { statusValue, tagValue, assigneeValue, reviewerValue }
  }
}

const mapDispatchToProps = {
  createIssueRequest: createIssueActions.createIssueRequest,
}

export default connect(
  null,
  mapDispatchToProps
)(CreateIssueModal)
