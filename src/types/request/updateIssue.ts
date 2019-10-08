export interface UpdateIssue {
  attachmentUrls: string[]
  attachment: File[]
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number | null
  title: string
  description: string
  id: number
}
