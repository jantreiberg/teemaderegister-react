import React from 'react'
import { connect } from 'react-redux'
import { initLogin, triggerLogin } from '../actions/LoginActions'
import UserSettings from '../components/UserSettings'

const UserSettingsContainer = props => <UserSettings {...props} />

const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps, { initLogin, triggerLogin })(UserSettingsContainer)
