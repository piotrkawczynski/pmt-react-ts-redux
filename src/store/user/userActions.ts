import {
  createPromiseAction,
  createPromiseType,
} from "../../utilities/ReduxFunctions"
import { SignInFormValues } from "../../pages/SignInPage/SignInPage"
import { User } from "../../types/user"
import { FormikActions } from "formik"

/* ------------- Action Types ------------- */
const UPDATE_API_HEADER = "UPDATE_API_HEADER"
const LOGIN = createPromiseType("LOGIN")

export const types = { UPDATE_API_HEADER, LOGIN }

/* ------------- Action Creators ------------- */
export const updateApiHeader = () => ({
  type: UPDATE_API_HEADER,
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

const loginSuccess = (user: User) => ({
  type: LOGIN.SUCCESS,
  payload: { user },
})

const loginFailure = () => ({
  type: LOGIN.FAILURE,
})

export const loginActions = { loginRequest, loginSuccess }
