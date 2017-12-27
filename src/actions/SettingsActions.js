import Api from '../utils/Api'
import * as types from '../constants/ActionTypes'

import {
  USER_PROFILE_URL,
  USER_UPDATE_PROFILE_URL,
  USER_PICTURE_UPLOAD_URL,
  USER_PICTURE_RESET_URL
} from '../constants/ApiConstants'

export const initProfile = () => dispatch => {
  dispatch({ type: types.USER_SETTINGS_INIT })
}

export const getProfile = () => dispatch => {
  return Api('GET', USER_PROFILE_URL)
    .then(data => {
      const { user } = data
      dispatch({ type: types.USER_SETTINGS_LOADED, user })
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateProfile = user => dispatch => {
  return Api('PUT', USER_UPDATE_PROFILE_URL, { data: user })
    .then(data => {
      const { message } = data
      dispatch({ type: types.USER_SETTINGS_SAVE_END, message })
    }).catch(err => {
      const error = err.data.message
      console.log(error)
      dispatch({ type: types.USER_SETTINGS_SAVE_END, error })
    })
}

export const uploadProfilePicture = uploadData => dispatch => {
  const { filename, file } = uploadData

  let data = new FormData()
  data.append(filename, file)

  return Api('POST', USER_PICTURE_UPLOAD_URL, { data })
    .then(data => {
      const { user } = data
      dispatch({ type: types.USER_PICTURE_SET, user })
    }).catch(err => {
      const error = err.data
      console.log(error)
      dispatch({ type: types.USER_PICTURE_SET, error })
    })
}

export const resetProfilePicture = () => dispatch => {
  return Api('PUT', USER_PICTURE_RESET_URL)
    .then(data => {
      const { user } = data
      dispatch({ type: types.USER_PICTURE_SET, user })
    }).catch(err => {
      const error = err.data
      console.log(error)
      dispatch({ type: types.USER_PICTURE_SET, error })
    })
}
