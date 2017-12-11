import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  data: {},
  count: {},
  loading: true,
  hasError: false,
  error: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SUPERVISOR_LOADED: {
      const { supervisor, counts, error } = action
      return {
        ...state,
        data: supervisor || {},
        count: counts || {},
        loading: false,
        hasError: !!error,
        error: error || {}
      }
    }

    case types.SUPERVISOR_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
