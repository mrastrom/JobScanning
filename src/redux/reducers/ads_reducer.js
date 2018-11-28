import { ADS_REQUEST, ADS_SUCCESS, ADS_FAILURE, ADS_ADD_MORE } from '../actions'

const initialState = {
  isFetching: false,
  hits: [],
  processedList: [],
  markers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADS_REQUEST:
      return { ...state, isFetching: true }
    case ADS_SUCCESS:
      return { ...state, isFetching: false, error: false, ...action.payload }
    case ADS_FAILURE:
      return { ...state, isFetching: false, error: true }
    case ADS_ADD_MORE:
      return {
        ...state,
        ...{
          hits: [...state.hits, ...action.payload.hits],
          processedList: [
            ...state.processedList,
            ...action.payload.processedList
          ],
          markers: [...state.markers, ...action.payload.markers]
        }
      }
    default:
      return state
  }
}
