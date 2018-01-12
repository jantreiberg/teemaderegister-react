import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

import {
  PAGES_URL
} from '../constants/ApiConstants'

// import { loadedTableContentCount } from './TableContentActions'

export const getPage = systemTag => dispatch => {
  return Api('GET', PAGES_URL.replace(':systemTag', systemTag))
    .then(data => dispatch({
      type: types.PAGES_LOADED,
      page: data.page
    }))
    .catch(err => {
      console.log(err)
    })
}
