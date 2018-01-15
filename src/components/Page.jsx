import React from 'react'
// import Breadcrumbs from './Breadcrumbs'

import PropTypes from 'prop-types'

const { bool, func, object } = PropTypes

const propTypes = {
  getPage: func.isRequired,
  loading: bool.isRequired,
  page: object.isRequired
}

class Page extends React.Component {
  componentDidMount () {
    this.props.getPage('contacts')
  }

  render () {
    if (this.props.loading) return null

    return (
      <p>{this.props.page.page.content}</p>
    )
  }
}

Page.propTypes = propTypes

export default Page
