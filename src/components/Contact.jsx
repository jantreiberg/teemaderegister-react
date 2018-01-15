import React from 'react'

import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const { bool, func, object } = PropTypes

const propTypes = {
  getPage: func.isRequired,
  loading: bool.isRequired,
  page: object.isRequired
}

class Contact extends React.Component {
  componentDidMount () {
    this.props.getPage('contacts')
  }

  render () {
    if (this.props.loading) return null
    const html = this.props.page.page.content
    return (
      <div>{ ReactHtmlParser(html) }</div>
    )
  }
}

Contact.propTypes = propTypes

export default Contact
