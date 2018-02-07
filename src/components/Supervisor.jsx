import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import SupervisorMeta from './SupervisorMeta'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'

const { bool, func, object, shape, string } = PropTypes

const SupervisorObj = {
  count: object.isRequired,
  data: shape({
    _id: string,
    profile: shape({
      firstName: string,
      lastName: string
    })
  }).isRequired,
  loading: bool.isRequired
}

const propTypes = {
  clearTableContent: func.isRequired,
  getSupervisor: func.isRequired,
  getTableContent: func.isRequired,
  history: object.isRequired,
  initSupervisor: func.isRequired,
  initTableContent: func.isRequired,
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  match: shape({
    params: shape({
      slug: string.isRequired
    }).isRequired
  }).isRequired,
  supervisor: shape(SupervisorObj).isRequired,
  tableContent: object.isRequired,
  topics: object.isRequired
}

class Supervisor extends React.Component {
  componentWillReceiveProps (nextProps) {
    // FIX new supervisor slug update view
    const isNewSlug =
      this.props.match.params.slug !== nextProps.match.params.slug

    if (isNewSlug) {
      this.init()
      this.props.getSupervisor(nextProps.match.params.slug)
    }
  }

  componentDidMount () {
    this.props.getSupervisor()
  }

  componentWillUnmount () {
    // Reset all state params
    this.init()
  }

  init () {
    this.props.initSupervisor()
    this.props.initTableContent()
  }

  getCrumbs (name) {
    return [
      { url: null, name: 'Supervisor' },
      { url: this.props.location.pathname, name }
    ]
  }

  render () {
    const {
      clearTableContent,
      getTableContent,
      supervisor,
      supervisor: {
        loading,
        data,
        err,
        hasError,
        data: {
          _id,
          profile
        },
        count
      },
      tableContent,
      topics
    } = this.props

    console.log(err)
    return (
      <div className='supervisor width--public-page'>

        {hasError &&
        <div style={{
          textAlign: 'center',
          marginTop: '25%',
          marginBottom: '25%',
          marginLeft: 'auto',
          marginRight: 'Auto',
          fontFamily: 'Helvetica Neue For Number'
        }}>
          <h1 style={{
            textAlign: 'center',
            fontWeight: 'Bold',
            color: '#5e5e5e'
          }}>
            {err.data.message}
          </h1>
          <h3 style={{
            textAlign: 'center',
            fontWeight: 'Bold',
            color: '#5e5e5e',
            fontFamily: 'Helvetica Neue For Number'
          }}>
              Please check the address or contact the administrator
          </h3>
        </div>
        }

        {!loading && !hasError &&
          <div>
            <Breadcrumbs
              crumbs={this.getCrumbs(`${profile.firstName} ${profile.lastName}`)}
            />
            <SupervisorMeta data={data} count={count} />
            <TableWrap
              clearTableContent={clearTableContent}
              getTableContent={getTableContent}
              history={this.props.history}
              supervisor={supervisor}
              tableContent={tableContent}
              tabs={getTabs({ topics })}
              queryExtend={{ supervisorId: _id }}
            />
          </div>}
      </div>
    )
  }
}

Supervisor.propTypes = propTypes

export default Supervisor
