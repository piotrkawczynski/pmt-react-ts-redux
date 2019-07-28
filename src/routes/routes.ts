import * as React from "react"
import SignIn from "../pages/SignInPage/SignInPage"
import SignUp from "../pages/SignUpPage/SignUpPage"

export interface IRoutes {
  path: string
  exact: boolean
  component: typeof React.Component
  title?: string
}

export const Routes: IRoutes[] = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: Home,
  //   title: 'Dashboard',
  //   backgroundImage: null,
  // },
  // {
  //   path: '/backlog/:projectId',
  //   component: Backlog,
  //   title: 'Backlog',
  //   backgroundImage: null,
  // },
  // {
  //   path: '/create-project',
  //   exact: true,
  //   component: CreateProject,
  //   title: 'Create project',
  //   backgroundImage: null,
  // },
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

export const authRoutes: IRoutes[] = [
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
  // {
  //   path: '/remain-password',
  //   exact: true,
  //   component: RemainPassword,
  //   backgroundImage: signBackground,
  // },
]

export const withoutSidebarRoutes: IRoutes[] = [
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
  //   component: IssueModal,
  //   backgroundImage: null,
  // },
  // {
  //   path: '/project/:projectId/issue/:issueId',
  //   exact: true,
  //   component: EditIssueModal,
  //   backgroundImage: null,
  // },
]
