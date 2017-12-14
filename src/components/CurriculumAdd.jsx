import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, message, Select, Spin, Checkbox } from 'antd'
import debounce from 'lodash.debounce'
import { setDocTitle } from '../utils/Helpers'


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

    this.plainOptions = ['ET', 'EN']
    this.checkboxValues = []

    this.fetchUser = debounce(this.fetchUser.bind(this), 500)
    this.submit = this.submit.bind(this)
    this.checkboxChanged = this.checkboxChanged.bind(this)

    this.state = {
      data: [],
      value: [],
      fetching: false,
      redirectToNewPage: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { curriculumForm } = this.props
    const { curriculum, error, loading, hasError } = nextProps.curriculumForm

    // trigger when loading finishes
    if (curriculumForm.loading && !loading) {
      if (curriculum._id) {
        message.success('Saved new curriculum ' + curriculum.names.et)
        // TODO clear form fields!
      }
      if (hasError) {
        message.error(error.message, 10)
      }
    }
  }

  componentWillUnmount () {
    this.props.initCurriculum()
  }

  componentDidMount () {
    setDocTitle('Add Curriculum')
  }

  checkboxChanged (values) {
    this.checkboxValues = values
  }

  fetchUser (value) {
    if (!value) return

    this.setState({ fetching: true }, () => {
      Api('GET', SUPERVISOR_CURRICULUMFORM_URL, { params: { q: value } })
        .then(body => {
          const data = body.supervisors.map(user => ({
            text: user.fullName,
            value: user._id
          }))
          this.setState({ data, fetching: false })
        })
    })
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return

      this.props.triggerAddCurriculum({
        ...values,
        languages: this.checkboxValues,
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

    const crumbs = [{ url: this.props.location.pathname, name: 'Lisa õppekava' }]
    const { fetching, data } = this.state

    // The part that makes the redirect happen
    if (this.state.redirectToNewPage) {
      return (
        <Redirect to="/"/>
      )
    }

    return (
      <div className='curriculumAdd'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='form--narrow'>
              <h2 className='text-align-center'>Lisa õppekava</h2>
              <FormItem>
                {getFieldDecorator('abbreviation', {
                  rules: [
                    { required: true, message: 'Please input your abbreviation!' }
                  ]
                })(<Input id='abbreviation' placeholder='Abbreviation' />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('type', {
                  rules: [
                    { required: true, message: 'Please select type!' }
                  ]
                })(
                  <Select
                    placeholder="Type"
                  >
                    <Option value="BA">BA</Option>
                    <Option value="MA">MA</Option>
                    <Option value="PHD">PHD</Option>
                  </Select>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('representative', {
                  rules: [
                    { required: true, message: 'Please select represantive!' }
                  ]
                })(
                  <Select
                    showSearch
                    labelInValue
                    placeholder="Representative"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.fetchUser}
                    style={{ width: '100%' }}
                  >
                    {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                  </Select>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('faculty', {
                  rules: [
                    { required: true, message: 'Please input faculty!' }
                  ]
                })(
                  <Input placeholder='Faculty' />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('languages', {
                  rules: [
                    { required: true, message: 'Please select language!' }
                  ]
                })(
                  <CheckboxGroup options={this.plainOptions} onChange={this.checkboxChanged} />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('nameEt', {
                  rules: [
                    { required: true, message: 'Please input name!' }
                  ]
                })(
                  <Input placeholder='Name ET' />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('nameEn', {
                  rules: [
                    { required: true, message: 'Please input name!' }
                  ]
                })(
                  <Input placeholder='Name EN' />)}
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
