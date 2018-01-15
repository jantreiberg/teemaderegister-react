import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'
import CurriculumMeta from './CurriculumMeta'

const { bool, func, object, shape } = PropTypes

const propTypes = {
  clearTableContent: func.isRequired,
  curriculum: shape({
    meta: object.isRequired,
    loading: bool.isRequired
  }).isRequired,
  getCurriculum: func.isRequired,
  getTableContent: func.isRequired,
  history: object.isRequired,
  initCurriculum: func.isRequired,
  initTableContent: func.isRequired,
  location: object.isRequired,
  match: object.isRequired,
  supervisors: object.isRequired,
  tableContent: object.isRequired,
  topics: object.isRequired
}

class Curriculum extends React.Component {
  componentDidMount () {
    this.props.getCurriculum()
  }

  componentWillUnmount () {
    // Reset all state params
    this.props.initCurriculum()
    this.props.initTableContent()
  }

  getCrumbs (name) {
    return [
      { url: null, name: 'Curriculum' },
      { url: this.props.location.pathname, name }
    ]
  }

  render () {
    const {
      clearTableContent,
      curriculum,
      curriculum: {meta, loading, hasError, error},
      getTableContent,
      supervisors,
      tableContent,
      topics
    } = this.props

    return (
      <div className='curriculum width--public-page'>
        {hasError &&
          <div className='errorMsg'>
            <h1>
              {error.data.message}
            </h1>
            <h3>
              Please choose a curriculum from the <Link to='/'><button>main page</button> </Link> instead.
            </h3>
          </div>
        }

        {!loading && !hasError &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs(meta.names.et)} />
            <CurriculumMeta meta={meta} />
            <TableWrap
              clearTableContent={clearTableContent}
              curriculum={curriculum}
              getTableContent={getTableContent}
              history={this.props.history}
              queryExtend={{ curriculumId: meta._id }}
              tabs={getTabs({ topics, supervisors })}
              tableContent={tableContent}
            />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = propTypes

export default Curriculum
