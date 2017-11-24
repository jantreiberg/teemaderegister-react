import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'

const { func, object, shape, string } = PropTypes

const propTypes = {
  clearTableContent: func.isRequired,
  curriculum: object,
  defaultTab: string,
  getTableContent: func.isRequired,
  history: shape({
    replace: func.isRequired,
    location: shape({
      pathname: string.isRequired,
      search: string.isRequired
    }).isRequired
  }).isRequired,
  queryExtend: object,
  search: object,
  supervisor: object,
  tableContent: object.isRequired,
  tabs: object.isRequired
}
/*
render () {
	return ()
}
*/
class TopicAdd extends React.Component {

}

TopicAdd.propTypes = propTypes

export default TopicAdd