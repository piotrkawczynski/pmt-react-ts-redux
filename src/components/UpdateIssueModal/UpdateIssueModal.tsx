import classnames from "classnames"
import { Form, Formik, FormikActions, FormikProps } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"

import {
  getIssueActions,
  updateIssueActions,
} from "../../store/issue/issueActions"
import { ApplicationState } from "../../store/redux"
import { LoaderImage } from "../../types/loaderImage"
import Dropdown, { Option } from "../Dropdown/Dropdown"
import Input from "../Inputs/Input/Input"
import Modal from "../Modal/Modal"

import {
  createCommentActions,
  getCommentListActions,
} from "../../store/comment/commentActions"
import AttachmentForm from "../AttachmentForm/AttachmentForm"
import CommentInput from "../CommentInput/CommentInput"
import CommentList from "../CommentList/CommentList"
import styles from "./UpdateIssueModal.module.scss"

interface PropsFromDispatch {
  updateIssueRequest: typeof updateIssueActions.updateIssueRequest
  getIssueRequest: typeof getIssueActions.getIssueRequest
  getCommentListRequest: typeof getCommentListActions.getCommentListRequest
}

interface PropsFromState {
  commentList: ApplicationState["comment"]["commentList"]
  issue: ApplicationState["issue"]["issue"]
}

interface InnerProps {
  setIssueId: (issueId: number | null) => void
  issueId: number
  projectId: number
  sprintId: number | null
  userList: ApplicationState["user"]["users"]["data"]
  tagList: ApplicationState["tag"]["tagList"]["data"]
  statusList: ApplicationState["status"]["statusList"]["data"]
  permissionList: ApplicationState["permission"]["permissionList"]["data"]
  onCancel?: () => void
  onCreate?: () => void
}

type UpdateIssueModalProps = PropsFromDispatch & PropsFromState & InnerProps

export interface UpdateIssueFormValues {
  attachment: LoaderImage[]
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number | null
  title: string
  description: string
}

// tslint:disable-next-line:no-empty-interface
interface UpdateIssueModalState extends UpdateIssueFormValues {}

class UpdateIssueModal extends Component<
  UpdateIssueModalProps,
  UpdateIssueModalState
> {
  private readonly statusOptions: Option[]
  private readonly userOptions: Option[]
  private readonly tagOptions: Option[]

  constructor(props: UpdateIssueModalProps) {
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

  componentDidMount() {
    const { issueId, getIssueRequest, getCommentListRequest } = this.props

    getIssueRequest(issueId)
    getCommentListRequest(issueId)
  }

  componentDidUpdate(prevProps: UpdateIssueModalProps) {
    if (
      prevProps.issue.status === "loading" &&
      this.props.issue.status === "success"
    ) {
      const {
        statusId,
        assigneeId,
        tagId,
        reviewerId,
        title,
        description,
        code,
        attachments,
      } = this.props.issue.data!

      const issue: UpdateIssueFormValues = {
        assigneeId,
        description,
        statusId,
        tagId,
        reviewerId,
        title,
        attachment: attachments.map(
          (attachment) =>
            ({
              file: null,
              previewUrl: attachment,
            } as LoaderImage)
        ),
      }

      this.setState({ ...issue })
    }
  }

  componentWillUnmount() {
    this.props.setIssueId(null)
  }

  handleSelect = (
    formikProps: FormikProps<UpdateIssueFormValues>,
    key: keyof UpdateIssueFormValues
  ) => (option: Option) => {
    if (!option || Array.isArray(option)) {
      return
    }

    formikProps.setFieldValue(key, option.value)
  }

  handleSubmit = (
    values: UpdateIssueFormValues,
    formikActions: FormikActions<UpdateIssueFormValues>
  ) => {
    const { issueId, updateIssueRequest } = this.props

    updateIssueRequest(values, issueId)
    formikActions.setSubmitting(false)
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
    formikProps: FormikProps<UpdateIssueFormValues>
  ) => {
    const {
      commentList,
      permissionList,
      userList,
    } = this.props

    return (
      <div>
        <h2 className={styles.title}>Update issue</h2>
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
        <CommentList
          commentList={commentList}
          userList={userList}
          permissionList={permissionList}
        />
        <CommentInput issueId={this.props.issueId} />
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
            Update issue
          </Button>
        </div>
      </div>
    )
  }

  private renderRightSideForm = (
    formikProps: FormikProps<UpdateIssueFormValues>
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
    formikProps: FormikProps<UpdateIssueFormValues>
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

const mapStateToProps = (state: ApplicationState) => ({
  issue: state.issue.issue,
  commentList: state.comment.commentList,
})

const mapDispatchToProps = {
  getIssueRequest: getIssueActions.getIssueRequest,
  updateIssueRequest: updateIssueActions.updateIssueRequest,
  getCommentListRequest: getCommentListActions.getCommentListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateIssueModal)
