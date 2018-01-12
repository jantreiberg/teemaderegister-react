import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../components/Page'
import { getPage } from '../actions/PageActions'
const PagesContainer = props => <Page {...props} />

const mapStateToProps = state => ({
  page: state.page
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {

      getPage: () => getPage(props.match.params.systemTag)
      // getPage: () => getPage('contacts')

    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(PagesContainer)
