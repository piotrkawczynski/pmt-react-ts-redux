import { FormikActions } from "formik"
import { ChangePasswordFormValues } from "../../pages/ChangePasswordPage/ChangePasswordPage"
import { SignInFormValues } from "../../pages/SignInPage/SignInPage"
import { RegisterFormValues } from "../../pages/SignUpPage/SignUpPage"
import { UpdateProfileValues } from "../../pages/UpdateProfilePage/UpdateProfilePage"
import { Auth } from "../../types/auth"
import { User } from "../../types/user"
import { createPromiseType } from "../../utilities/ReduxFunctions"

/* ------------- Action Types ------------- */
const UPDATE_API_HEADER = "UPDATE_API_HEADER"
const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN"
const LOGIN = createPromiseType("LOGIN")
const REGISTER = createPromiseType("REGISTER")
const GET_USER_LIST = createPromiseType("GET_USER_LIST")
const REMAIN_PASSWORD = createPromiseType("REMAIN_PASSWORD")
const CHANGE_PASSWORD = createPromiseType("CHANGE_PASSWORD")
const UPDATE_PROFILE = createPromiseType("UPDATE_PROFILE")
const UPDATE_USER = "UPDATE_USER"
const LOGOUT_USER = "LOGOUT_USER"

export const types = {
  UPDATE_API_HEADER,
  SET_USER_LOGGED_IN,
  LOGIN,
  REGISTER,
  GET_USER_LIST,
  REMAIN_PASSWORD,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  UPDATE_USER,
  LOGOUT_USER,
}

/* ------------- Action Creators ------------- */
export const updateApiHeader = () => ({
  type: UPDATE_API_HEADER,
})

export const setUserLoggedIn = () => ({
  type: SET_USER_LOGGED_IN,
})

const loginRequest = (
  values: SignInFormValues,
  formikActions: FormikActions<SignInFormValues>
) => ({
  type: LOGIN.REQUEST,
  payload: {
    values,
    formikActions,
  },
})

const loginSuccess = (user: Auth) => ({
  type: LOGIN.SUCCESS,
  payload: user,
})

const loginFailure = (error: string) => ({
  type: LOGIN.FAILURE,
  error,
})

const registerRequest = (
  values: RegisterFormValues,
  formikActions: FormikActions<RegisterFormValues>
) => ({
  type: REGISTER.REQUEST,
  payload: {
    values,
    formikActions,
  },
})

const registerSuccess = () => ({
  type: REGISTER.SUCCESS,
})

const registerFailure = (error: string) => ({
  type: REGISTER.FAILURE,
  error,
})

export const loginActions = { loginRequest, loginSuccess, loginFailure }
export const registerActions = {
  registerRequest,
  registerSuccess,
  registerFailure,
}

const getUserListInit = () => ({
  type: GET_USER_LIST.INIT,
})

const getUserListRequest = (projectId: number) => ({
  type: GET_USER_LIST.REQUEST,
  payload: {
    projectId,
  },
})

const getUserListSuccess = (userList: User[]) => ({
  type: GET_USER_LIST.SUCCESS,
  payload: userList,
})

const getUserListFailure = (error: string) => ({
  type: GET_USER_LIST.FAILURE,
  error,
})

export const getUserListActions = {
  getUserListInit,
  getUserListRequest,
  getUserListSuccess,
  getUserListFailure,
}

const remainPasswordInit = () => ({
  type: REMAIN_PASSWORD.INIT,
})

const remainPasswordRequest = (email: string) => ({
  type: REMAIN_PASSWORD.REQUEST,
  payload: {
    email,
  },
})

const remainPasswordSuccess = () => ({
  type: REMAIN_PASSWORD.SUCCESS,
})

const remainPasswordFailure = (error: string) => ({
  type: REMAIN_PASSWORD.FAILURE,
  error,
})

export const remainPasswordActions = {
  remainPasswordInit,
  remainPasswordRequest,
  remainPasswordSuccess,
  remainPasswordFailure,
}

const changePasswordInit = () => ({
  type: CHANGE_PASSWORD.INIT,
})

const changePasswordRequest = (
  changePasswordValues: ChangePasswordFormValues,
  token: string
) => ({
  type: CHANGE_PASSWORD.REQUEST,
  payload: {
    changePasswordValues,
    token,
  },
})

const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD.SUCCESS,
})

const changePasswordFailure = (error: string) => ({
  type: CHANGE_PASSWORD.FAILURE,
  error,
})

export const changePasswordActions = {
  changePasswordInit,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
}

const updateProfileInit = () => ({
  type: UPDATE_PROFILE.INIT,
})

const updateProfileRequest = (updateProfileValues: UpdateProfileValues) => ({
  type: UPDATE_PROFILE.REQUEST,
  payload: {
    updateProfileValues,
  },
})

const updateProfileSuccess = () => ({
  type: UPDATE_PROFILE.SUCCESS,
})

const updateProfileFailure = (error: string) => ({
  type: UPDATE_PROFILE.FAILURE,
  error,
})

const updateUser = (updateProfileValues: UpdateProfileValues) => ({
  type: UPDATE_USER,
  payload: {
    updateProfileValues,
  },
})

export const updateProfileActions = {
  updateProfileInit,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateUser,
}

export const logoutUser = () => ({
  type: LOGOUT_USER,
})
