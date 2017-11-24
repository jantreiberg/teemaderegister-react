import { removeEmpty } from './helpers'

export default ({ topics, supervisors }) => {
  const tabs = {
    topics: topics
      ? {
        icon: 'file-text',
        title: 'Topics',
        sub: 'registered',
        count: topics.count.all,
        subs: {
          registered: {
            title: 'Registered',
            columnKey: 'registered',
            order: 'descend',
            count: topics.count.registered
          },
          available: {
            title: 'Available',
            columnKey: 'accepted',
            order: 'descend',
            count: topics.count.available
          },
          defended: {
            title: 'Defended',
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
        title: 'Supervisors',
        sub: 'supervised',
        count: supervisors.count.all,
        subs: {
          supervised: {
            title: 'Supervised',
            columnKey: 'supervisor',
            order: 'ascend',
            count: supervisors.count.supervised
          },
          all: {
            title: 'All',
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
