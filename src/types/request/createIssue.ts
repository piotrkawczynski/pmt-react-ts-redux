export interface CreateIssue {
  attachment: File[]
  statusId: number
  tagId: number
  assigneeId: number
  reviewerId: number | null
  title: string
  description: string
  projectId: number
  sprintId: number
}
