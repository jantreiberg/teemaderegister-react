import React from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../actions/UserSettingsActions'
import UserSettings from '../components/UserSettings'

const UserSettingsContainer = props => <UserSettings {...props} />

const mapStateToProps = state => ({
  profile: profile.state
})

export default connect(mapStateToProps, { getProfile })(UserSettingsContainer)
