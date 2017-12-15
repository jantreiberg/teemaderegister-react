import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'

const {object, func} = PropTypes

const propTypes = {
  contributors: object.isRequired,
  getContributors: func.isRequired,
  initContributors: func.isRequired,
  location: object.isRequired
}

class Contributors extends React.Component {
  componentDidMount () {
    this.props.getContributors()
  }

  componentWillUnmount () {
    // Reset all state params
    this.props.initContributors()
  }

  render () {
    const contributors = this.props.contributors.data
    const loading = this.props.contributors.loading
    const crumbs = [{ url: this.props.location.pathname, name: 'Contributors' }]
    return (
      <div className='contributors'>
        <Breadcrumbs crumbs={crumbs} />
        {!loading &&
        <div>
          <div className='heading'>
            <h2>Contributors</h2>
          </div>
          {contributors.contributor.map((x, key) =>
            <div key={key}><a href = {x.html_url}>{x.login}</a></div>)}
        </div>
        }
      </div>
    )
  }
}

Contributors.propTypes = propTypes

export default Contributors
