import React from 'react'
import { setDocTitle } from '../utils/helpers'

const NotFound = () => {
  setDocTitle('Not Found')

  return (
    <h2>Not Found!</h2>
  )
}

export default NotFound
