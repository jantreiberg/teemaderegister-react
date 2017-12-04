import * as types from '../constants/ActionTypes'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case types.USER_SETTINGS_LOAD_START:
        return {
          ...state,
          loading: true
        }
  
      case types.LOGIN_LOADED:
        return {
          ...state,
          loading: false,
          hasError: !!action.error,
          error: action.error || {}
        }
  
      default:
        return {
          ...state
        }
    }
  }