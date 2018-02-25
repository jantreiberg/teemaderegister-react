import { removeEmpty } from './Helpers'

export default ({ topics, supervisors, intl }) => {
  const tabs = {
    topics: topics
      ? {
        icon: 'file-text',
        title: intl.formatMessage({ id: 'Topics', defaultMessage: 'Topics1' }),
        sub: 'registered',
        count: topics.count.all,
        subs: {
          registered: {
            title: 'Registered1',
            columnKey: 'registered',
            order: 'descend',
            count: topics.count.registered
          },
          available: {
            title: 'Available111',
            columnKey: 'accepted',
            order: 'descend',
            count: topics.count.available
          },
          defended: {
            title: 'Defended1',
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
        title: 'Supervisors1',
        sub: 'supervised',
        count: supervisors.count.all,
        subs: {
          supervised: {
            title: 'Supervised1',
            columnKey: 'supervisor',
            order: 'ascend',
            count: supervisors.count.supervised
          },
          all: {
            title: 'All1',
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
