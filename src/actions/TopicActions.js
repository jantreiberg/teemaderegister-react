import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

import {
  TOPICS_URL,
  CURRICULUMS_NAMESURL
} from '../constants/ApiConstants'

export const triggerAddTopic = (values) => dispatch => {
  dispatch({ type: types.TOPIC_ADD_START })

  console.log('topicactions rida 12', values)

  return Api('POST', TOPICS_URL, { data: values })
    .then(data => {
      const { topic } = data
      dispatch({ type: types.TOPIC_ADD_END, topic })
    }).catch(err => {
      const error = err.data
      dispatch({ type: types.TOPIC_ADD_END, error })
    })
}

export const getCurriculums = () => dispatch => {
  return Api('GET', CURRICULUMS_NAMESURL)
    .then(data => dispatch({
      type: types.CURRICULUMSNAMES_LOADED,
      curriculums: data.curriculums
    }))
    .catch(err => {
      console.log(err)
    })
}
