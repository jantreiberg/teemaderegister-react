import axios from 'axios'
import { getToken } from './jwt'
import nprogress from 'nprogress'

const makeConfig = (method, url, query) => {
  let config = {
    method: method,
    url: url
  }

  if (query && query.data && ['PUT', 'POST', 'PATCH'].indexOf(method) !== -1) {
    config.data = query.data
  }

  if (query && query.params) {
    config.params = query.params
  }

  // IF TOKEN ADD TO REQUEST
  const token = getToken()
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token
    }
  }

  return config
}

export default (method, url, query) => {
  const config = makeConfig(method, url, query)
  nprogress.start()

  return axios
    .request(config)
    .then(response => {
      nprogress.done()

      return Promise.resolve(response.data)
    })
    .catch(err => {
      if (err.status === 403) {
        // dispatch same as logout
        console.log('not authorized')
      }
      nprogress.done()
      return Promise.reject(err.response)
    })
}
