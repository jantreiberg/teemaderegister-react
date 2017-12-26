import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import setUrl from '../utils/setUrl'
import { Menu, Dropdown, Form, Input, Layout } from 'antd'

import personalCenter from '../media/personal/personal-center.svg'

const Search = Input.Search
const { Header } = Layout

const { bool, func, object, shape } = PropTypes

const propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired,
    user: object.isRequired
  }).isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    setFieldsInitialValue: func.isRequired
  }).isRequired,
  getSearchCounts: func.isRequired,
  history: object.isRequired,
  logout: func.isRequired,
  search: object.isRequired,
  setSearch: func.isRequired
}

class HeaderWrap extends Component {
  constructor (props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)

    this.defaultSearch = ''
    const { q } = queryString.parse(props.history.location.search)
    if (q) {
      props.setSearch(q)
      this.defaultSearch = q
    }

    this.rolesMap = {
      'admin': 'Admin',
      'curriculum-manager': 'Curriculum manager',
      'head-of-study': 'Head of study',
      'student': 'Student',
      'study-assistant': 'Study assistant',
      'supervisor': 'Supervisor'
    }
  }

  // Disable update on every simple change
  // shouldComponentUpdate(nextProps) {
  //   const authChanged = this.props.auth.user !== nextProps.auth.user
  //   return authChanged
  // }

  componentWillUpdate (nextProps) {
    // remove searchword if removed from props
    if (this.props.search.q && !nextProps.search.q) {
      nextProps.form.setFieldsValue({ searchField: '' })
    }
  }

  componentDidMount () {
    if (this.defaultSearch) {
      this.props.getSearchCounts(this.defaultSearch)
      this.props.form.setFieldsInitialValue({
        searchField: this.defaultSearch
      })
    }
  }

  handleSearch (value) {
    this.props.getSearchCounts(value)
    setUrl(
      this.props.history.replace,
      '/search',
      Object.assign(queryString.parse(this.props.history.location.search), {
        q: value
      })
    )
  }

  dropdownMenu ({ roles, slug, fullName }) {
    return (
      <Menu className='headerWrapDropdownMenu'>
        <Menu.Item className='noHover user-info'>
          <span className='user-name'>{fullName}</span>
          <ul className='user-roles'>
            {roles.map((role, index) => (
              <li key={index} >{this.rolesMap[role]}</li>
            ))}
          </ul>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link className='dashboard-link' to='/admin'>
            <i className='anticon anticon-pie-chart icon--15'></i> Dashboard
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {roles.includes('supervisor') &&
          <Menu.Item>
            <Link to={ '/supervisor/' + slug }>
              <i className="anticon anticon-user icon--15"></i> Profile
            </Link>
          </Menu.Item>}
        <Menu.Item>
          <Link to='/settings/account'>
            <i className="anticon anticon-setting icon--15"></i> Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span className='link' onClick={this.props.logout}>
            <i className="anticon anticon-logout icon--15"></i> Logout
          </span>
        </Menu.Item>
      </Menu>
    )
  }

  render () {
    const {
      auth: { isAuthenticated, user: { roles, slug, fullName } },
      form: { getFieldDecorator }
    } = this.props

    const userImage = { backgroundImage: `url(${personalCenter})` }

    return (
      <Header className='headerWrap'>
        <div className='headerWrap__wrapper'>
          <Link to='/'>
            <div className='logo'>T</div>
          </Link>
          <div className='content'>
            <Form className='search'>
              {getFieldDecorator('searchField')(
                <Search
                  className='search__input'
                  size='large'
                  placeholder='Search by title, author or supervisor'
                  onSearch={this.handleSearch}
                />
              )}
            </Form>
            {isAuthenticated &&
              <div className='navigationWrap'>
                <Dropdown
                  className='userDropdown'
                  placement='bottomRight'
                  trigger={['click']}
                  overlay={this.dropdownMenu({ roles, slug, fullName })}
                >
                  <div className='userDropdown--icon' style={userImage} />
                </Dropdown>
              </div>}
            {!isAuthenticated &&
              <div className='login'>
                <Link to='/login'>Sign in</Link>
              </div>}
          </div>
        </div>
      </Header>
    )
  }
}

HeaderWrap.propTypes = propTypes

export default Form.create()(HeaderWrap)
