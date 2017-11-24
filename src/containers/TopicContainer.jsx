import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Topic from '../components/TopicAdd'

const TopicContainer = props => <Topic {...props} />

export default (TopicContainer)
