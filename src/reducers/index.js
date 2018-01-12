import { combineReducers } from 'redux'

import auth from './AuthReducers'
import curriculum from './CurriculumReducers'
import home from './HomeReducers'
import login from './LoginReducers'
import search from './SearchReducer'
import supervisor from './SupervisorReducers'
import tableContent from './TableContentReducers'
import password from './PasswordReducers'
import settings from './SettingsReducer'
import page from './PageReducers'

const rootReducer = combineReducers({
  auth,
  curriculum,
  home,
  login,
  password,
  search,
  supervisor,
  tableContent,
  settings,
  page
})

export default rootReducer
