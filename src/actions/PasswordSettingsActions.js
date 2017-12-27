import Api from './../utils/Api'
import * as types from '../constants/ActionTypes'
import { USER_UPDATE_PASSWORD_URL } from './../constants/ApiConstants'

export const initPasswordSettings = () => dispatch => dispatch({ type: types.PASSWORD_CHANGE_INIT })

export const changeUserPassword = user => dispatch => {
  dispatch({ type: types.PASSWORD_CHANGE_START })

  return Api('PUT', USER_UPDATE_PASSWORD_URL.replace(':id', user._id), { data: user })
    .then(data => {
      dispatch({ type: types.PASSWORD_CHANGE_END, message: data.message })
    }).catch(err => {
      const error = err.data.message
      console.log(error)
      dispatch({ type: types.PASSWORD_CHANGE_ERROR, error })
    })
}
