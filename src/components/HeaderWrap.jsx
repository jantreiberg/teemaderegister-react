import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { FormattedMessage } from 'react-intl'

import setUrl from '../utils/setUrl'
import { UPLOAD_PATH } from 'config'
import { Menu, Dropdown, Form, Input, Layout } from 'antd'

const Search = Input.Search
const { Header } = Layout

const { arr, bool, func, object, shape, string } = PropTypes

const propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired,
    user: shape({
      profile: shape({
        firstName: string,
        lastName: string,
        slug: string,
        image: shape({
          full: string
        })
      }).isRequired,
      login: shape({
        roles: arr
      }).isRequired,
      updatedAt: string.isRequired
    }).isRequired
  }).isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    setFieldsInitialValue: func.isRequired
  }).isRequired,
  getSearchCounts: func.isRequired,
  history: object.isRequired,
  logout: func.isRequired,
  search: object.isRequired,
  setLanguage: func.isRequired,
  setSearch: func.isRequired
}

class HeaderWrap extends Component {
  constructor (props) {
    super(props)

    this.language = 'en'

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

  changeLanguage (langKey) {
    console.log(this)
    if (langKey === 'en') {
      this.props.setLanguage({
        locale: 'en'
      })
      this.language = langKey
    }
    if (langKey === 'et') {
      this.props.setLanguage({
        locale: 'et'
      })
      this.language = langKey
    }
    console.log(langKey)
  }

  menu () {
    return (
      <Menu>
        <Menu.Item key='en'>
          <a onClick={() => { this.changeLanguage('en') }}><img style={{verticalAlign: 'middle'}} src='/en.png'/> English </a>
        </Menu.Item>
        <Menu.Item key='et'>
          <a onClick={() => { this.changeLanguage('et') }}><img style={{verticalAlign: 'middle'}} src='/et.png'/> Eesti keel </a>
        </Menu.Item>
      </Menu>
    )
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
    const isSupervisor = roles && roles.includes('supervisor')

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
            <i className='anticon anticon-pie-chart icon--15'></i>
            <FormattedMessage
              id='userDashboard'
              defaultMessage='Dashboard' />
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {isSupervisor &&
          <Menu.Item>
            <Link to={ '/supervisor/' + slug }>
              <i className='anticon anticon-user icon--15'></i>
              <FormattedMessage
                id='userProfile'
                defaultMessage='Profile' />
            </Link>
          </Menu.Item>}
        <Menu.Item>
          <Link to='/settings/account'>
            <i className='anticon anticon-setting icon--15'></i>
            <FormattedMessage
              id='userSettings'
              defaultMessage='Settings' />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span className='link' onClick={this.props.logout}>
            <i className='anticon anticon-logout icon--15'></i>
            <FormattedMessage
              id='userLogout'
              defaultMessage='Logout' />
          </span>
        </Menu.Item>
      </Menu>
    )
  }

  render () {
    const {
      auth: {
        isAuthenticated,
        user: {
          profile: { firstName, lastName, slug, image },
          login: { roles },
          updatedAt
        }
      },
      form: { getFieldDecorator }
    } = this.props

    const userImage = image
      ? `url(${UPLOAD_PATH + image.thumb}?updatedAt=${updatedAt})`
      : 'none'

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
            <div className='login'>
              <Dropdown overlay={this.menu()} trigger={['click']}>
                <a className='ant-dropdown-link'>
                  <img style={{verticalAlign: 'middle'}} src={`/${this.language}.png`}/>
                </a>
              </Dropdown>
            </div>
            {isAuthenticated &&
              <div className='navigationWrap'>
                <Dropdown
                  className='userDropdown'
                  placement='bottomRight'
                  trigger={['click']}
                  overlay={this.dropdownMenu({
                    roles,
                    slug,
                    fullName: firstName + ' ' + lastName
                  })}
                >
                  <div className='userDropdown--icon' style={{backgroundImage: userImage}} />
                </Dropdown>
              </div>}
            {!isAuthenticated &&
              <div className='login'>
                <Link to='/login'>
                  <FormattedMessage
                    id='loginDetail'
                    defaultMessage='Sign in' />
                </Link>
              </div>}
          </div>
        </div>
      </Header>
    )
  }
}

HeaderWrap.propTypes = propTypes

export default Form.create()(HeaderWrap)
