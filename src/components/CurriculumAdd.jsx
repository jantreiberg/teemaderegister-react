import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, message, Select, Spin, Checkbox, Tooltip } from 'antd'
import debounce from 'lodash.debounce'
import { setDocTitle } from '../utils/Helpers'

import { FACULTY } from 'config'
import { CURRICULUM_TYPES } from '../constants/CurriculumTypes'

import Api from '../utils/Api'
import { SUPERVISOR_CURRICULUMFORM_URL } from '../constants/ApiConstants'

const Option = Select.Option
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const { bool, func, object, shape, string } = PropTypes

const propTypes = {
  curriculumForm: shape({
    curriculum: object.isRequired,
    error: object.isRequired,
    loading: bool.isRequired,
    hasError: bool.isRequired
  }).isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  initCurriculum: func.isRequired,
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  triggerAddCurriculum: func.isRequired

}

class AddCurriculum extends React.Component {
  constructor (props) {
    super(props)

    this.languages = ['ET', 'EN']
    this.languagesValues = []

    this.fetchUsers = debounce(this.fetchUsers.bind(this), 500)
    this.submit = this.submit.bind(this)
    this.languagesChanged = this.languagesChanged.bind(this)

    this.state = {
      representatives: [],
      fetching: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { curriculumForm } = this.props
    const { curriculum, error, loading, hasError } = nextProps.curriculumForm

    if (curriculumForm.loading && !loading) {
      if (curriculum._id) {
        message.success('Saved new curriculum ' + curriculum.names.et)
        this.props.form.resetFields()
      }
      if (hasError) {
        message.error(error.message, 10)
      }
    }
  }

  componentDidMount () {
    setDocTitle('Add Curriculum')
  }

  componentWillUnmount () {
    this.props.initCurriculum()
  }

  languagesChanged (values) {
    this.languagesValues = values
  }

  fetchUsers (value) {
    if (!value) return

    this.setState({ fetching: true }, () => {
      Api('GET', SUPERVISOR_CURRICULUMFORM_URL, { params: { q: value } })
        .then(body => {
          const representatives = body.supervisors.map(user => ({
            text: user.fullName,
            value: user._id
          }))
          this.setState({ representatives, fetching: false })
        })
    })
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return

      this.props.triggerAddCurriculum({
        ...values,
        languages: this.languagesValues,
        representative: values.representative.key,
        names: { et: values.nameEt, en: values.nameEn },
        nameEt: undefined,
        nameEn: undefined
      })
    })
  }

  render () {
    const {
      form: { getFieldDecorator },
      curriculumForm: { loading }
    } = this.props

    const crumbs = [{ url: null, name: 'Lisa õppekava' }]
    const { representatives, fetching } = this.state

    return (
      <div className='curriculumAdd width--public-page'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='form--narrow'>
              <h2 className='text-align--center'>Lisa õppekava</h2>
              <FormItem label='Abbreviation'>
                {getFieldDecorator('abbreviation', {
                  rules: [{ required: true, message: 'Please input your abbreviation!' }]
                })(
                  <Input id='abbreviation' />
                )}
              </FormItem>
              <FormItem label='Type'>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Please select type!' }]
                })(
                  <Select>
                    {CURRICULUM_TYPES.map(function (type) {
                      return <Option key={type} value={type}>{type}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem label='Representative'>
                <Tooltip
                  placement='topLeft'
                  title='Start typing name'
                  trigger='focus'
                >
                  {getFieldDecorator('representative', {
                    rules: [{ required: true, message: 'Please select represantive!' }]
                  })(
                    <Select
                      showSearch
                      labelInValue
                      notFoundContent={fetching ? <Spin size='small' /> : null}
                      filterOption={false}
                      onSearch={this.fetchUsers}
                      style={{ width: '100%' }}
                    >
                      {representatives.map(d => <Option key={d.value}>{d.text}</Option>)}
                    </Select>
                  )}
                </Tooltip>
              </FormItem>
              <FormItem label='Faculty'>
                {getFieldDecorator('faculty', {
                  rules: [{ required: true, message: 'Please input faculty!' }],
                  initialValue: FACULTY
                })(
                  <Input disabled/>
                )}
              </FormItem>
              <FormItem label='Languages'>
                {getFieldDecorator('languages', {
                  rules: [{ required: true, message: 'Please select language!' }]
                })(
                  <CheckboxGroup
                    options={this.languages}
                    onChange={this.languagesChanged}
                  />
                )}
              </FormItem>
              <FormItem label='Name ET'>
                {getFieldDecorator('nameEt', {
                  rules: [
                    { required: true, message: 'Please input name!' },
                    { min: 3, message: 'Name has to be atleast 3 chars long!' }
                  ]
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label='Name EN'>
                {getFieldDecorator('nameEn', {
                  rules: [
                    { required: true, message: 'Please input name!' },
                    { min: 3, message: 'Name has to be atleast 3 chars long!' }
                  ]
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='button--fullWidth'
                  loading={loading}
                >
                  Add Curriculum
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    )
  }
}

AddCurriculum.propTypes = propTypes

export default Form.create()(AddCurriculum)
