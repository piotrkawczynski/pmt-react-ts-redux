import produce from "immer"
import React, { Component } from "react"

import {
  FulfillProjectPageState,
  TagFormValues,
} from "../../../pages/FulfillProjectPage/FulfillProjectPage"
import { deleteTagActions } from "../../../store/tag/tagActions"
import FormContainer from "../../FormContainer/FormContainer"
import TagItemPreview from "./TagItemPreview/TagItemPreview"

import styles from "./TagListPreview.module.scss"

interface TagListPreviewProps {
  tags: TagFormValues[]
  fulfillmentState: FulfillProjectPageState
  updateState: (state: FulfillProjectPageState) => void
  deleteTagRequest: typeof deleteTagActions.deleteTagRequest
}

class TagListPreview extends Component<TagListPreviewProps> {
  handleOnDelete = (id: number) => () => {
    const { fulfillmentState, updateState, deleteTagRequest } = this.props

    const nextState = produce(fulfillmentState, (draft) => {
      const tagIndex = draft.tags.findIndex(
        (draftElement) => draftElement.id === id
      )
      draft.tags.splice(tagIndex, 1)
    })

    deleteTagRequest(id, () => updateState(nextState))
  }

  render() {
    const { tags } = this.props

    return (
      <FormContainer label={"here will appear tags"}>
        <div className={styles.createdTagList}>
          {tags &&
            tags.map((tag) => (
              <TagItemPreview
                key={tag.id}
                tag={tag}
                handleOnDelete={this.handleOnDelete(tag.id!)}
              />
            ))}
        </div>
      </FormContainer>
    )
  }
}

export default TagListPreview
