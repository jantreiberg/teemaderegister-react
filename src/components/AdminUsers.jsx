import React from 'react'
import { PropTypes } from 'prop-types'
import { Table } from 'antd'
import Api from '../utils/Api'
import debounce from 'lodash.debounce'
import { SUPERVISORS_URL } from '../constants/ApiConstants'

const propTypes = {
  type: PropTypes.string
}

class AdminUsers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      supList: [],
      gotSupervisors: false
    }
    this.supervisors = this.state.supList
    this.getSupervisors = debounce(this.getSupervisors.bind(this), 500)
  }

  getSupervisors () {
    if (this.state.gotSupervisors === true) return
    // this.setState(() => {
    Api('GET', SUPERVISORS_URL)
      .then(body => {
        const supList = body.supervisors.map(user => ({
          email: user.slug,
          key: user._id,
          firstName: user.supervisor,
          lastName: 'test',
          value: user._id
        }))
        this.setState({ supList, gotSupervisors: true })
      })
  }
  render () {
    this.getSupervisors()
    const columns = [{
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName'
    }, {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName'
    }, {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email'
    }]

    const students = []

    switch (this.props.type) {
      case 'supervisor':
        return (
          <div>
            <h2>Supervisors</h2>
            <Table dataSource={this.state.supList} columns={columns}/>
          </div>
        )
      case 'students':
        return (
          <div>
            <h2>Registered students</h2>
            <Table dataSource={students} columns={columns}/>
          </div>
        )
      default:
        return (<h2>Choose something.</h2>
        )
    }
  }
}

AdminUsers.propTypes = propTypes

export default AdminUsers
