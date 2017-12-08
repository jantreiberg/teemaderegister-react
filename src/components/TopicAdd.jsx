import React from 'react'
// import PropTypes from 'prop-types'
import Api from '../utils/api'

// import Breadcrumbs from './Breadcrumbs'
// import TableWrap from '../components/TableWrap'
// import getTabs from '../utils/getTabs'
import { Form, Input, Button, Select, AutoComplete } from 'antd'

const FormItem = Form.Item

// const th = (props)

class TopicAdd extends React.Component {
  constructor (props) {
    super(props)
    // const data = ['Tere', 'tetris', 'erts']
    this.state = {
      curriculums: [],
      topics: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount () {
    console.log('laetud')
    Api('GET', 'api/curriculums', {})
      .then(results => {
      // console.log(results)
        const { curriculums } = results
        this.setState({
          curriculums
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleSelectChange (value) {
    Api('GET', 'api/topics?curriculumId=' + value + '&tab=topics&sub=available&order=ascend&all=true', {})
      .then(results => {
        console.log(results)
        const topics = results.topics.map(topic => { return topic.title })
        console.log(topics)
        this.setState({
          topics
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const curriculumsByType = (this.state.curriculums)
    const topics = (this.state.topics)
    // console.log(curriculumsByType)

    const selectOptions = curriculumsByType.map(
      types => {
        let options = types.collection.map(curriculum => {
          return (
            <Select.Option value={curriculum._id} key={curriculum._id}>{curriculum.names['et']} {types.type}</Select.Option>
          )
        })
        return options
      }
    )

    const {
      form: { getFieldDecorator },
      location: { search }
    } = this.props

    return (
      <div className='topicadd'>
        <h1>Lõputöö teema registreerimise vorm</h1>

        <Form onSubmit={this.submit}>

          <FormItem label="Topic" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <AutoComplete dataSource={topics} filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />
          </FormItem>

          <FormItem label="Nimi" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Insert your name!' }]
            })(<Input placeholder='Name'/>)}
          </FormItem>

          <FormItem label="Õppekava" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('curriculum', {
              rules: [{ required: true, message: 'Choose curriculum!' }]
            })(
              <Select placeholder="Choose curriculum" onChange={this.handleSelectChange}>
                {selectOptions}
              </Select>
            )}
          </FormItem>

          <FormItem label="Sisseastumise aasta" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('enrollmentYear', {
              rules: [{ required: true, message: 'Insert your year of enrollment!' }]
            })(<Input placeholder='Year of enrollment'/>)}
          </FormItem>

          <FormItem label="Teema eesti keeles" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('topicInEstonian', {
              rules: [{ required: false, message: 'Insert your chosen topic!' }]
            })(<Input placeholder='Topic In Estonian'/>)}
          </FormItem>

          <FormItem label="Teema inglise keeles" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('topicInEnglish', {
              rules: [{ required: false, message: 'Insert your chosen topic!' }]
            })(<Input placeholder='Topic In English'/>)}
          </FormItem>

          <FormItem label="TLU email" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your Tallinn University email!' },
                { type: 'email', message: 'Please enter correct email' }
              ]
            })(<Input placeholder='Email' />)}
          </FormItem>

          <FormItem>
            <Button type='primary' htmlType='submit' className='login__button' loading={false}>
                  Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(TopicAdd)
