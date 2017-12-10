import React from 'react'
import { connect } from 'react-redux'
import ChangePassword from '../components/ChangePassword'
import { initPasswordSettings, changeUserPassword } from '../actions/PasswordSettingsActions'

const ChangePasswordContainer = props => <ChangePassword {...props} />

const mapStateToProps = state => ({
  passwordsettings: state.passwordsettings
})

export default connect(mapStateToProps, { initPasswordSettings, changeUserPassword })(ChangePasswordContainer)
