import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { getToken } from '../utils/jwt'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message, Tooltip, Select, Spin, Checkbox } from 'antd'
import debounce from 'lodash.debounce'

import Api from '../utils/Api'
import { SUPERVISORS_URL } from '../constants/ApiConstants'



const Option = Select.Option
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const plainOptions = ['ET', 'EN']

const { bool, func, object, shape, string } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  initCurriculum: func.isRequired,
  triggerAddCurriculum: func.isRequired

}

function handleFocus () {
  console.log('focus')
}

function onChange (e) {
  console.log(`checked = ${e.target.checked}`)
}

class AddCurriculum extends React.Component {
  constructor (props) {
    super(props)
    this.lastFetchId = 0
    this.checkboxValues = []
    this.fetchUser = debounce(this.fetchUser.bind(this), 800)
    this.submit = this.submit.bind(this)
    this.checkboxChanged = this.checkboxChanged.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      data: [],
      value: [],
      fetching: false,
      redirectToNewPage: false
    }
  }

  fetchUser (value) {
    if(value !== '')
  {
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ fetching: true })
    Api('GET',SUPERVISORS_URL, {params:{q:value}} )
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return
        }
        const data = body.supervisors.map(user => ({
          text: user.supervisor,
          value: user._id,
          fetching: false
        }))
        this.setState({ data })
      })
    }
  }

  handleChange (value) {
    console.log('select', value)
  }

  componentWillUnmount () {
    this.props.initCurriculum()
  }

  checkboxChanged (values) {
    this.checkboxValues = values
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.languages = this.checkboxValues
        values.representative = values.representative.key
        this.setState({ loading: true })
        // show user loading
          this.props.triggerAddCurriculum(values)
          window.setTimeout(() => {
          
          this.setState({ loading: false })

          if (!this.props.curriculum.messageFlag && this.props.curriculum.message !== "") {
            message.error(this.props.curriculum.message)
            }
            else if(this.props.curriculum.messageFlag && this.props.curriculum.message ){
              message.success(this.props.curriculum.message)
            }
          }, 1000)
      }
    })
  }

  render () {
    const {
      form: { getFieldDecorator, validateFields }
    } = this.props

    const crumbs = [{ url: this.props.location.pathname, name: 'Lisa õppekava' }]
    const { fetching, data, value } = this.state

    const { loading } = this.state

    // The part that makes the redirect happen
    if (this.state.redirectToNewPage) {
      return (
      <Redirect to="/"/>
      )
    }

    return (
      <div className='addCurriculum'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
        <Form onSubmit={this.submit} className='form--narrow'>
          <h2 className='text-align-center'>
            Lisa õppekava
          </h2>
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
                showSearch
                style={{ width: 200 }}
                placeholder="Type"
                optionFilterProp="children"
                onFocus={handleFocus}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                onChange={this.handleChange}
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
              <div>
                <CheckboxGroup options={plainOptions} onChange={this.checkboxChanged} />
              </div>
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
          <FormItem>     {getFieldDecorator('nameEn', {
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
              className='login__button'
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

export default Form.create()(AddCurriculum)
