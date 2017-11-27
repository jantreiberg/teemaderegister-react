import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { getToken } from '../utils/jwt'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message, Tooltip, Upload, Modal } from 'antd'

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
    this.submit = this.submit.bind(this)
    }
  
  submit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("Values recieved: ", values)
      }
    })
  }

  // Function for checking the equality of passwords
  // Must have a callback
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if(value && value !== form.getFieldValue('newPassword')) {
      callback('Passwords must match')
    } else {
      callback()
    }
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render () {
    
    const crumbs = [{ url: this.props.location.pathname, name: 'Profile' }]
    
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <div className='settings'>
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className='login__form'>
              <h2 style={{ marginBottom: '20' }} className='text-align-center'>
                Your Details
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
                <h2 style={{ marginBottom: '20' }} className='text-align-center'>
                  Change Password
                </h2>
              {getFieldDecorator ('currentPassword', {
                rules: [
                  { required: true, message: 'Please enter your current password' }
                ]
              })(<Input type='password' placeholder='Current Password' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('newPassword', {
                rules: [
                  { required: true, message: 'Please enter your new password'},
                  { min: 8, message: 'Passwords must be at least 8 characters long'}
                ]
              })(<Input type='password' placeholder='New Password' />)}
              </FormItem>
              <FormItem>
              {getFieldDecorator ('newPassword2', {
                rules: [
                  { required: true, message: 'Please enter your new password again' },
                  { validator: this.checkPassword }
                ]
              })(<Input type='password' placeholder='New Password' />)}
              </FormItem>
              <FormItem>
                <h2 style={{ marginBottom: '20' }} className='text-align-center'>
                  Change/Upload Picture
                </h2>
              {getFieldDecorator ('profile_image', {
                rules: [
                  { required: false }
                ]
              })(       
                <div className="clearfix">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length == 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%', height:'100%' }} src={previewImage} />
                </Modal>
              </div>) }
              </FormItem>
              <FormItem>
                <Button 
                  type='primary'
                  htmlType='submit'
                  className='login__button'
                >
                Save Changes
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

UserSettings.propTypes = propTypes

export default Form.create()(UserSettings)