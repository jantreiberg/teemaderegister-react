import { combineReducers } from 'redux'

import auth from './AuthReducers'
import curriculum from './CurriculumReducers'
import home from './HomeReducers'
import login from './LoginReducers'
import search from './SearchReducer'
import supervisor from './SupervisorReducers'
import tableContent from './TableContentReducers'
import contributors from './ContributorsReducers'

const rootReducer = combineReducers({
  auth,
  curriculum,
  home,
  login,
  search,
  supervisor,
  tableContent,
  contributors
})

export default rootReducer
