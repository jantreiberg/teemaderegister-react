import React from 'react'
import PropTypes from 'prop-types'

import HomeCollection from './HomeCollection'
const { array, bool, func, shape } = PropTypes

const propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired
  }).isRequired,
  getCurriculums: func.isRequired,
  home: shape({
    curriculums: array.isRequired,
    loading: bool.isRequired
  }).isRequired
}

class Home extends React.Component {
  componentDidMount () {
    this.props.getCurriculums()
  }

  render () {
    const { home: { loading, curriculums } } = this.props

    return (
      <div className='home'>
        <div className='home__intro'>
          <h1>Tere tulemast DTI uue teemaderegistri lehele!!!!</h1>
        </div>
        {!loading && <HomeCollection curriculums={curriculums} />}
      </div>
    )
  }
}

Home.propTypes = propTypes

export default Home
