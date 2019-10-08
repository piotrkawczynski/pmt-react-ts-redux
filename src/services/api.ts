import Axios, { AxiosRequestConfig } from "axios"
import { SignInFormValues } from "../pages/SignInPage/SignInPage"
import { RegisterFormValues } from "../pages/SignUpPage/SignUpPage"
import {
  CreateStatusBody,
  UpdateStatusOrderBody,
} from "../store/status/statusActions"
import { CreateInviteBody } from "../store/invite/inviteActions"
import { CreateIssue } from "../types/request/createIssue"

const apiInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
})

// apiInstance.interceptors.request.use((request) => {
//   console.log("Starting Request", request)
//   return request
// })
//
// apiInstance.interceptors.response.use((response) => {
//   console.log("Response:", response)
//   return response
// })

const updateApiHeaders = (token: string) => {
  console.log(token)

  apiInstance.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

const login = async (values: SignInFormValues) => {
  return await apiInstance.post("/auth/login", values)
}

const register = async (values: RegisterFormValues) => {
  return await apiInstance.post("/auth/register", values)
}

const getProjectList = async () => {
  return await apiInstance.get("/projects")
}

const createProject = async (body: FormData, config?: AxiosRequestConfig) => {
  return await apiInstance.post("/projects", body, config)
}

const createTag = async (body: FormData, config?: AxiosRequestConfig) => {
  return await apiInstance.post("/tags", body, config)
}

const deleteTag = async (id: number) => {
  return await apiInstance.delete(`/tags/${id}`)
}

const getTagList = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/tags`)
}

const createStatus = async (
  body: CreateStatusBody,
  config?: AxiosRequestConfig
) => {
  return await apiInstance.post("/statuses", body, config)
}

const updateStatusOrder = async (
  body: UpdateStatusOrderBody,
  config?: AxiosRequestConfig
) => {
  return await apiInstance.patch("/statuses/update-order", body, config)
}

const deleteStatus = async (id: number) => {
  return await apiInstance.delete(`/statuses/${id}`)
}

const getStatusList = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/statuses`)
}

const createInvite = async (
  body: CreateInviteBody,
  config?: AxiosRequestConfig
) => {
  return await apiInstance.post("/invites", body, config)
}

const deleteInvite = async (id: number) => {
  return await apiInstance.delete(`/invites/${id}`)
}

const getInviteList = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/invites`)
}

const getUserList = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/users`)
}

const getPermissionList = async () => {
  return await apiInstance.get(`/permissions`)
}

const getSprintList = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/sprints`)
}

const getIssueListWithSprintId = async (
  sprintId: number,
  config: AxiosRequestConfig
) => {
  return await apiInstance.get(`/sprints/${sprintId}/issues`, config)
}

const createIssue = async (body: FormData) => {
  return await apiInstance.post("/issues", body)
}

const updateIssue = async (body: FormData) => {
  return await apiInstance.patch("/issues", body)
}

const getIssue = async (issueId: number) => {
  return await apiInstance.get(`/issues/${issueId}`)
}

const getCommentList = async (issueId: number) => {
  return await apiInstance.get(`/issues/${issueId}/comments`)
}

const updateIssueStatus = async (issueId: number, statusId: number) => {
  return await apiInstance.patch(`/issues/${issueId}/status`, { statusId })
}

const updateIssueSprint = async (issueId: number, sprintId: number | null) => {
  return await apiInstance.patch(`/issues/${issueId}/sprint`, { sprintId })
}

const getBacklogIssues = async (projectId: number) => {
  return await apiInstance.get(`/projects/${projectId}/backlog`)
}

const createComment = async (body: FormData) => {
  return await apiInstance.post("/comments", body)
}

const deleteComment = async (commentId: number) => {
  return await apiInstance.delete(`/comments/${commentId}`)
}

const api = {
  auth: {
    login,
    register,
  },
  projects: { getProjectList, createProject, getBacklogIssues },
  tags: { createTag, deleteTag, getTagList },
  statuses: { createStatus, updateStatusOrder, deleteStatus, getStatusList },
  invites: {
    createInvite,
    deleteInvite,
    getInviteList,
  },
  users: {
    getUserList,
  },
  permissions: {
    getPermissionList,
  },
  sprints: {
    getSprintList,
  },
  issues: {
    getIssue,
    getIssueListWithSprintId,
    createIssue,
    updateIssue,
    getCommentList,
    updateIssueStatus,
    updateIssueSprint,
  },
  comments: {
    createComment,
    deleteComment,
  },
}

export { apiInstance, updateApiHeaders, api }
