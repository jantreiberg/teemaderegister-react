import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message } from 'antd'
import { setDocTitle } from '../utils/Helpers'
const FormItem = Form.Item

const { func, object, shape, bool, string } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired
  }).isRequired,
  initPasswordReset: func.isRequired,
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
  sendPasswordResetLink: func.isRequired
}

class AccountForgot extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { password } = this.props
    const { message: newMessage, hasError, loading, error } = nextProps.password

    if (newMessage.text !== password.message.text ||
      loading !== password.loading) {
      if (newMessage.text) {
        message[newMessage.type](newMessage.text, 10)
      }
      if (hasError) {
        message.error(error.message)
      }
    }
  }

  componentWillMount () {
    this.props.initPasswordReset()

    setDocTitle('Request password reset')
  }

  componentDidMount () {
    const emailInput = this.props.form.getFieldInstance('email').refs.input
    emailInput.focus()
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sendPasswordResetLink(values)
      }
    })
  }

  render () {
    const {
      form: { getFieldDecorator },
      password: { loading }
    } = this.props

    const crumbs = [{ url: this.props.location.pathname, name: 'Request password reset' }]

    return (
      <div className='accountForgot width--public-page'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='form--narrow'>
              <h2 className='text-align--center'>Request password reset</h2>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter correct email' }
                  ]
                })(<Input prefix={<Icon type='user' />} placeholder='Email' />)}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='button--fullWidth'
                  loading={loading}
                >
                  Send password reset link
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

AccountForgot.propTypes = propTypes

export default Form.create()(AccountForgot)
