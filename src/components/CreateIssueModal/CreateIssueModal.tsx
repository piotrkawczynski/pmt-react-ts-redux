import classnames from "classnames"
import { Formik, FormikProps, Form, FormikActions } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"

import { createIssueActions } from "../../store/issue/issueActions"
import { ApplicationState } from "../../store/redux"
import { getStatusListActions } from "../../store/status/statusActions"
import { LoaderImage } from "../../types/loaderImage"
import AttachmentPreview from "../AttachmentPreview/AttachmentPreview"
import Dropdown, { Option } from "../Dropdown/Dropdown"
import ImageUploader from "../ImageUploader/ImageUploader"
import Input from "../Inputs/Input/Input"
import Modal from "../Modal/Modal"

import styles from "./CreateIssueModal.module.scss"

interface PropsFromDispatch {
  createIssueRequest: typeof createIssueActions.createIssueRequest
}

interface PropsFromState {}

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

type CreateIssueModalProps = PropsFromDispatch & PropsFromState & InnerProps

export interface CreateIssueFormValues {
  attachment: LoaderImage[]
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number | null
  title: string
  description: string
}

// tslint:disable-next-line:no-empty-interface
interface CreateIssueModalState extends CreateIssueFormValues {}

class CreateIssueModal extends Component<CreateIssueModalProps, CreateIssueModalState> {
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

  componentDidMount() {}

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
  }

  render() {
    return (
      <Modal>
        <Formik initialValues={this.state} onSubmit={this.handleSubmit}>
          {(formikProps) => {
            console.log("values", formikProps.values)

            const {
              attachment,
              assigneeId,
              reviewerId,
              statusId,
              tagId,
            } = formikProps.values

            const statusValue =
              this.statusOptions.find(
                (status) => status.value === statusId.toString()
              ) || this.statusOptions[0]

            const tagValue =
              this.tagOptions.find((tag) => tag.value === tagId.toString()) ||
              this.tagOptions[0]

            const assigneeValue =
              this.userOptions.find(
                (user) => user.value === assigneeId.toString()
              ) || this.userOptions[0]

            const reviewerValue =
              (reviewerId &&
                this.userOptions.find(
                  (user) => user.value === reviewerId!.toString()
                )) ||
              null

            return (
              <Form>
                <div className={styles.containerWrapper}>
                  <div className={styles.contentWrapper}>
                    <div>Create issue</div>

                    <div className={styles.inlineSection}>
                      <div className={styles.dropdownWrapper}>
                        <Dropdown
                          label="status"
                          options={this.statusOptions}
                          onSelect={this.handleSelect(formikProps, "statusId")}
                          value={statusValue}
                        />
                      </div>
                      <div className={styles.multipleDropdownWrapper}>
                        <Dropdown
                          label="tag"
                          options={this.tagOptions}
                          onSelect={this.handleSelect(formikProps, "tagId")}
                          value={tagValue}
                        />
                      </div>
                    </div>
                    <div className={styles.inlineSection}>
                      <div className={styles.multipleDropdownWrapper}>
                        <Dropdown
                          label="assignee"
                          options={this.userOptions}
                          onSelect={this.handleSelect(
                            formikProps,
                            "assigneeId"
                          )}
                          value={assigneeValue}
                        />
                      </div>
                      <div className={styles.multipleDropdownWrapper}>
                        <Dropdown
                          label="reviewer"
                          options={this.userOptions}
                          onSelect={this.handleSelect(
                            formikProps,
                            "reviewerId"
                          )}
                          value={reviewerValue}
                        />
                      </div>
                    </div>
                    <Input
                      containerClassName={styles.inputWrapper}
                      placeholder="Title"
                      type="text"
                      name="title"
                      label="Title"
                      onChange={formikProps.handleChange}
                    />
                    <Input
                      containerClassName={styles.inputWrapper}
                      placeholder="Description"
                      type="textarea"
                      name="description"
                      label="Description"
                      onChange={formikProps.handleChange}
                    />
                    <div className={styles.imageUploaderWrapper}>
                      <label htmlFor="attachment" className={styles.label}>
                        Attachments
                      </label>
                      <div className={styles.imagesWrapper}>
                        {attachment &&
                          attachment.map((image, index) => (
                            <AttachmentPreview
                              key={`attachmentPreview-${index}`}
                              alternativeText={`attachmentPreview-${index}`}
                              loaderImage={image}
                              handleOnDelete={() => {
                                const attachments = attachment

                                formikProps.setFieldValue("attachment", [
                                  ...attachments.slice(0, index),
                                  ...attachments.slice(index + 1),
                                ])
                              }}
                            />
                          ))}
                        {!attachment.length && (
                          <ImageUploader
                            formikProps={formikProps}
                            name="attachment"
                            multipleImages
                            errorMessage="File rejected"
                          />
                        )}
                      </div>
                    </div>
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
                        className={classnames(
                          "simple-button",
                          styles.createButton
                        )}
                        style={{ fontSize: "14px", alignSelf: "flex-start" }}
                      >
                        Create
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

const mapDispatchToProps = {
  createIssueRequest: createIssueActions.createIssueRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateIssueModal)
