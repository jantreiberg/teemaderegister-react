import React from 'react'
// import Breadcrumbs from './Breadcrumbs'

import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const { bool, func, object } = PropTypes

const propTypes = {
  getPage: func.isRequired,
  loading: bool.isRequired,
  page: object.isRequired
}

class Tos extends React.Component {
  componentDidMount () {
    this.props.getPage('tos')
  }

  render () {
    // if (this.props.loading) return null
    const html = this.props.page.page.content
    return (
      <div>{ ReactHtmlParser(html) }</div>
    )
  }
}

Tos.propTypes = propTypes

export default Tos
