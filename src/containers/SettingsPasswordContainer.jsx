import React from 'react'
import { connect } from 'react-redux'
import { initPasswordSettings, changeUserPassword } from '../actions/PasswordSettingsActions'
import SettingsPassword from '../components/SettingsPassword'

const SettingsPasswordContainer = props => <SettingsPassword {...props} />

const mapStateToProps = state => ({
  passwordsettings: state.passwordsettings
})

export default connect(mapStateToProps, { initPasswordSettings, changeUserPassword })(SettingsPasswordContainer)
