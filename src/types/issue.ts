export interface Issue {
  assigneeId: number
  authorId: number
  code: number
  createdAt: string
  description: string
  id: number
  projectId: number
  reviewerId: number
  sprintId: number | null
  statusId: number
  tagId: number
  title: string
  updatedAt: string
}

export interface IssueDetails extends Issue{
  attachments: string[]
}