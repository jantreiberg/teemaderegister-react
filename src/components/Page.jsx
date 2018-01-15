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

class Page extends React.Component {
  componentDidMount () {
    this.props.getPage('page')
  }

  render () {
    // if (this.props.loading) return null
    const html = this.props.page.page.content
    return (
      <div>{ ReactHtmlParser(html) }</div>
    )
  }
}

Page.propTypes = propTypes

export default Page
