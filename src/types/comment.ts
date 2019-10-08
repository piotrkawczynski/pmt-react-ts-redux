export interface Comment {
  id: number
  issueId: number
  authorId: number
  description: string
  permissionId: number
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}
