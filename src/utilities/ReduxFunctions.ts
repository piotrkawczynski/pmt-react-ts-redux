import { AnyAction } from "redux"

interface CreateAsyncType {
  INIT: string
  REQUEST: string
  SUCCESS: string
  FAILURE: string
}

export const createPromiseType = (action: string): CreateAsyncType => ({
  INIT: `${action}.INIT`,
  REQUEST: `${action}.REQUEST`,
  SUCCESS: `${action}.SUCCESS`,
  FAILURE: `${action}.FAILURE`,
})

export function createPromiseAction<R = any, S = any>(type: CreateAsyncType) {
  return {
    Init: (payload?: R) => ({
      type: type.INIT,
      payload,
    }),
    Request: (payload?: R) => ({
      type: type.REQUEST,
      payload,
    }),
    Success: (payload?: S) => ({
      type: type.SUCCESS,
      payload,
    }),
    Failure: (payload?: string) => ({
      type: type.FAILURE,
      payload,
    }),
  }
}

export interface PromiseState<T, E = string> {
  status: string
  isLoading: boolean
  error: E | null
  data: T | null
}

export const createPromiseState = <T, E>(): PromiseState<T, E> => {
  return {
    status: "init",
    isLoading: false,
    data: null,
    error: null,
  }
}

export const createNestedReducer = <State>(type: CreateAsyncType, initialState: State, key: keyof State) => {
  return {
    [type.INIT]: createInitExtendedReducer<State>(
      initialState,
      key
    ),
    [type.REQUEST]: createRequestExtendedReducer<State>(
      initialState,
      key
    ),
    [type.SUCCESS]: createSuccessExtendedReducer<State>(
      initialState,
      key
    ),
    [type.FAILURE]: createFailureExtendedReducer<State>(
      initialState,
      key
    ),
  }
}

export function createInitExtendedReducer<T>(initialState: T, key: keyof T) {
  return (state = initialState) => {
    return {
      ...state,
      [key]: {
        data: null,
        error: null,
        isLoading: false,
        status: "init",
      },
    }
  }
}

export function createRequestExtendedReducer<T>(initialState: T, key: keyof T) {
  return (state = initialState) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        isLoading: true,
        status: "loading",
      },
    }
  }
}

export function createSuccessExtendedReducer<T>(initialState: T, key: keyof T) {
  return (state = initialState, action: AnyAction): T => {
    if (action.payload) {
      return {
        ...state,
        [key]: {
          ...state[key],
          data: action.payload,
          isLoading: false,
          status: "success",
        },
      }
    }

    return {
      ...state,
      [key]: {
        ...state[key],
        isLoading: false,
        status: "success",
      },
    }
  }
}

export function createFailureExtendedReducer<T>(initialState: T, key: keyof T) {
  return (state = initialState, action: AnyAction): T => {
    if (action.payload) {
      return {
        ...state,
        [key]: {
          ...state[key as keyof T],
          error: action.error,
          isLoading: false,
          status: "failure",
        },
      }
    }

    return {
      ...state,
      [key]: {
        ...state[key],
        error: action.error,
        isLoading: false,
        status: "failure",
      },
    }
  }
}

export function createInitReducer<T>(initialState: PromiseState<T, string>) {
  return (state = initialState) => {
    return {
      ...state,
      error: null,
      isLoading: false,
      status: "init",
    }
  }
}

export function createRequestReducer<T>(initialState: PromiseState<T, string>) {
  return (state = initialState) => {
    return {
      ...state,
      isLoading: true,
      status: "loading",
    }
  }
}

export function createSuccessReducer<T>(initialState: PromiseState<T, string>) {
  return (state = initialState, action: AnyAction) => {
    if (action.payload) {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    }

    return {
      ...state,
      isLoading: false,
    }
  }
}

export function createFailureReducer<T>(initialState: PromiseState<T, string>) {
  return (state = initialState, action: AnyAction) => {
    if (action.payload) {
      return {
        ...state,
        isLoading: false,
        error: action.error,
        status: "failure",
      }
    }

    return {
      ...state,
      isLoading: false,
    }
  }
}
