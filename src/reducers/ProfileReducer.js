import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: true,
  user: {
    login: {},
    profile: {},
    updatedAt: ''
  },
  error: {},
  message: '',
  hasError: false
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

    case types.USER_SETTINGS_SAVE_START:
      return {
        ...state
      }

    case types.USER_SETTINGS_SAVE_END:
      return {
        ...state,
        loading: false,
        error: !!action.error,
        message: action.message,
        hasError: false
      }

    case types.USER_SETTINGS_SAVE_ERROR:
      return {
        ...state,
        loading: false,
        error: !!action.error,
        message: action.error,
        hasError: true
      }

    case types.USER_SETTINGS_INIT:
      return INITIAL_STATE

    case types.USER_PICTURE_RESET_START:
      return {
        ...state
      }

    case types.USER_PICTURE_RESET_END:
      return {
        ...state,
        loading: false,
        error: !!action.error,
        message: 'Picture reset successful',
        hasError: false
      }

    case types.USER_PICTURE_RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: !!action.error,
        message: action.error,
        hasError: true
      }

    default:
      return {
        ...state
      }
  }
}
