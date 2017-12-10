import Api from '../utils/Api'
import * as types from '../constants/ActionTypes'

import { USER_PROFILE_URL, USER_UPDATE_URL } from '../constants/ApiConstants'

export const initProfile = () => dispatch => {
  dispatch({ type: types.USER_SETTINGS_INIT })
}

export const getProfile = () => dispatch => {
  return Api('GET', USER_PROFILE_URL)
    .then(data => {
      dispatch({
        type: types.USER_SETTINGS_LOADED,
        user: data.user
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const saveData = creds => dispatch => {
  dispatch({ type: types.USER_SETTINGS_SAVE_START })

  return Api('POST', USER_UPDATE_URL, { data: creds })
    .then(data => {
      dispatch({ type: types.USER_SETTINGS_SAVE_END, message: data.message })
    }).catch(err => {
      const error = err.data
      dispatch({ type: types.USER_SETTINGS_SAVE_ERROR, error })
    })
}
