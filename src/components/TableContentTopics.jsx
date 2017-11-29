import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { message, Badge, Tooltip, Icon } from 'antd'

export default params => {
  const columns = getColumnNames(params)
  return columns.map(c => {
    return definedColumns[c](params)
  })
}

const typesMap = {
  SE: 'Seminaritöö',
  BA: 'Bakalaureusetöö',
  MA: 'Magistritöö',
  PHD: 'Doktoritöö'
}

const accepted = ({ columnKey, order }) => ({
  title: 'Added',
  className: 'text-align--right',
  dataIndex: 'accepted',
  key: 'accepted',
  render: renderDate,
  sorter: true,
  sortOrder: columnKey === 'accepted' && order
})

const author = ({ columnKey, order }) => ({
  title: 'Author',
  dataIndex: 'author',
  key: 'author',
  sortOrder: columnKey === 'author' && order,
  sorter: true,
  render: author => {
    if (!author) return '-'
    return author.firstName + ' ' + author.lastName
  }
})

const curriculums = ({ curriculums }) => ({
  className: 'text-align--center',
  filters: [{ text: 'Sobib teistele õppekavadele', value: 'others' }],
  filterMultiple: false,
  title: (
    <Tooltip placement='top' title={'Sobib teistele õppekavadele'}>
      {'ÕK'}
    </Tooltip>
  ),
  dataIndex: 'curriculums',
  key: 'curriculums',
  filteredValue: curriculums || null,
  render: curriculums => {
    let content = null
    if (curriculums.length > 1) {
      content = <Badge
        className='no-status-margin'
        status='default'
      />
    }
    return content
  }
})

const defended = ({ columnKey, order }) => ({
  title: 'Defended',
  className: 'text-align--right',
  dataIndex: 'defended',
  key: 'defended',
  render: renderDate,
  sorter: true,
  sortOrder: columnKey === 'defended' && order
})

const detailCurriculums = () => ({
  className: 'text-align--left',
  dataIndex: 'curriculums',
  key: 'curriculums',
  title: 'Curriculum',
  render: curriculums => {
    if (curriculums.length === 0) return null
    return curriculums.map((c, i) => {
      const url = '/curriculum/' + c.slugs.et
      const abbr = c.abbreviation
      const content =
        i < curriculums.length - 1 && curriculums.length > 1
          ? abbr + ', '
          : abbr

      return (
        <Tooltip
          key={c._id}
          placement='topLeft'
          title={c.names.et + ' ' + c.type}
        >
          <Link className='link-curriculum' to={url}>
            {content}
          </Link>
        </Tooltip>
      )
    })
  }
})

const detailTypes = () => ({
  className: 'text-align--left',
  dataIndex: 'types',
  key: 'types',
  title: 'Types',
  render: types => {
    if (types.length === 0) return null
    return types.map((t, i) => {
      const content = i < types.length - 1 && types.length > 1 ? t + ', ' : t

      return (
        <Tooltip key={t} placement='topLeft' title={typesMap[t]}>
          {content}
        </Tooltip>
      )
    })
  }
})

const file = ({ columnKey, order }) => ({
  title: '',
  className: 'text-align--right',
  dataIndex: 'file',
  key: 'file',
  sortOrder: columnKey === 'file' && order,
  render: file => {
    let content = (
      <span>
        <a className='link--pdf' href={file} target='_blank'>
          <Icon type='file-pdf' className='icon-15' />
        </a>
      </span>
    )
    return content
  }
})

const registered = ({ columnKey, order }) => ({
  title: 'Registered',
  dataIndex: 'registered',
  key: 'registered',
  className: 'text-align--right',
  render: renderDate,
  sorter: true,
  sortOrder: columnKey === 'registered' && order
})

const supervisors = () => ({
  title: 'Supervisor(s)',
  dataIndex: 'supervisors',
  key: 'supervisors',
  render: arr => {
    return arr.map((o, i) => {
      const { _id, profile } = o.supervisor
      const linkContent =
        i < arr.length - 1 && arr.length > 1
          ? profile.firstName + ' ' + profile.lastName + ', '
          : profile.firstName + ' ' + profile.lastName

      const url = '/supervisor/' + profile.slug

      return (
        <Link key={_id} to={url}>
          {linkContent}
        </Link>
      )
    })
  }
})

const title = ({ columnKey, order }) => ({
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
  sorter: true,
  sortOrder: columnKey === 'title' && order,
  render: (title, row) => {
    const url = window.location.host + '/search?q=' + row.slug + '&sub=' + columnKey
    const content = (
      <span>
        {title}
        <CopyToClipboard text={url} onCopy={() => message.success('Link copied to clipboard')}>
          <Tooltip title='Copy link to clipboard'>
            <Icon className='link--copy' type="share-alt" />
          </Tooltip>
        </CopyToClipboard>
      </span>
    )
    return content
  }
})

const types = ({ columnKey, order, sub, types }) => ({
  className: 'text-align--center',
  filterMultiple: false,
  filters: [
    {
      text: sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö',
      value: 'SE'
    }
  ],
  sorter: true,
  sortOrder: columnKey === 'types' && order,
  title: (
    <Tooltip
      placement='top'
      title={sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö'}
    >
      {'SE'}
    </Tooltip>
  ),
  dataIndex: 'types',
  key: 'types',
  filteredValue: types || null,
  render: types => {
    let content = null
    if (types.indexOf('SE') !== -1) {
      content = <Badge
        className='no-status-margin'
        status='default'
      />
    }
    return content
  }
})

const renderDate = date => moment(date).format('DD.MM.YY')

const getColumnNames = ({ sub, names, type, supervisor }) => {
  let columns = ['title'] // default

  const isInformaticsBa = names && names.et === 'Informaatika' && type === 'BA'
  const isSupervisorPage = !!supervisor

  if (sub === 'registered') {
    if (isSupervisorPage) {
      columns.push('detailTypes')
      columns.push('detailCurriculums')
    }
    if (isInformaticsBa) columns.push('types')

    columns.push('author', 'supervisors', 'registered')
  }

  if (sub === 'available') {
    if (isSupervisorPage) {
      columns.push('detailTypes')
      columns.push('detailCurriculums')
    } else {
      columns.push('curriculums')
    }
    if (isInformaticsBa) columns.push('types')

    columns.push('supervisors', 'accepted')
  }

  if (sub === 'defended') {
    if (isSupervisorPage) columns.push('detailTypes')
    columns.push('detailCurriculums')
    if (isInformaticsBa) columns.push('types')

    columns.push('author', 'supervisors', 'defended', 'file')
  }

  return columns
}

const definedColumns = {
  accepted,
  author,
  curriculums,
  defended,
  detailCurriculums,
  detailTypes,
  file,
  registered,
  supervisors,
  title,
  types
}
