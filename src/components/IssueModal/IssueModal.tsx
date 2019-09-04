import React, { Component } from "react"
import Modal from "../Modal/Modal"

import styles from "./IssueModal.module.scss"
import { Button } from "reactstrap"
import Dropdown, { Option } from "../Dropdown/Dropdown"
import { getStatusListActions } from "../../store/status/statusActions"
import { connect } from "react-redux"
import { ApplicationState } from "../../store/redux"
import { PERMISSION_LIST } from "../../consts/userPermission"
import { Form, Formik, FormikProps } from "formik"
import Input from "../Inputs/Input/Input"

interface PropsFromDispatch {
  getStatusListRequest: typeof getStatusListActions.getStatusListRequest
}

interface PropsFromState {}

interface InnerProps {
  userList: ApplicationState["user"]["users"]["data"]
  tagList: ApplicationState["tag"]["tagList"]["data"]
  statusList: ApplicationState["status"]["statusList"]["data"]
  permissionList: ApplicationState["permission"]["permissionList"]["data"]
}

type IssueModalProps = PropsFromDispatch & PropsFromState & InnerProps

interface IssueFormValues {
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number
  title: string
  description: string
}

const INITIAL_VALUES: IssueFormValues = {
  statusId: 1,
  tagId: 1,
  assigneeId: 1,
  reviewerId: 1,
  title: "Issue title",
  description: "Description text",
}

class IssueModal extends Component<IssueModalProps> {
  private readonly statusListOptions: Option[]
  private readonly userListOptions: Option[]

  constructor(props: IssueModalProps) {
    super(props)

    console.log("props", props)

    this.statusListOptions = props.statusList!.map((status) => {
      return { label: status.name, value: status.id.toString() } as Option
    })

    this.userListOptions = props.userList!.map((user) => {
      return {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id.toString(),
      } as Option
    })
  }

  componentDidMount() {}

  handleSelect = (
    formikProps: FormikProps<IssueFormValues>,
    key: keyof IssueFormValues
  ) => (option: Option) => {
    if (!option || Array.isArray(option)) {
      return
    }

    formikProps.setFieldValue(key, option.value)
  }

  handleSubmit = (values: IssueFormValues) => {}

  render() {
    console.log("this.props", this.props)

    return (
      <Modal>
        <Formik initialValues={INITIAL_VALUES} onSubmit={this.handleSubmit}>
          {(formikProps) => {
            const statusValue =
              this.statusListOptions.find(
                (status) =>
                  status.value === formikProps.values.statusId.toString()
              ) || this.statusListOptions[0]

            const assigneeValue =
              this.userListOptions.find(
                (status) =>
                  status.value === formikProps.values.assigneeId.toString()
              ) || this.userListOptions[0]

            const reviewerValue =
              this.userListOptions.find(
                (status) =>
                  status.value === formikProps.values.reviewerId.toString()
              ) || this.userListOptions[0]

            return (
              <div className={styles.containerWrapper}>
                <div className={styles.contentWrapper}>
                  <div>Create issue</div>
                  <div className={styles.dropdownWrapper}>
                    <Dropdown
                      label="status"
                      options={this.statusListOptions}
                      onSelect={this.handleSelect(formikProps, "statusId")}
                      value={statusValue}
                    />
                  </div>
                  <div className={styles.inlineSection}>
                    <div className={styles.multipleDropdownWrapper}>
                      <Dropdown
                        label="assingee"
                        options={this.userListOptions}
                        onSelect={this.handleSelect(formikProps, "assigneeId")}
                        value={assigneeValue}
                      />
                    </div>
                    <div className={styles.multipleDropdownWrapper}>
                      <Dropdown
                        label="reviewer"
                        options={this.userListOptions}
                        onSelect={this.handleSelect(formikProps, "reviewerId")}
                        value={reviewerValue}
                      />
                    </div>
                  </div>
                  <Input
                    className={styles.inputWrapper}
                    placeholder="Title"
                    type="text"
                    name="title"
                    label="Title"
                    onChange={formikProps.handleChange}
                  />
                  <Input
                    className={styles.inputWrapper}
                    placeholder="Description"
                    type="textarea"
                    name="description"
                    label="Description"
                    onChange={formikProps.handleChange}
                  />
                  {/*<CreateIssueAttachmentInput onSave={() => {}} onChange={this.handleOnChange} />*/}
                  <Button
                    className={"simple-button"}
                    style={{ fontSize: "0.8rem", alignSelf: "flex-start" }}
                  >
                    Create issue
                  </Button>
                </div>
              </div>
            )
          }}
        </Formik>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = {
  getStatusListRequest: getStatusListActions.getStatusListRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueModal)
