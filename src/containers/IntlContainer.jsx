import { connect } from 'react-redux'

import { IntlProvider } from 'react-intl'

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
  console.log(state.settings.locale, ownProps.messages[ownProps.locale])

  return ({
    locale: ownProps.locale,
    messages: ownProps.messages
  })
}

export default connect(mapStateToProps, {})(IntlProvider)
