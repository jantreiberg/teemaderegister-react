import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from './Breadcrumbs'
import { Row, Col, Form, Input, Button } from 'antd'

const FormItem = Form.Item

const { func, object, shape, string } = PropTypes

const propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    getFieldInstance: func.isRequired,
    validateFields: func.isRequired
  }).isRequired,
  getProfile: func.isRequired,
  location: string,
  profile: object.isRequired,
  user: object.isRequired
}

class UserSettings extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    this.props.getProfile()
  }

  submit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Values recieved: ', values)
      }
    })
  }

  // Function for checking the equality of passwords
  // Must have a callback
  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(new Error('Passwords must match'))
    } else {
      callback()
    }
  }
  /*
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
  */

  render () {
    const crumbs = [{ url: this.props.location.pathname, name: 'Profile' }]

    /* const { previewVisible, previewImage, fileList } = this.state; */
    /* const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    ); */

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

    console.log(firstName)

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
                    className='login__button'
                  >
                Save Changes
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

UserSettings.propTypes = propTypes

export default Form.create()(UserSettings)
