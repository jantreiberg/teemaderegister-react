import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'

import {
  INDEX_PATH,
  LOGIN_PATH,
  CURRICULUM_ADD_PATH,
  CURRICULUM_PATH,
  SEARCH_PATH,
  SUPERVISOR_PATH,
  USER_SETTINGS_PATH,
  ACCOUNT_FORGOT,
  ACCOUNT_PASSWORD,
  CHANGE_PASSWORD_PATH
} from './constants/RouterConstants'

import CurriculumContainer from './containers/CurriculumContainer'
import HeaderWrapContainer from './containers/HeaderWrapContainer'
import HomeContainer from './containers/HomeContainer'
import LoginContainer from './containers/LoginContainer'
import NotFound from './components/NotFound'
import RouteWrapContainer from './containers/RouteWrapContainer'
import SupervisorContainer from './containers/SupervisorContainer'
import SearchContainer from './containers/SearchContainer'
import AccountForgotContainer from './containers/AccountForgotContainer'
import AccountPasswordContainer from './containers/AccountPasswordContainer'
import UserSettingsContainer from './containers/UserSettingsContainer'
import ChangePasswordContainer from './containers/ChangePasswordContainer'
import CurriculumAddContainer from './containers/CurriculumAddContainer'

import store from './store/configureStore'
import { initAnalytics } from './utils/Analytics'

import './fonts' // antd fonts
import './media/favicons' // favicons
import './styles/main.scss' // all css

import { Layout, LocaleProvider } from 'antd'
import etEE from 'antd/lib/locale-provider/et_EE'

const { Content, Footer } = Layout

initAnalytics()

render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <LocaleProvider locale={etEE}>
        <Layout className='layout'>
          <Route component={HeaderWrapContainer} />
          <Content>
            <div className='layout__content'>
              <Switch>
                <Route exact path={INDEX_PATH}
                  component={RouteWrapContainer(HomeContainer)} />
                <Route exact path={LOGIN_PATH}
                  component={RouteWrapContainer(LoginContainer)} />
                <Route path={SEARCH_PATH}
                  component={RouteWrapContainer(SearchContainer)} />
                <Route path={CURRICULUM_ADD_PATH}
                  component={RouteWrapContainer(CurriculumAddContainer, { restrict: true })} />
                <Route path={CURRICULUM_PATH}
                  component={RouteWrapContainer(CurriculumContainer)} />
                <Route path={SUPERVISOR_PATH}
                  component={RouteWrapContainer(SupervisorContainer)} />
                <Route path={USER_SETTINGS_PATH}
                  component={RouteWrapContainer(UserSettingsContainer, {restrict: true})} />
                <Route path={CHANGE_PASSWORD_PATH}
                  component={RouteWrapContainer(ChangePasswordContainer, {restrict: true})} />
                <Route path={ACCOUNT_FORGOT}
                  component={RouteWrapContainer(AccountForgotContainer)} />
                <Route path={ACCOUNT_PASSWORD}
                  component={RouteWrapContainer(AccountPasswordContainer)} />
                <Route
                  component={RouteWrapContainer(NotFound)} />
              </Switch>
            </div>
          </Content>
          <Footer className='layout__footer'>
            TLU ©{new Date().getFullYear()} | Made by Romil Rõbtšenkov
          </Footer>
        </Layout>
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
)
