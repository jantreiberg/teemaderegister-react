import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'

const { func, object, shape, bool, string } = PropTypes

const FormItem = Form.Item

const propTypes = {
  changeUserPassword: func.isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    resetFields: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  initPasswordSettings: func.isRequired,
  location: object.isRequired,
  settings: shape({
    error: shape({
      message: string
    }).isRequired,
    hasError: bool.isRequired,
    message: string,
    formLoading: shape({
      password: bool.isRequired
    }).isRequired
  }).isRequired
}

class SettingsPassword extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { settings } = this.props
    const { message: newMessage, error, formLoading, hasError } = nextProps.settings

    if (!formLoading.password && formLoading.password !== settings.formLoading.password) {
      if (hasError) {
        message.error(error.message, 2)
      }
      if (newMessage) {
        message.success(newMessage, 2)
        this.props.form.resetFields()
      }
    }
  }

  componentWillUnmount () {
    this.props.initPasswordSettings()
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.changeUserPassword(values)
      }
    })
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    const formInputValue = form.getFieldValue('newPassword')
    if (value && value !== formInputValue) {
      callback(new Error('Passwords must match'))
    } else {
      callback()
    }
  }

  render () {
    const crumbs = [
      { url: '/settings/account', name: 'Settings' },
      { url: null, name: 'Change Password' }
    ]

    const {
      form: { getFieldDecorator },
      settings: { formLoading }
    } = this.props

    return (
      <div className='settingsPassword'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='login__form'>
              <h2 className='text-align--center'>Change Your Password</h2>
              <FormItem label='Current Password'>
                {getFieldDecorator('currentPassword', {
                  rules: [
                    { required: true, message: 'Please enter your current password' }
                  ]
                })(
                  <Input type='password' name='currentPassword' />
                )}
              </FormItem>
              <FormItem label='New Password'>
                {getFieldDecorator('newPassword', {
                  rules: [
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Passwords must be at least 8 characters long' }
                  ]
                })(
                  <Input type='password' name='newPassword' />
                )}
              </FormItem>
              <FormItem label='Confirm New Password'>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    { required: true, message: 'Please enter your new password again' },
                    { validator: this.checkPassword }
                  ]
                })(
                  <Input type='Password' name='confirmPassword' />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='button--fullWidth'
                  loading={formLoading.password}
                >
                  Change Password
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type='default'
                  className='button--fullWidth'
                >
                  <Link to='/settings/account'>
                    Cancel
                  </Link>
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

SettingsPassword.propTypes = propTypes

export default Form.create()(SettingsPassword)
