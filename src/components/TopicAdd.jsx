import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'
import { Row, Col, Form, Icon, Input, Button, message, Tooltip, Select } from 'antd'
const FormItem = Form.Item

const { array, bool, func, shape } = PropTypes



class TopicAdd extends React.Component {

  render () {

    const {
      form: { getFieldDecorator },
      location: { search }
    } = this.props

    return (
      <div className='topicadd'>
        <h1>Lõputöö teema registreerimise vorm</h1>
        
        <Form onSubmit={this.submit}>
              <h2 className='text-align-center'>
                Sign in to <span className='emphisize'>Te</span>
              </h2>
              <FormItem>
                <Select>
                  <Option value='1'>1</Option>
                </Select>
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter correct email' }
                  ]
                })(<Input prefix={<Icon type='user' />} placeholder='Email' />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                })(
                  <Input
                    prefix={<Icon type='lock' />}
                    type='password'
                    placeholder='Password'
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login__button'
                  loading={false}
                >
                  Log in
                </Button>
                <p>
                  <Tooltip
                    placement='topLeft'
                    title='If you do not have account please contact your school administrator'
                  >
                    <span>do not have account?</span>
                  </Tooltip>
                </p>
              </FormItem>
            </Form>
      </div>
    )
  }

}


export default Form.create()(TopicAdd)