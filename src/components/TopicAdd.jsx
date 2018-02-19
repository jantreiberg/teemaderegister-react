import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, Select, Spin, Tooltip } from 'antd'
import debounce from 'lodash.debounce'
import { setDocTitle } from '../utils/Helpers'

import { TOPIC_TYPES } from '../constants/TopicTypes'

import Api from '../utils/Api'
import { SUPERVISOR_CURRICULUMFORM_URL } from '../constants/ApiConstants'

const Option = Select.Option
const FormItem = Form.Item

const { bool, func, object, shape, string } = PropTypes

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

function handleChange (value) {
  console.log(`selected ${value}`)
}

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getCurriculums: func.isRequired,
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  topic: shape({
    error: object.isRequired,
    loading: bool.isRequired,
    hasError: bool.isRequired
  }).isRequired,
  triggerAddTopic: func.isRequired

}

class AddTopic extends React.Component {
  constructor (props) {
    super(props)

    this.languages = ['ET', 'EN']
    this.languagesValues = []

    this.fetchUsers = debounce(this.fetchUsers.bind(this), 500)
    this.submit = this.submit.bind(this)
    this.languagesChanged = this.languagesChanged.bind(this)
    console.log(props)
    this.state = {
      supervisors: [],
      fetching: false
    }
  }

  /*  componentWillReceiveProps (nextProps) {
    const { topicForm } = this.props
    const { topic, error, loading, hasError } = nextProps.topicForm

    if (topicForm.loading && !loading) {
      if (topic._id) {
        message.success('Saved new topic ' + topic.names.et)
        this.props.form.resetFields()
      }
      if (hasError) {
        message.error(error.message, 10)
      }
    }
  }
  */

  componentDidMount () {
    this.props.getCurriculums()
    setDocTitle('Add Topic')
  }

  languagesChanged (values) {
    this.languagesValues = values
  }

  fetchUsers (value) {
    if (!value) return

    this.setState({ fetching: true }, () => {
      Api('GET', SUPERVISOR_CURRICULUMFORM_URL, { params: { q: value } })
        .then(body => {
          const supervisors = body.supervisors.map(user => ({
            text: user.fullName,
            value: user._id
          }))
          this.setState({ supervisors, fetching: false })
        })
    })
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return

      this.props.triggerAddTopic({
        ...values,
        languages: this.languagesValues,
        supervisor: values.supervisor.key,
        names: { et: values.nameEt, en: values.nameEn },
        nameEt: undefined,
        nameEn: undefined
      })
    })
  }

  render () {
    const {
      form: { getFieldDecorator },
      topic: { loading }
    } = this.props

    const crumbs = [{ url: null, name: 'Lisa teema' }]
    const { supervisors, fetching } = this.state

    return (
      <div className='topicAdd'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='form--narrow'>
              <h2 className='text-align-center'>Lisa teema</h2>
              <FormItem label='Title'>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input your title!' }]
                })(
                  <Input id='title' />
                )}
              </FormItem>
              <FormItem label='Title Eng'>
                {getFieldDecorator('titleEng', {
                  rules: [{ required: true, message: 'Please input your title!' }]
                })(
                  <Input id='titleEng' />
                )}
              </FormItem>
              <FormItem label='Description'>
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please input your description!' }]
                })(
                  <div>
                    <Input id='description' />
                  </div>
                )}
              </FormItem>
              <FormItem label='Supervisor'>
                <Tooltip
                  placement='topLeft'
                  title='Start typing name'
                  trigger='focus'
                >
                  {getFieldDecorator('supervisor', {
                    rules: [{ required: true, message: 'Please select supervisor!' }]
                  })(
                    <Select
                      showSearch
                      labelInValue
                      notFoundContent={fetching ? <Spin size='small' /> : null}
                      filterOption={false}
                      onSearch={this.fetchUsers}
                      style={{ width: '100%' }}
                    >
                      {supervisors.map(d => <Option key={d.value}>{d.text}</Option>)}
                    </Select>
                  )}
                </Tooltip>
              </FormItem>
              <FormItem label='Curriculums'>
                {getFieldDecorator('curriculums', {
                  rules: [{ required: true, message: 'Please select curriculums!' }]
                })(
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Please select'
                    onChange={handleChange}
                  >
                    {this.props.topic.curriculums.map(function (c) {
                      return <Option key={c._id} value={c._id}>{c.names.et}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem label='Type'>
                {getFieldDecorator('types', {
                  rules: [{ required: true, message: 'Please select type!' }]
                })(
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Please select'
                    initialValue={['a10', 'c12']}
                    onChange={handleChange}
                  >
                    {TOPIC_TYPES.map(function (types) {
                      return <Option key={types} value={types}>{types}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='button--fullWidth'
                  loading={loading}
                >
                  Add Topic
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

AddTopic.propTypes = propTypes

export default Form.create()(AddTopic)
