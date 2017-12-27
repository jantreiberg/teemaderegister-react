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

    case types.USER_SETTINGS_SAVE_END:
      return {
        ...state,
        message: action.message,
        // loading: false, other loading
        hasError: !!action.error,
        error: action.error || {}
      }

    case types.USER_SETTINGS_INIT:
      return INITIAL_STATE

    case types.USER_PICTURE_SET: {
      const { user: { profile: { image }, updatedAt } } = action

      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            image
          },
          updatedAt
        },
        message: 'Picture updated successful',
        // loading: false, other loading
        hasError: !!action.error,
        error: action.error || {}
      }
    }

    default:
      return {
        ...state
      }
  }
}
