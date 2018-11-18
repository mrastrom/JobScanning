import { ADS_REQUEST, ADS_SUCCESS, ADS_FAILURE, ADS_ADD_MORE } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case ADS_REQUEST:
      return { ...state, isFetching: true }
    case ADS_SUCCESS:
      return { isFetching: false, ...action.payload }
    case ADS_FAILURE:
      return { isFetching: false, error: true }
    case ADS_ADD_MORE:
      return {
        ...state,
        ...{
          hits: [...state.hits, ...action.payload.hits],
          processedList: [
            ...state.processedList,
            ...action.payload.processedList
          ]
        }
      }
    default:
      return state
  }
}
