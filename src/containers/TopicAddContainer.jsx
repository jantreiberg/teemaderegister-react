import React from 'react'
import { connect } from 'react-redux'
import { triggerAddTopic } from '../actions/TopicActions'
import TopicAdd from '../components/TopicAdd'

const TopicAddContainer = props => <TopicAdd {...props} />

const mapStateToProps = state => ({
  topicForm: state.topic.form
})

export default connect(mapStateToProps, { triggerAddTopic })(TopicAddContainer)
