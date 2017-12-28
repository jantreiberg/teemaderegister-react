import React from 'react'
import { connect } from 'react-redux'
import {
  getProfile,
  updateProfile,
  initSettings,
  uploadProfilePicture,
  resetProfilePicture
} from '../actions/SettingsActions'
import SettingsAccount from '../components/SettingsAccount'

const SettingsAccountContainer = props => <SettingsAccount {...props} />

const mapStateToProps = state => ({
  settings: state.settings
})

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  initSettings,
  uploadProfilePicture,
  resetProfilePicture
})(SettingsAccountContainer)
