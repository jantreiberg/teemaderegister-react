import React from 'react'
import { connect } from 'react-redux'
import { getProfile, saveData, initProfile } from '../actions/UserSettingsActions'
import UserSettings from '../components/UserSettings'

const UserSettingsContainer = props => <UserSettings {...props} />

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfile, saveData, initProfile })(UserSettingsContainer)
