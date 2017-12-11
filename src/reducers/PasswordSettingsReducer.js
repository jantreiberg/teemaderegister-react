import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: false,
  error: {},
  hasError: false
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
        hasError: !!action.error,
        error: action.error || {}
      }

    case types.PASSWORD_CHANGE_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
