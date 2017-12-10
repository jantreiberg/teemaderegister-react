import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: true,
  user: {},
  error: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_SETTINGS_LOADED:
      const { user } = action
      return {
        ...state,
        loading: false,
        user
      }

    case types.USER_SETTINGS_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
