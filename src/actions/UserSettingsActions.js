import Api from '../utils/Api'
import * as types from '../constants/ActionTypes'

import { USER_PROFILE_URL, USER_UPDATE_URL } from '../constants/ApiConstants'

export const initProfile = () => dispatch => {
  dispatch({ type: types.USER_SETTINGS_INIT })
}

export const getProfile = () => dispatch => {
  return Api('GET', USER_PROFILE_URL)
    .then(data => {
      console.log(data)
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
  return Api('POST', USER_UPDATE_URL, { data: creds })
    .then(data => {
      console.log('Success')
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
}
