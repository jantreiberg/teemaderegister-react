import Api from '../utils/Api'
import * as types from '../constants/ActionTypes'
import { setToken } from '../utils/jwt'

import { USER_PROFILE_URL } from '../constants/ApiConstants'

export const getProfile = () => dispatch => {
    return Api('GET', USER_PROFILE_URL)
      .then(data => dispatch({
        type: types.USER_SETTINGS_LOADED,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image
    }))
      .catch(err => {
        console.log(err)
    })
  }
