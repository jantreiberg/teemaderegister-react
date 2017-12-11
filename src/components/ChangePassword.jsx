import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

const { func, object, shape } = PropTypes

const FormItem = Form.Item

const propTypes = {
  changeUserPassword: func.isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  initPasswordSettings: func.isRequired,
  location: object.isRequired
}

class ChangePassword extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
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

  // Function for checking the equality of passwords
  // Must have a callback
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
    const crumbs = [{ url: this.props.location.pathname, name: 'Change Password' }]

    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <div className='passwordsettings'>
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <Row gutter={8}>
            <Col span={8} />
            <Col xs={24} sm={8}>
              <Form onSubmit={this.submit} className='login__form'>
                <h2 style={{ marginBottom: 20 }}className='text-align-center'>
                Change Your Password
                </h2>
                <FormItem>
                  {getFieldDecorator('currentPassword', {
                    rules: [
                      { required: true, message: 'Please enter your current password' }
                    ]
                  })(<Input type='password' name='currentPassword' placeholder='Current Password' />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('newPassword', {
                    rules: [
                      { required: true, message: 'Please enter your new password' },
                      { min: 8, message: 'Passwords must be at least 8 characters long' }
                    ]
                  })(<Input type='password' name='newPassword' placeholder='New Password' />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      { required: true, message: 'Please enter your new password again' },
                      { validator: this.checkPassword }
                    ]
                  })(<Input type='Password' name='confirmPassword' placeholder='Confirm Password' />)}
                </FormItem>
                <FormItem>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='button--fullWidth'
                  >
                Change Password
                  </Button>
                </FormItem>
                <FormItem>
                  <Link to='/settings/account'>
                    <Button
                      type='default'
                      className='button--fullWidth'
                    >
                    Cancel
                    </Button>
                  </Link>
                </FormItem>
              </Form>
            </Col>
            <Col span={8} />
          </Row>
        </div>
      </div>
    )
  }
}

ChangePassword.propTypes = propTypes

export default Form.create()(ChangePassword)
