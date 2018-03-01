import { removeEmpty } from './Helpers'

export default ({ topics, supervisors, intl }) => {
  const tabs = {
    topics: topics
      ? {
        icon: 'file-text',
        title: intl.formatMessage({ id: 'Topics', defaultMessage: 'Topics' }),
        sub: 'registered',
        count: topics.count.all,
        subs: {
          registered: {
            title: intl.formatMessage({ id: 'Registered', defaultMessage: 'Registered' }),
            columnKey: 'registered',
            order: 'descend',
            count: topics.count.registered
          },
          available: {
            title: intl.formatMessage({ id: 'Available', defaultMessage: 'Available' }),
            columnKey: 'accepted',
            order: 'descend',
            count: topics.count.available
          },
          defended: {
            title: intl.formatMessage({ id: 'Defended', defaultMessage: 'Defended' }),
            columnKey: 'defended',
            order: 'descend',
            count: topics.count.defended
          }
        }
      }
      : null,
    supervisors: supervisors
      ? {
        icon: 'user',
        title: intl.formatMessage({ id: 'Supervisors', defaultMessage: 'Supervisor(s)' }),
        sub: 'supervised',
        count: supervisors.count.all,
        subs: {
          supervised: {
            title: intl.formatMessage({ id: 'Supervised', defaultMessage: 'Supervised' }),
            columnKey: 'supervisor',
            order: 'ascend',
            count: supervisors.count.supervised
          },
          all: {
            title: intl.formatMessage({ id: 'All', defaultMessage: 'All' }),
            columnKey: 'supervisor',
            order: 'ascend',
            count: supervisors.count.all
          }
        }
      }
      : null
  }

  return removeEmpty(tabs)
}
