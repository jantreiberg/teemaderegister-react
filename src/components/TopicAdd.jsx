import React from 'react'
// import PropTypes from 'prop-types'
import Api from '../utils/api'

// import Breadcrumbs from './Breadcrumbs'
// import TableWrap from '../components/TableWrap'
// import getTabs from '../utils/getTabs'
import { Form, Input, Button, Select, AutoComplete } from 'antd'

const Option = Select.Option
const FormItem = Form.Item

// const th = (props)

class TopicAdd extends React.Component {
  constructor (props) {
    super(props)
    // const data = ['Tere', 'tetris', 'erts']
    this.state = {
      curriculums: [],
      topics: [],
      supervisors: [],
      topicDisablement: true
    }
    this.handleCurriculumChange = this.handleCurriculumChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
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
    Api('GET', 'api/supervisors?all=true', {})
      .then(results => {
        // console.log(results)
        const { supervisors } = results
        this.setState({
          supervisors
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleCurriculumChange (value) {
    console.log(value)
    Api('GET', 'api/topics?curriculumId=' + value + '&tab=topics&sub=defended&order=ascend&all=true', {})
      .then(results => {
        console.log(results)
        const { topics } = results
        const topicIds = results.topics.map(topic => { return topic._id })
        const topicNames = results.topics.map(topic => { return topic.title })
        this.setState({
          topics,
          topicIds,
          topicNames
        })
      })
      .catch(error => {
        console.error(error)
      })
    if (!value) {
      const topicDisablement = true
      this.setState({topicDisablement})
    } else {
      const topicDisablement = false
      this.setState({ topicDisablement })
    }
  }

  handleTopicChange (value) {
    if (value) {
      console.log(value)
      console.log(this.state.topics)
      if (this.state.topicNames.indexOf(value) === -1 && this.state.topicIds.indexOf(value) === -1) {
        this.props.form.setFields({
          topicInEstonian: {value: null},
          topicInEnglish: {value: null},
          mainSupervisor: {value: null}
        })
        console.log('Uus teema')
      } else {
        console.log(value)
        console.log(this.props.form.setFields)
        console.log(this.state.topics[this.state.topicIds.indexOf(value)])
        if (this.state.topicNames.indexOf(value) === -1) {
          this.props.form.setFields({
            topicInEstonian: {
              value: this.state.topics[this.state.topicIds.indexOf(value)].title
            },
            topicInEnglish: {
              value: this.state.topics[this.state.topicIds.indexOf(value)].titleEng
            }
          })
          for (let i = 0; i < this.state.topics[this.state.topicIds.indexOf(value)].supervisors.length; i++) {
            // console.log(this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor)
            if (this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].type === 'Main') {
              // console.log(this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor)
              this.props.form.setFields({
                mainSupervisor: {
                  value: (this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor.profile.firstName + ' ' + this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor.profile.lastName)
                }
              })
            }/*  else if (this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].type === 'Co') {
              this.props.form.setFields({
                coSupervisors: {
                  value: this.props.form.getFieldValue('coSupervisor') + (this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor.profile.firstName + ' ' + this.state.topics[this.state.topicIds.indexOf(value)].supervisors[i].supervisor.profile.lastName)
                }
              })
            } */
          }
        } else {
          this.props.form.setFields({
            topicInEstonian: {
              value: this.state.topics[this.state.topicNames.indexOf(value)].title
            },
            topicInEnglish: {
              value: this.state.topics[this.state.topicNames.indexOf(value)].titleEng
            }
          })
          for (let i = 0; i < this.state.topics[this.state.topicNames.indexOf(value)].supervisors.length; i++) {
            if (this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].type === 'Main') {
              console.log(this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].supervisor)
              this.props.form.setFields({
                mainSupervisor: {
                  value: (this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].supervisor.profile.firstName + ' ' + this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].supervisor.profile.lastName)
                }
              })
            }/*  else if (this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].type === 'Co') {
              this.props.form.setFields({
                coSupervisors: {
                  value: this.props.form.getFieldValue('coSupervisor') + ',' + (this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].supervisor.profile.firstName + ' ' + this.state.topics[this.state.topicNames.indexOf(value)].supervisors[i].supervisor.profile.lastName)
                }
              })
            } */
          }
        }
        /*
        this.form.setFields({
          topicInEstonian: {
            value: this.state.topics.title,
            errors: [new Error('forbid ha')]
          }
        })
          topicInEnglish: {
            value: this.state.topics.titleEng,
            errors: [new Error('forbid ha')]
          }
        })
        */
      }
    }
  }

  render () {
    const curriculumsByType = (this.state.curriculums)
    const supervisors = (this.state.supervisors)
    const topics = (this.state.topics)
    let topicDisablement = (this.state.topicDisablement)
    // console.log(this.state.supervisors)

    const CurriculumOptions = curriculumsByType.map(
      types => {
        let options = types.collection.map(curriculum => {
          return (
            <Select.Option value={curriculum._id} key={curriculum._id}>{curriculum.names['et']} {types.type}</Select.Option>
          )
        })
        return options
      }
    )

    const SupervisorOptions = supervisors.map(
      supervisor => {
        return (
          <Select.Option value={supervisor._id} key={supervisor._id}>{supervisor.supervisor}</Select.Option>
        )
      }
    )
    // console.log(SupervisorOptions)

    const {
      form: { getFieldDecorator },
      location: { search }
    } = this.props

    return (
      <div className='topicadd'>
        <h1>Lõputöö teema registreerimise vorm</h1>

        <Form onSubmit={this.submit}>

          <FormItem label="Nimi" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Insert your name!' }]
            })(<Input placeholder='Name'/>)}
          </FormItem>

          <FormItem label="Õppekava" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('curriculum', {
              rules: [{ required: true, message: 'Choose curriculum!' }]
            })(
              <Select placeholder="Choose curriculum" onChange={this.handleCurriculumChange}>
                {CurriculumOptions}
              </Select>
            )}
          </FormItem>

          <FormItem label="Teema" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('topic', {
              rules: [{ required: true, message: 'Choose topic!' }]
            })(
              <AutoComplete placeholder="Choose topic" disabled={topicDisablement} onChange={this.handleTopicChange} dataSource={topics.map(topic => <Option key={topic._id} label={topic.title}>{topic.title}</Option>)} filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />
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

          <FormItem label="Juhendaja" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('mainSupervisor', {
              rules: [{ required: true, message: 'Insert a main supervisor for chosen topic!' }]
            })(
              <Select placeholder='Supervisor'>
                {SupervisorOptions}
              </Select>
            )}
          </FormItem>

          <FormItem label="Kaasjuhendajad" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('coSupervisors', {
              rules: [{ required: false, message: 'Insert cosupervisors for chosen topic!', type: 'array' }]
            })(
              <Select mode='multiple' placeholder='Cosupervisors'>
                {SupervisorOptions}
              </Select>
            )}
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
