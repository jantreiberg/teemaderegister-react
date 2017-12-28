import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button, Upload, Icon, message, Avatar, Spin, Modal, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { UPLOAD_PATH, PROFILE_PIC_MAX_SIZE_IN_MB } from 'config'

const FormItem = Form.Item
const confirm = Modal.confirm
const { func, object, shape, bool, string, array } = PropTypes

const propTypes = {
  fileList: array,
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getProfile: func.isRequired,
  initSettings: func.isRequired,
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

    this.defaultAvatarSrc = '/profile/full/default.jpg'

    this.submit = this.submit.bind(this)
    this.resetPictureConfirm = this.resetPictureConfirm.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { settings: { formLoading } } = this.props
    const { settings: { formLoading: newFormLoading } } = nextProps

    if ((!newFormLoading.picture && newFormLoading.picture !== formLoading.picture) ||
      (!newFormLoading.account && newFormLoading.account !== formLoading.account)) {
      if (nextProps.settings.hasError) {
        message.error(nextProps.settings.error.message, 2)
      } else {
        message.success(nextProps.settings.message, 2)
      }
    }
  }

  componentDidMount () {
    this.props.getProfile()
  }

  componentWillUnmount () {
    this.props.initSettings()
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
    const fileTypes = new RegExp('jpeg|jpg|png')
    const allowedType = fileTypes.test(file.type.toLowerCase())
    if (!allowedType) message.error('You can only upload JPG file!')

    const allowedSize = file.size / 1024 / 1024 < PROFILE_PIC_MAX_SIZE_IN_MB
    if (!allowedSize) message.error(`Image must smaller than ${PROFILE_PIC_MAX_SIZE_IN_MB}MB!`)

    return allowedType && allowedSize
  }

  resetPictureConfirm () {
    const { resetProfilePicture } = this.props

    confirm({
      title: 'Do you want to reset to default picture?',
      onOk: () => resetProfilePicture()
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
          login: { email },
          updatedAt
        }
      }
    } = this.props

    const avatarSrc = image
      ? UPLOAD_PATH + image.full + '?userUpdated=' + updatedAt
      : null

    return (
      <div className='settingsAccount'>
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
                          customRequest={this.props.uploadProfilePicture}
                          showUploadList={false}
                          beforeUpload={this.beforeUpload}
                        >
                          <span className='profileResetDropdownMenu__link'>
                            <Icon type='upload' /> Upload photo
                          </span>
                        </Upload>
                      </Menu.Item>
                      {image.full !== this.defaultAvatarSrc &&
                        <Menu.Item>
                          <span className='profileResetDropdownMenu__link' onClick={this.resetPictureConfirm}>
                            <Icon type='close' /> Remove
                          </span>
                        </Menu.Item>}
                      <Menu.Item>
                        <span className='profileResetDropdownMenu__link'>Cancel</span>
                      </Menu.Item>
                    </Menu>
                  }>
                  <div style={{height: '100%'}}>
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
              <Form onSubmit={this.submit} className='form--narrow'>
                <h2 className='text-align--center'>Your details</h2>
                <FormItem label='First name'>
                  {getFieldDecorator('firstName', {
                    rules: [
                      { required: true, message: 'Please enter your first name' }
                    ],
                    initialValue: firstName
                  })(
                    <Input type='text'/>
                  )}
                </FormItem>
                <FormItem label='Last name'>
                  {getFieldDecorator('lastName', {
                    rules: [
                      { required: true, message: 'Please enter your last name' }
                    ],
                    initialValue: lastName
                  })(
                    <Input type='text' name='lastName' />
                  )}
                </FormItem>
                <FormItem label='Email'>
                  {getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a correct email' }
                    ],
                    initialValue: email
                  })(
                    <Input name='userEmail' />
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
                  <Button
                    type='primary'
                    className='button--fullWidth'
                  >
                    <Link to='/settings/password'>
                    Change Password
                    </Link>
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
