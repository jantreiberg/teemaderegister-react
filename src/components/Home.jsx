import React from 'react'
import PropTypes from 'prop-types'

import {Button} from 'antd'
import {Link} from 'react-router-dom'

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
    const { home: { loading, curriculums }, auth: { isAuthenticated } } = this.props

    return (
      <div className='home'>
        <div className='home__intro'>
          <h1>Tere tulemast DTI uue teemaderegistri lehele!!!!</h1>
          {isAuthenticated &&
          <div>
            <Link to="/profile"><Button>Settings</Button></Link>
          </div>
          }
        </div>
        {!loading && <HomeCollection curriculums={curriculums} />}
      </div>
    )
  }
}

Home.propTypes = propTypes

export default Home
