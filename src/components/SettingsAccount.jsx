import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, Upload, Icon, message, Avatar, Tooltip } from 'antd'
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
    error: shape({
      message: string
    }).isRequired,
    hasError: bool.isRequired,
    message: string,
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
    }).isRequired,
    formLoading: shape({
      picture: bool.isRequired,
      account: bool.isRequired
    }).isRequired
  }).isRequired,
  updateProfile: func.isRequired,
  uploadProfilePicture: func.isRequired

}

class SettingsAccount extends React.Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { settings: { formLoading } } = this.props
    const { settings: { formLoading: newFormLoading } } = nextProps

    if ((!newFormLoading.picture && newFormLoading.picture !== formLoading.picture) ||
      (!newFormLoading.account && newFormLoading.account !== formLoading.account)) {
      if (nextProps.settings.hasError) {
        message.error(nextProps.settings.error.message, 10)
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

  beforeUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
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
        },
        formLoading
      }
    } = this.props

    const avatarSrc = image
      ? UPLOAD_PATH + image.full + '?userUpdated=' + updatedAt
      : null

    return (
      <div className='usersettings'>
        {!loading &&
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <Row gutter={8}>
            <Col span={8} />
            <Col xs={24} sm={8}>
              <div className='profile-pic' style={{ position: 'relative', height: 200, margin: '0 auto', width: 200 }}>
                {formLoading.picture &&
                  <Icon style={{
                    display: 'block',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    fontSize: '3em',
                    lineHeight: '5.5em',
                    zIndex: 100
                  }} type='loading' />
                }
                <Avatar
                  className='pic-itself'
                  src={avatarSrc}
                  style={{ width: '200px', height: '200px', position: 'absolute' }}
                  size={'large'}
                />
                <div className='profile-pic-buttons' style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -14, marginLeft: -33 }}>
                  <Upload
                    name={'profileImage'}
                    customRequest={this.props.uploadProfilePicture}
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                  >
                    <Tooltip placement='top' title={'Upload new image'}>
                      <Button shape={'circle'}>
                        <Icon type='upload' />
                      </Button>
                    </Tooltip>
                  </Upload>
                  <Tooltip placement='top' title={'Restore default'}>
                    <Button style={{ marginLeft: '10px' }} shape={'circle'} onClick={this.props.resetProfilePicture}>
                      <Icon type='close' />
                    </Button>
                  </Tooltip>
                </div>
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
                    loading={formLoading.account}
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
