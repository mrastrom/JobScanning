import { SEARCH_ADS } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_ADS:
      return action.payload
    default:
      return state
  }
}
