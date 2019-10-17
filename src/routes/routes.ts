import * as React from "react"

import BacklogPage from "../pages/BacklogPage/BacklogPage"
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage"
import CreateProjectPage from "../pages/CreateProjectPage/CreateProjectPage"
import FulfillProjectPage from "../pages/FulfillProjectPage/FulfillProjectPage"
import HomePage from "../pages/HomePage/HomePage"
import KanbanPage from "../pages/KanbanPage/KanbanPage"
import RemainPasswordPage from "../pages/RemainPasswordPage/RemainPasswordPage"
import SignIn from "../pages/SignInPage/SignInPage"
import SignUp from "../pages/SignUpPage/SignUpPage"
import UpdateProfilePage from "../pages/UpdateProfilePage/UpdateProfilePage"

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
  {
    path: "/project/create",
    exact: true,
    component: CreateProjectPage,
    title: "Create project",
  },
  {
    path: "/project/:projectId/edit",
    exact: true,
    component: FulfillProjectPage,
    title: "Create project",
  },
  {
    path: "/project/:projectId/backlog",
    exact: true,
    component: BacklogPage,
    title: "Backlog",
  },
  {
    path: "/project/:projectId",
    exact: true,
    component: KanbanPage,
    title: "Kanban Scheme",
  },
  {
    path: "/profile",
    exact: true,
    component: UpdateProfilePage,
    title: "Update profile",
  },
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
