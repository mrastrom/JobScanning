import { ADS_REQUEST, ADS_SUCCESS, ADS_FAILURE, ADS_ADD_MORE } from '../actions'
import _ from 'lodash'

const initialState = {
  searchTerm: '',
  location: '',
  isFetching: false,
  hits: [],
  processedList: [],
  markers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADS_REQUEST:
      return {
        ...state,
        isFetching: true,
        searchTerm: action.term,
        location: action.location
      }
    case ADS_SUCCESS:
      return { ...state, isFetching: false, error: false, ...action.payload }
    case ADS_FAILURE:
      return { ...state, isFetching: false, error: true }
    case ADS_ADD_MORE:
      let markers = _.uniqBy(
        [...state.markers, ...action.payload.markers],
        'id'
      )

      return {
        ...state,
        hits: [...state.hits, ...action.payload.hits],
        processedList: [
          ...state.processedList,
          ...action.payload.processedList
        ],
        markers
      }
    default:
      return state
  }
}
