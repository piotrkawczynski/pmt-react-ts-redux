export interface CreateComment {
  issueId: number
  description: string
  permissionId: number
  attachments: File[]
  createdAt: Date
  updatedAt: Date
}
