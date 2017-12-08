import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import setUrl from '../utils/setUrl'
import { Form, Input, Layout, Button } from 'antd'

const Search = Input.Search
const { Header } = Layout

const { bool, func, object, shape } = PropTypes

const propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired
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

  render () {
    const {
      auth: {user, isAuthenticated },
      form: { getFieldDecorator }
    } = this.props

    return (
      <Header className='headerWrap'>
        <div className='headerWrap__wrapper'>
          <Link to='/'>
            <div className='logo'>Te</div>
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
            {!isAuthenticated &&
              <div className='login'>
                <Link to='/login'>Sign in</Link>
              </div>}
            {isAuthenticated &&
            <div className='login'>
              <Button onClick={this.props.logout} ghost icon='logout' title='logout' />
            </div>}
            {(isAuthenticated && user.roles.indexOf("admin") != -1) &&
            <div className='login addCurriculum'>
              <Link to='/add_curriculum'><Button ghost icon='plus-circle-o' title='Add curriculum'></Button></Link>
            </div>}
          </div>
        </div>
      </Header>
    )
  }
}

HeaderWrap.propTypes = propTypes

export default Form.create()(HeaderWrap)
