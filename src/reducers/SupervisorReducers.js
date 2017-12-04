import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  data: {},
  count: {},
  loading: true,
  hasError: false,
  err: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SUPERVISOR_LOADED: {
      const { supervisor, counts } = action
      return {
        ...state,
        data: supervisor,
        count: counts,
        loading: false,
        hasError: false
      }
    }

    case types.SUPERVISOR_INIT:
      return INITIAL_STATE

    case types.SUPERVISOR_LOADFAIL: {
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
