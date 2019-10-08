import { Formik } from "formik"
import React, { Component } from "react"
import { connect } from "react-redux"

import { ApplicationState } from "../../store/redux"
import { LoaderImage } from "../../types/loaderImage"
import AttachmentPreview from "../AttachmentPreview/AttachmentPreview"
import ImageUploader from "../ImageUploader/ImageUploader"
import Input from "../Inputs/Input/Input"

import styles from "./CommentInput.module.scss"
import { Button } from "reactstrap"
import classnames from "classnames"
import * as Yup from "yup"
import { createCommentActions } from "../../store/comment/commentActions"

interface CommentInputProps {
  createCommentRequest: typeof createCommentActions.createCommentRequest
  issueId: number
}

interface CommentInputState {
  attachments: LoaderImage[]
  comment: string
  permission: string
}

export interface CommentInputForm {
  attachments: LoaderImage[]
  comment: string
}

const INITIAL_VALUES = {
  attachments: [],
  comment: "",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  comment: Yup.string().required("Comment cannot be empty"),
})

class CommentInput extends Component<CommentInputProps, CommentInputState> {
  constructor(props: CommentInputProps) {
    super(props)
    this.state = {
      comment: "",
      permission: "ALL",
      attachments: [],
    }
  }

  componentDidMount() {}

  // handleOnClick = () => {
  //   const { sendComment } = this.props
  //   const { description, permission, imageList } = this.state
  //   if (description || imageList) {
  //     sendComment({ description, permission, imageList })
  //   }
  // }

  handleSubmit = (values: CommentInputForm) => {
    const { attachments, comment } = values
    const { issueId, createCommentRequest } = this.props

    createCommentRequest({ comment, attachments }, issueId)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={this.handleSubmit}
        >
          {(formikProps) => {
            console.log(formikProps.values)
            console.log(formikProps.errors)

            return (
              <>
                <div className={styles.inputsWrapper}>
                  <Input
                    inputClassName={styles.commentInput}
                    containerClassName={styles.commentInputWrapper}
                    type="textarea"
                    name="comment"
                    label="Create comment"
                    textarea
                  />
                  {/*<Input type="checkbox" name="permission" label="Team only" />*/}
                  <ImageUploader
                    name="attachments"
                    formikProps={formikProps}
                    errorMessage=""
                  />

                  <Button
                    type="button"
                    className={classnames(
                      "simple-button",
                      styles.createComment
                    )}
                    style={{ fontSize: "14px" }}
                    onClick={formikProps.submitForm}
                  >
                    Comment
                  </Button>
                </div>
                <div className={styles.attachmentWrapper}>
                  {formikProps.values.attachments.map(
                    (attachment: LoaderImage, index) => {
                      return (
                        attachment && (
                          <AttachmentPreview
                            imageClassName={styles.image}
                            key={`commentAttachmentPreview-${index}`}
                            alternativeText={`commentAttachmentPreview-${index}`}
                            loaderImage={attachment}
                            handleOnDelete={() => {
                              const attachments = [
                                ...formikProps.values.attachments,
                              ]

                              formikProps.setFieldValue("attachments", [
                                ...attachments.slice(0, index),
                                ...attachments.slice(index + 1),
                              ])
                            }}
                          />
                        )
                      )
                    }
                  )}
                </div>
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
  createCommentRequest: createCommentActions.createCommentRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInput)
