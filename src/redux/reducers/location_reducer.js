import { SEARCH_LOCATION } from '../actions'

export default (state = '', action) => {
  switch (action.type) {
    case SEARCH_LOCATION:
      return action.payload
    default:
      return state
  }
}
