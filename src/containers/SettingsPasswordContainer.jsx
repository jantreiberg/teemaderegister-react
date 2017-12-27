import React from 'react'
import { connect } from 'react-redux'
import { initPasswordSettings, changeUserPassword } from '../actions/SettingsActions'
import SettingsPassword from '../components/SettingsPassword'

const SettingsPasswordContainer = props => <SettingsPassword {...props} />

const mapStateToProps = state => ({
  settings: state.settings
})

export default connect(mapStateToProps, { initPasswordSettings, changeUserPassword })(SettingsPasswordContainer)
