import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  meta: {},
  loading: true,
  hasError: false,
  err: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CURRICULUM_LOADED: {
      const { meta } = action
      return {
        ...state,
        meta,
        loading: false,
        hasError: false
      }
    }

    case types.CURRICULUM_INIT:
      return INITIAL_STATE

    case types.CURRICULUM_LOADFAIL: {
      const { err } = action
      return {
        ...state,
        err,
        loading: false,
        hasError: true
      }
    }

    default:
      return {
        ...state
      }
  }
}
