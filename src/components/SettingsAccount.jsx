import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, Upload, Icon, message, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'
import { UPLOAD_PATH } from 'config'

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
  resetProfilePicture: func.isRequired,
  settings: shape({
    loading: bool.isRequired,
    user: shape({
      profile: shape({
        firstName: string,
        lastName: string,
        image: object
      }),
      login: shape({
        email: string
      }),
      roles: array,
      updatedAt: string
    }).isRequired
  }).isRequired,
  updateProfile: func.isRequired,
  uploadProfilePicture: func.isRequired

}

class SettingsAccount extends React.Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.resetPicture = this.resetPicture.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.settings.message !== this.props.settings.message) {
      if (nextProps.settings.hasError) {
        message.error(nextProps.settings.message, 10)
      } else {
        message.success(nextProps.settings.message, 10)
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
        this.props.updateProfile(values)
      }
    })
  }

  resetPicture (e) {
    e.preventDefault()
    this.props.resetProfilePicture()
  }

  handleChange (info) {
    if (info.file.status === 'error') {
      message.error(info.file.response.message || info.file.response)
    }
    if (info.file.status === 'done') {
      this.setState({
        newImage: info.file.response.user.profile.image,
        newUpdatedAt: info.file.response.user.updatedAt
      })
    }
  }

  render () {
    const crumbs = [{ url: null, name: 'Settings' }]
    const {
      form: { getFieldDecorator },
      settings: {
        loading,
        user: {
          profile: {
            firstName,
            lastName,
            image
          },
          login: {
            email
          },
          updatedAt
        }
      }
    } = this.props

    const avatarSrc = image
      ? UPLOAD_PATH + image.full + '?userUpdated=' + updatedAt
      : null

    const content = (
      <div>
        <Upload
          name={'profileImage'}
          customRequest={this.props.uploadProfilePicture}
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
              <div>
                <Popover placement={'bottomLeft'} content={ content }>
                  <Avatar
                    src={avatarSrc}
                    style={{ marginTop: '35px', marginBottom: '65px', width: '200px', height: '200px' }}
                    size={'large'}
                  />
                </Popover>
              </div>
              <Form onSubmit={this.submit} className='login__form'>
                <h2 style={{ textDecoration: 'underline', marginBottom: '20px' }} className='text-align-center'>
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
                <h2 style={{ textDecoration: 'underline', marginBottom: 20 }} className='text-align-center'>
                Password Settings
                </h2>
                <FormItem>
                  <Link to='/settings/password'><Button
                    type='primary'
                    className='button--fullWidth'
                    htmlType='button'
                  >Change Password</Button></Link>
                </FormItem>
              </Col>
              <Col span={8} />
            </Row>
          </div>
        </div>}
      </div>
    )
  }
}

SettingsAccount.propTypes = propTypes

export default Form.create()(SettingsAccount)
