import Api from './../utils/Api'
import * as types from '../constants/ActionTypes'
import { USER_PASSWORD_UPDATE_URL } from './../constants/ApiConstants'

export const initPasswordSettings = () => dispatch => dispatch({ type: types.PASSWORD_CHANGE_INIT })

export const changeUserPassword = creds => dispatch => {
  dispatch({ type: types.PASSWORD_CHANGE_START })

  return Api('POST', USER_PASSWORD_UPDATE_URL, { data: creds })
    .then(data => {
      dispatch({ type: types.PASSWORD_CHANGE_END })
    }).catch(err => {
      const error = err.data
      dispatch({ type: types.PASSWORD_CHANGE_END, error })
    })
}
