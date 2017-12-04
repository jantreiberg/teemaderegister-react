import React from 'react'
import { connect } from 'react-redux'
import {  getCurriculum, initCurriculum,triggerAddCurriculum } from '../actions/CurriculumActions'
import FormCurriculum from '../components/FormCurriculum'

const AddCurriculumContainer = props => <FormCurriculum {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { triggerAddCurriculum,initCurriculum })(AddCurriculumContainer)
