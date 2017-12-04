import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message } from 'antd'
const FormItem = Form.Item

const { func, object, shape, bool, string } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired
  }).isRequired,
  location: object.isRequired,
  password: shape({
    hasError: bool.isRequired,
    loading: bool.isRequired,
    message: shape({
      text: string,
      type: string
    }),
    error: shape({
      message: string
    }).isRequired
  }).isRequired,
  resetPassword: func.isRequired,
  resetPasswordToken: func.isRequired
}

class AccountPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
    this.checkPassword = this.checkPassword.bind(this)
    this.checkPasswordConfirm = this.checkPasswordConfirm.bind(this)
    this.handleInactiveInput = this.handleInactiveInput.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { password } = this.props
    const { message: newMessage, error, loading, hasError } = nextProps.password

    if (newMessage.text !== password.message.text ||
      loading !== password.loading) {
      if (newMessage.text) {
        message[newMessage.type](newMessage.text, 10)
      }
      if (hasError) {
        message.error(error.message, 10)
      }
    }
  }

  componentDidMount () {
    this.props.resetPasswordToken()
  }

  handleInactiveInput (e) {
    const { value } = e.target
    const form = this.props.form
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })

    if (form.getFieldValue('password-confirm') &&
        form.getFieldValue('password-confirm').length > 0) {
      form.validateFields(['password-confirm'], { force: true })
    }
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    const formInputValue = form.getFieldValue('password')

    if (value && value !== formInputValue) {
      callback(new Error(`Passwords does not match!`))
    }
    callback()
  }

  checkPasswordConfirm (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['password-confirm'], { force: true })
    }
    callback()
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.resetPassword(values)
        this.props.form.resetFields(['password', 'password-confirm'])
      }
    })
  }

  render () {
    const {
      form: { getFieldDecorator },
      password: { loading }
    } = this.props

    const crumbs = [{ url: this.props.location.pathname, name: 'Password reset' }]

    return (
      <div className="accountPassword">
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='form--narrow'>
              <h2 className='text-align-center'>Password reset</h2>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be 8 characters long' },
                    { validator: this.checkPasswordConfirm }
                  ]
                })(
                  <Input
                    prefix={<Icon type='lock' />}
                    type='password'
                    placeholder='Password'
                    onBlur={this.handleInactiveInput}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password-confirm', {
                  rules: [
                    { required: true, message: 'Please confirm your password!' },
                    { validator: this.checkPassword }
                  ]
                })(
                  <Input
                    prefix={<Icon type='lock' />}
                    type='password'
                    placeholder='Confirm password'
                    onBlur={this.handleInactiveInput}
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='button--fullWidth'
                  loading={loading}
                >
                  Reset password
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

AccountPassword.propTypes = propTypes

export default Form.create()(AccountPassword)
