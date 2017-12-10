import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PASSWORD_SETTINGS_LOADED:
      return {
        ...state,
        loading: false
      }

    case types.PASSWORD_CHANGE_START :
      return {
        ...state,
        loading: true
      }

    case types.PASSWORD_CHANGE_END:
      return {
        ...state,
        loading: false
      }

    case types.PASSWORD_SETTINGS_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
