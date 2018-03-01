import { connect } from 'react-redux'

import { IntlProvider } from 'react-intl'

const mapStateToProps = (state, ownProps) => ({
  locale: state.settings.locale,
  messages: ownProps.messages
})

export default connect(mapStateToProps, {})(IntlProvider)
