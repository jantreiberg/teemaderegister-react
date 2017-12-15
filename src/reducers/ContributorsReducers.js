import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  data: {
    contributors: null
  },
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONTRIBUTORS_LOADED: {
      const { contributor } = action
      return {
        ...state,
        data: {
          contributor
        },
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
