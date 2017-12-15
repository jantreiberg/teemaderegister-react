import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Contributors from '../components/Contributors'
import { getContributors, initContributors } from '../actions/ContributorsActions'
const ContributorsContainer = props => <Contributors {...props} />

const mapStateToProps = state => ({
  contributors: state.contributors
})
const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getContributors,
      initContributors
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(ContributorsContainer)
