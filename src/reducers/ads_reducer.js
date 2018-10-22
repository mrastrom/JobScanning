import { ADS_REQUEST, ADS_SUCCESS, ADS_FAILURE } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case ADS_REQUEST:
      return { ...state, isFetching: true }
    case ADS_SUCCESS:
      return { isFetching: false, ...action.payload }
    case ADS_FAILURE:
      return { isFetching: false, error: true }
    default:
      return state
  }
}
