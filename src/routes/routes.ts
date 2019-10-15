import * as React from "react"

import BacklogPage from "../pages/BacklogPage/BacklogPage"
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage"
import CreateProjectPage from "../pages/CreateProjectPage/CreateProjectPage"
import FulfillProjectPage from "../pages/FulfillProjectPage/FulfillProjectPage"
import HomePage from "../pages/HomePage/HomePage"
import RemainPasswordPage from "../pages/RemainPasswordPage/RemainPasswordPage"
import SignIn from "../pages/SignInPage/SignInPage"
import SignUp from "../pages/SignUpPage/SignUpPage"
import KanbanPage from "../pages/KanbanPage/KanbanPage"

export interface Route {
  path: string
  exact: boolean
  component: typeof React.Component
  title?: string
}

export const Routes: Route[] = [
  {
    path: "/",
    exact: true,
    component: HomePage,
    title: "Dashboard",
  },
  // {
  //   path: '/backlog/:projectId',
  //   component: Backlog,
  //   title: 'Backlog',
  //   backgroundImage: null,
  // },
  {
    path: "/project/create",
    exact: true,
    component: CreateProjectPage,
    title: "Create project",
  },
  {
    path: "/project/:id/edit",
    exact: true,
    component: FulfillProjectPage,
    title: "Create project",
  },
  {
    path: "/project/:id/backlog",
    exact: true,
    component: BacklogPage,
    title: "Backlog",
  },
  {
    path: "/project/:id",
    exact: true,
    component: KanbanPage,
    title: "Kanban Scheme",
  },
  // {
  //   path: '/project/:projectId',
  //   component: Project,
  //   title: 'Project',
  //   backgroundImage: null,
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  //   title: 'Profile',
  //   backgroundImage: null,
  // },
  // {
  //   path: '/change_password',
  //   component: ChangePassword,
  //   title: 'Change Password',
  //   backgroundImage: null,
  // },
]

export const authRoutes: Route[] = [
  {
    path: "/login",
    exact: true,
    component: SignIn,
  },
  {
    path: "/register",
    exact: true,
    component: SignUp,
  },
  {
    path: "/remain-password",
    exact: true,
    component: RemainPasswordPage,
  },
  {
    path: "/change-password",
    exact: true,
    component: ChangePasswordPage,
  },
]

export const withoutSidebarRoutes: Route[] = [
  // {
  //   path: '/backlog/:projectId/issue/:issueId/photo',
  //   exact: true,
  //   component: Carousel,
  //   backgroundImage: null,
  // },
  // {
  //   path: '/project/:projectId/issue/:issueId/photo',
  //   exact: true,
  //   component: Carousel,
  //   backgroundImage: null,
  // },
  // {
  //   path: '/backlog/:projectId/create',
  //   exact: true,
  //   component: CreateIssueModal,
  //   backgroundImage: null,
  // },
  // {
  //   path: '/project/:projectId/issue/:issueId',
  //   exact: true,
  //   component: EditIssueModal,
  //   backgroundImage: null,
  // },
]
