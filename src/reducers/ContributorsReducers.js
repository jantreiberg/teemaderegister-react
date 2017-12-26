import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  contributors: [],
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONTRIBUTORS_LOADED: {
      const { contributors } = action
      return {
        ...state,
        contributors,
        loading: false
      }
    }

    case types.CONTRIBUTORS_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
