import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

import {
  CONTRIBUTORS_URL
} from '../constants/ApiConstants'

export const initContributors = () => dispatch => {
  dispatch({ type: types.CONTRIBUTORS_INIT })
}

export const getContributors = () => dispatch => {
  return Api('GET', CONTRIBUTORS_URL)
    .then(data => dispatch({
      type: types.CONTRIBUTORS_LOADED,
      contributors: data.contributors
    }))
    .catch(err => {
      console.log(err)
    })
}
