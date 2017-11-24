import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'

const { array, bool, func, shape } = PropTypes

const propTypes = {}

class TopicAdd extends React.Component {

  render () {
    return (
      <div className='topicadd'>
        <h1>Lõputöö teema registreerimise vorm</h1>
      </div>
    )
  }

}

TopicAdd.propTypes = propTypes

export default TopicAdd