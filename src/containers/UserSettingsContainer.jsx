import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfile, saveData, initProfile, resetProfilePicture } from '../actions/UserSettingsActions'
import UserSettings from '../components/UserSettings'

const UserSettingsContainer = props => <UserSettings {...props} />

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = (dispatch, props) => {
  const { _id } = props.auth.user

  return bindActionCreators(
    {
      initProfile,
      getProfile: () => getProfile(_id),
      saveData: user => saveData(_id, user),
      resetProfilePicture: () => resetProfilePicture(_id)
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsContainer)
