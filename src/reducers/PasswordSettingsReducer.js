import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: false,
  error: {},
  hasError: false,
  message: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PASSWORD_CHANGE_START :
      return {
        ...state,
        loading: true
      }

    case types.PASSWORD_CHANGE_END:
      return {
        ...state,
        loading: false,
        hasError: false,
        message: action.message,
        error: !!action.error
      }

    case types.PASSWORD_CHANGE_ERROR:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: !!action.error,
        message: action.error
      }

    case types.PASSWORD_CHANGE_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
