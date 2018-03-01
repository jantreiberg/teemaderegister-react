import React from 'react'
import { connect } from 'react-redux'

import HeaderWrap from '../components/HeaderWrap'
import { logout } from '../actions/AuthActions'
import { setSearch, getSearchCounts } from '../actions/SearchActions'
import { setLanguage } from '../actions/SettingsActions'

const HeaderWrapContainer = props => <HeaderWrap {...props} />

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

export default connect(mapStateToProps, { logout, setSearch, getSearchCounts, setLanguage })(
  HeaderWrapContainer
)
