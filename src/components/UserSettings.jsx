import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

const { func, object, shape } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getProfile: func.isRequired,
  initProfile: func.isRequired,
  location: object.isRequired,
  profile: shape({
    user: object.isRequired
  }).isRequired,
  saveData: func.isRequired
}

class UserSettings extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    this.props.getProfile()
  }

  componentWillUnmount () {
    this.props.initProfile()
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.saveData(values)
      }
    })
  }

  render () {
    const crumbs = [{ url: this.props.location.pathname, name: 'Profile' }]

    const {
      form: { getFieldDecorator },
      profile: {
        loading,
        user: {
          firstName,
          lastName,
          email
        }
      }
    } = this.props

    return (
      <div className='settings'>
        {!loading &&
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <Row gutter={8}>
            <Col span={8} />
            <Col xs={24} sm={8}>
              <Form onSubmit={this.submit} className='login__form'>
                <h2 style={{ marginBottom: '20' }} className='text-align-center'>
                Your Details
                </h2>
                <FormItem>
                  {getFieldDecorator('firstName', {
                    rules: [
                      { required: true, message: 'Please enter your first name' }
                    ],
                    initialValue: firstName
                  })(<Input type='text' name='firstName' placeholder='First Name' />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('lastName', {
                    rules: [
                      { required: true, message: 'Please enter your last name' }
                    ],
                    initialValue: lastName
                  })(<Input type='text' name='lastName' placeholder='Last Name' />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a correct email' }
                    ],
                    initialValue: email
                  })(<Input name='userEmail' placeholder='Email' />)}
                </FormItem>
                <FormItem>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='button--fullWidth'
                    loading={loading}
                  >
                Save Changes
                  </Button>
                </FormItem>
              </Form>
            </Col>
            <Col span={8} />
          </Row>
          <div>
            <Row gutter={8}>
              <Col span={8} />
              <Col xs={24} sm={8}>
                <h2 style={{ marginBottom: '20' }} className='text-align-center'>
                Password Settings
                </h2>
                <Link to='/passwordsettings'><Button
                  type='danger'
                  className='button--fullWidth'
                >Change Password</Button></Link>
              </Col>
              <Col span={8} />
            </Row>
          </div>
        </div>}
      </div>
    )
  }
}

UserSettings.propTypes = propTypes

export default Form.create()(UserSettings)
