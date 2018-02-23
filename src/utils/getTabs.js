import { removeEmpty } from './Helpers'
import { FormattedMessage } from 'react-intl'
import React from 'react'

/* onst translate = (string) =>
  <FormattedMessage id= {string} defaultMessage= {string} /> */

const title = <FormattedMessage id='tabsTitleRegistered' defaultMessage='Registered1' />

export default ({ topics, supervisors }) => {
  const tabs = {
    topics: topics
      ? {
        icon: 'file-text',
        title: 'Topics1',
        sub: 'registered',
        count: topics.count.all,
        subs: {
          registered: {
            title,
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
