import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter, browserHistory, Link } from 'react-router-dom'

import {
  INDEX_PATH,
  LOGIN_PATH,
  CURRICULUM_ADD_PATH,
  CURRICULUM_PATH,
  SEARCH_PATH,
  SUPERVISOR_PATH,
  CONTRIBUTORS_PATH,
  ACCOUNT_FORGOT,
  ACCOUNT_PASSWORD
} from './constants/RouterConstants'

import CurriculumContainer from './containers/CurriculumContainer'
import HeaderWrapContainer from './containers/HeaderWrapContainer'
import HomeContainer from './containers/HomeContainer'
import LoginContainer from './containers/LoginContainer'
import NotFound from './components/NotFound'
import RouteWrapContainer from './containers/RouteWrapContainer'
import SupervisorContainer from './containers/SupervisorContainer'
import SearchContainer from './containers/SearchContainer'
import ContributorsContainer from './containers/ContributorsContainer'
import AccountForgotContainer from './containers/AccountForgotContainer'
import AccountPasswordContainer from './containers/AccountPasswordContainer'
import CurriculumAddContainer from './containers/CurriculumAddContainer'

import store from './store/configureStore'
import { initAnalytics } from './utils/Analytics'

import './fonts' // antd fonts
import './media/favicons' // favicons
import './styles/main.scss' // all css

import { Layout, LocaleProvider, Icon } from 'antd'
import etEE from 'antd/lib/locale-provider/et_EE'

const { Content, Footer } = Layout

const links = {
  project: 'https://github.com/romilrobtsenkov/teemaderegister-react',
  creator: 'https://github.com/romilrobtsenkov',
  license: 'https://opensource.org/licenses/mit-license.html',
  contet: 'https://www.tlu.ee'
}

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
                <Route path={CONTRIBUTORS_PATH}
                  component={RouteWrapContainer(ContributorsContainer)} />
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
            <a href={links.project}><Icon type='github' /> Teemaderegister</a>{' · '}
            Created by <a href={links.creator}>Romil Rõbtšenkov</a><br/>
            Code licensed under <a href={links.license}>MIT License</a>{' | '}
            <Link to='/contributors/'> Contributors</Link><br/>
            Content © 2010-{new Date().getFullYear()} <a href={links.contet}>Tallinn University</a>
          </Footer>
        </Layout>
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
)
