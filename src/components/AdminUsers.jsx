import React from 'react'
import { PropTypes } from 'prop-types'
const propTypes = {
  type: PropTypes.string
}

const supervisors = [{
  key: '1',
  email: 'john@doe.ee',
  firstName: 'Mike',
  lastName: 'Dude'
}]
/*
const students = [{
  key: '1',
  email: 'john@doe.ee',
  firstName: 'Mike',
  lastName: 'Dude'
}]
*/
const columns = [{
  title: 'firstName',
  dataIndex: 'firstName',
  key: 'firstName'
}, {
  title: 'lastName',
  dataIndex: 'lastName',
  key: 'lastName'
}, {
  title: 'email',
  dataIndex: 'email',
  key: 'email'
}]

const AdminUsers = props => {
  switch (props.type) {
    case 'supervisor':
      return (
        <table supervisors={supervisors} columns={columns} />
      )
    case 'students':
      return (
        <h2>Registered students</h2>
      )
    default:
      return (<h2>Choose something.</h2>
      )
  }
}

AdminUsers.propTypes = propTypes

export default AdminUsers
