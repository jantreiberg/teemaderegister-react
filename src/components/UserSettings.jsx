import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { getToken } from '../utils/jwt'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message, Tooltip } from 'antd'
const FormItem = Form.Item

const { bool, func, object, shape, string } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
}

class UserSettings extends React.Component {
  constructor (props) {
    super(props)
    }

  render () {
    
    const crumbs = [{ url: this.props.location.pathname, name: 'Profile' }]
    
    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <div className='settings'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form>
              <h2 className='text-align-center'>
                Your Settings
              </h2>
              <FormItem>
              {getFieldDecorator ('firstName', {
                rules: [
                  { required: true, message: 'Please enter your first name' }
                ]
              })(<Input type='text' name='firstName' placeholder='First Name' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('lastName', {
                rules: [
                  { required: true, message: 'Please enter your last name'}
                ]
              })(<Input type='text' name='lastName' placeholder='Last Name' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('email', {
                rules: [
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a correct email' }
                ]
              })(<Input name='userEmail' placeholder='Email' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('currentPassword', {
                rules: [
                  { required: true, message: 'Please enter your current password' }
                ]
              })(<Input type='password' placeholder='Current Password' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('newPassword', {
                rules: [
                  { required: true, message: 'Please enter your new password'}
                ]
              })(<Input type='password' placeholder='New Password' />)}
              </FormItem>
              <FormItem>

              </FormItem>
              <FormItem>
              </FormItem>
              <FormItem>
                <Button>Save Changes</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    )
  }
}

UserSettings.propTypes = propTypes

export default Form.create()(UserSettings)