import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  page: {},
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PAGES_LOADED: {
      const { page } = action
      return {
        ...state,
        page,
        loading: false
      }
    }

    default:
      return {
        ...state
      }
  }
}
