import { combineReducers } from 'redux'
import term from './term_reducer'
import location from './location_reducer'
import ads from './ads_reducer'

const rootReducer = combineReducers({
  term,
  location,
  ads
})

export default rootReducer
