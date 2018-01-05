import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Link } from 'react-router-dom'
import { PROFILE_PIC_MAX_SIZE_IN_MB } from 'config'
import { USER_PICTURE_UPLOAD_URL } from '../constants/ApiConstants'
import { getToken } from '../utils/jwt'

import { Row, Col, Form, Input, Button, Upload, Icon, message, Avatar, Spin, Modal, Dropdown, Menu, Select } from 'antd'
const FormItem = Form.Item
const { confirm } = Modal
const { Option } = Select

const { func, shape, bool, string, array } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getProfile: func.isRequired,
  initSettings: func.isRequired,
  resetPicture: func.isRequired,
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
        image: shape({
          full: string
        })
      }).isRequired,
      login: shape({
        email: string,
        roles: array
      }).isRequired,
      updatedAt: string.isRequired
    }).isRequired,
    formLoading: shape({
      picture: bool.isRequired,
      account: bool.isRequired
    }).isRequired
  }).isRequired,
  updateProfile: func.isRequired,
  uploadPictureEnd: func.isRequired,
  uploadPictureError: func.isRequired,
  uploadPictureStart: func.isRequired
}

class SettingsAccount extends React.Component {
  constructor (props) {
    super(props)

    this.defaultAvatarSrc = '/profile/full/default.jpg'

    this.submitUpdateProfile = this.submitUpdateProfile.bind(this)
    this.resetPictureConfirm = this.resetPictureConfirm.bind(this)
    this.onUploadPictureChange = this.onUploadPictureChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { settings: { formLoading } } = this.props
    const {
      settings,
      settings: {
        formLoading: newFormLoading,
        hasError
      }
    } = nextProps

    if ((!newFormLoading.picture && newFormLoading.picture !== formLoading.picture) ||
    (!newFormLoading.account && newFormLoading.account !== formLoading.account)) {
      if (hasError) {
        message.error(settings.error.message, 2)
      } else {
        message.success(settings.message, 2)
      }
    }
  }

  componentDidMount () {
    this.props.getProfile()
  }

  componentWillUnmount () {
    this.props.initSettings()
  }

  submitUpdateProfile (e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) =>
      !err && this.props.updateProfile(values))
  }

  beforeUpload (file) {
    const fileTypes = new RegExp('jpeg|jpg|png')
    const allowedType = fileTypes.test(file.type.toLowerCase())
    if (!allowedType) message.error('You can only upload image files - jpg, jpeg, png!')

    const allowedSize = file.size / 1024 / 1024 < PROFILE_PIC_MAX_SIZE_IN_MB
    if (!allowedSize) {
      message.error(`Image must smaller than ${PROFILE_PIC_MAX_SIZE_IN_MB}MB!`)
    }

    return allowedType && allowedSize
  }

  onUploadPictureChange ({ file: { status, response } }) {
    if (status === 'uploading' && !this.props.settings.formLoading.picture) {
      return this.props.uploadPictureStart()
    }
    if (status === 'done') return this.props.uploadPictureEnd(response)
    if (status === 'error') return this.props.uploadPictureError(response)
  }

  resetPictureConfirm () {
    confirm({
      title: 'Do you want to reset to default picture?',
      onOk: () => this.props.resetPicture()
    })
  }

  render () {
    const crumbs = [{ url: null, name: 'Settings' }]
    const {
      form: { getFieldDecorator },
      settings: {
        loading,
        formLoading,
        user: {
          profile: { firstName, lastName, image },
          login: { email, roles },
          updatedAt
        }
      }
    } = this.props

    const avatarSrc = image
      ? `/uploads${image.full}?updatedAt=${updatedAt}`
      : null

    return (
      <div className='settingsAccount width--public-page'>
        {!loading &&
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <Row gutter={8}>
            <Col span={8} />
            <Col xs={24} sm={8}>
              <div className='profilePicture'>
                <Dropdown
                  trigger={['click']}
                  placement='bottomCenter'
                  overlay={
                    <Menu className='profileResetDropdownMenu'>
                      <Menu.Item>
                        <Upload
                          name={'profileImage'}
                          action={USER_PICTURE_UPLOAD_URL}
                          headers={{Authorization: `Bearer ${getToken()}`}}
                          showUploadList={false}
                          onChange={this.onUploadPictureChange}
                        >
                          <span className='profileResetDropdownMenu__link'>
                            <Icon type='upload' /> Upload photo
                          </span>
                        </Upload>
                      </Menu.Item>
                      {image.full !== this.defaultAvatarSrc &&
                        <Menu.Item>
                          <span
                            className='profileResetDropdownMenu__link'
                            onClick={this.resetPictureConfirm}
                          >
                            <Icon type='close' /> Remove
                          </span>
                        </Menu.Item>}
                      <Menu.Item>
                        <span className='profileResetDropdownMenu__link'>
                          Cancel
                        </span>
                      </Menu.Item>
                    </Menu>
                  }>
                  <div>
                    <Avatar
                      className='profilePicture__avatar'
                      src={avatarSrc}
                      size={'large'}
                    />
                    <span className='profilePicture__edit-icon'>
                      <Icon type='edit' />
                    </span>
                  </div>
                </Dropdown>
                {formLoading.picture &&
                  <div className='profilePicture__loading'>
                    <Spin size='large' />
                  </div>
                }
              </div>
              <Form onSubmit={this.submitUpdateProfile} className='form--narrow'>
                <h2 className='text-align--center'>Your details</h2>
                <FormItem label='First name'>
                  {getFieldDecorator('firstName', {
                    rules: [
                      { required: true, message: 'Please enter your first name' }
                    ],
                    initialValue: firstName
                  })(<Input/>)}
                </FormItem>
                <FormItem label='Last name'>
                  {getFieldDecorator('lastName', {
                    rules: [
                      { required: true, message: 'Please enter your last name' }
                    ],
                    initialValue: lastName
                  })(<Input/>)}
                </FormItem>
                <FormItem label='Email'>
                  {getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a correct email' }
                    ],
                    initialValue: email
                  })(<Input type='email'/>)}
                </FormItem>
                <FormItem label='Roles'>
                  {getFieldDecorator('roles', {
                    initialValue: roles,
                    rules: [ { required: true } ]
                  })(
                    <Select disabled mode='multiple'>
                      {roles.map(r =>
                        <Option key={r}>{r}</Option>
                      )}
                    </Select>
                  )}
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
                <h2 className='text-align--center'>Password Settings</h2>
                <FormItem>
                  <Button type='primary' className='button--fullWidth'>
                    <Link to='/settings/password'>Change Password</Link>
                  </Button>
                </FormItem>
              </Form>
            </Col>
            <Col span={8} />
          </Row>
        </div>}
      </div>
    )
  }
}

SettingsAccount.propTypes = propTypes

export default Form.create()(SettingsAccount)
