import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  curriculums: [],
  error: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CURRICULUMSNAMES_LOADED: {
      const { curriculums } = action
      return {
        ...state,
        curriculums,
        loading: false
      }
    }

    case types.TOPIC_ADD_START:
      return {
        ...state,
        loading: true
      }

    case types.TOPIC_ADD_END:
      return {
        ...state,
        loading: false,
        hasError: !!action.error,
        error: action.error || {}
      }

    case types.TOPIC_ADD_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
