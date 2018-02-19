import React from 'react'
import { connect } from 'react-redux'
import { triggerAddTopic, getCurriculums } from '../actions/TopicActions'
import TopicAdd from '../components/TopicAdd'

const TopicAddContainer = props => <TopicAdd {...props} />

const mapStateToProps = state => ({
  topic: state.topic
})

export default connect(mapStateToProps, { triggerAddTopic, getCurriculums })(TopicAddContainer)
