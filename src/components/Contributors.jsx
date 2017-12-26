import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'

const { object, bool, array, func, shape } = PropTypes

const propTypes = {
  contributors: shape({
    contributors: array.isRequired,
    loading: bool.isRequired
  }).isRequired,
  getContributors: func.isRequired,
  initContributors: func.isRequired,
  location: object.isRequired
}

class Contributors extends React.Component {
  componentDidMount () {
    this.props.getContributors()
  }

  componentWillUnmount () {
    this.props.initContributors()
  }

  render () {
    const { contributors, loading } = this.props.contributors
    const crumbs = [{ url: null, name: 'Contributors' }]

    return (
      <div className='contributors'>
        <Breadcrumbs crumbs={crumbs} />
        <h1>Contributors</h1>
        {!loading && <div>
          <ul>
            {contributors.map((c, key) =>
              <li key={c.login}>
                <a href={c.html_url} target='_blank'>{c.login}</a>
              </li>
            )}
          </ul>
        </div>
        }
      </div>
    )
  }
}

Contributors.propTypes = propTypes

export default Contributors
