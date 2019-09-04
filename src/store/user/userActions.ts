import { createPromiseType } from "../../utilities/ReduxFunctions"
import { SignInFormValues } from "../../pages/SignInPage/SignInPage"
import { User } from "../../types/user"
import { Auth } from "../../types/auth"
import { FormikActions } from "formik"
import { RegisterFormValues } from "../../pages/SignUpPage/SignUpPage"

/* ------------- Action Types ------------- */
const UPDATE_API_HEADER = "UPDATE_API_HEADER"
const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN"
const LOGIN = createPromiseType("LOGIN")
const REGISTER = createPromiseType("REGISTER")
const GET_USER_LIST = createPromiseType("GET_USER_LIST")

export const types = {
  UPDATE_API_HEADER,
  SET_USER_LOGGED_IN,
  LOGIN,
  REGISTER,
  GET_USER_LIST,
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
