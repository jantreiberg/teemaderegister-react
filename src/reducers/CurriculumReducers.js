import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  meta: {},
  loading: true,
  message:'',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CURRICULUM_LOADED: {
      const { meta } = action
      return {
        ...state,
        meta,
        loading: false
      }
    }

    case types.ADD_CURRICULUM_START:
      const { meta } = action
      return {
        ...state,
        meta,
        loading: true,
        message:"Curriculum was not added!",
        messageFlag:false
      }

    case types.CURRICULUM_ADD: {
      const { meta } = action
      return {
        ...state,
        meta,
        loading: false,
        message:"Curriculum added successfully",
        messageFlag:true
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
