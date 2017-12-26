import ReactGA from 'react-ga'
import { GA_CODE, GA_ENABLED } from 'config'

export const initAnalytics = () => {
  if (!GA_ENABLED) return
  ReactGA.initialize(GA_CODE)
}

module.exports.trackPageView = (obj = {}) => {
  if (!GA_ENABLED) return
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}
