import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  meta: {},
  loading: true,
  hasError: false,
  error: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CURRICULUM_LOADED: {
      const { meta, error } = action
      return {
        ...state,
        meta: meta || {},
        loading: false,
        hasError: !!error,
        error: error || {}
      }
    }

    case types.CURRICULUM_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
