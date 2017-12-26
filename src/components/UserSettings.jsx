import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, Upload, Icon, message, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'
import { getToken } from '../utils/jwt'

const FormItem = Form.Item

const { func, object, shape, bool, string, array } = PropTypes

const propTypes = {
  fileList: array,
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getProfile: func.isRequired,
  initProfile: func.isRequired,
  location: object.isRequired,
  profile: shape({
    loading: bool.isRequired,
    user: shape({
      firstName: string,
      lastName: string,
      email: string,
      image: string,
      updatedAt: string
    }).isRequired
  }).isRequired,
  resetProfilePicture: func.isRequired,
  saveData: func.isRequired
}

class UserSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newImage: null
    }
    this.submit = this.submit.bind(this)
    this.resetPicture = this.resetPicture.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profile.message !== this.props.profile.message) {
      if (nextProps.profile.hasError) {
        message.error(nextProps.profile.message, 10)
      } else {
        message.success(nextProps.profile.message, 10)
      }
    }
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

  resetPicture (e) {
    e.preventDefault()
    this.props.resetProfilePicture()
    this.setState({
      newImage: 'default.jpg'
    })
  }

  handleChange (info) {
    if (info.file.status === 'error') {
      message.error(info.file.response.message || info.file.response)
    }
    if (info.file.status === 'done') {
      console.log(info)
      this.setState({
        newImage: info.file.response.user.profile.image,
        newUpdatedAt: info.file.response.user.updatedAt
      })
      console.log(this.state)
    }
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
          email,
          image,
          updatedAt
        }
      }
    } = this.props

    const { newImage, newUpdatedAt } = this.state

    const avatarSrc = '/uploads/profile/' +
      (newImage || image) +
      '?userUpdated=' +
      (updatedAt || newUpdatedAt)

    const content = (
      <div>
        <Upload
          name={'profile-image'}
          action={'/api/profile-image'}
          headers={{Authorization: `Bearer ${getToken()}`}}
          showUploadList={false}
          onChange={this.handleChange}
        >
          <Button shape={'circle'}>
            <Icon type='upload' />
          </Button>
        </Upload>
        <Button style={{ marginLeft: '20px' }} shape={'circle'} onClick={this.resetPicture}>
          <Icon type='delete' />
        </Button>
      </div>
    )

    return (
      <div className='usersettings'>
        {!loading &&
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <Row gutter={8}>
            <Col span={8} />
            <Col xs={24} sm={8}>
              <Popover content={ content }>
                <Avatar
                  src={avatarSrc}
                  style={{ width: '200px', height: '200px' }}
                  size={'large'}
                />
              </Popover>
              <Form onSubmit={this.submit} className='login__form'>
                <h2 style={{ marginBottom: '20px' }} className='text-align-center'>
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
                <h2 style={{ marginBottom: 20 }} className='text-align-center'>
                Password Settings
                </h2>
                <Link to='/settings/password'><Button
                  type='primary'
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
