import fetchJobs from '../../api/fetchJobs'
import processJobList from '../../utils/processJobList'
import createMarkers from '../../utils/createMarkers'

export const SEARCH_TERM = 'SEARCH_TERM'
export const SEARCH_LOCATION = 'SEARCH_LOCATION'
export const ADS_REQUEST = 'ADS_REQUEST'
export const ADS_SUCCESS = 'ADS_SUCCESS'
export const ADS_FAILURE = 'ADS_FAILURE'
export const ADS_ADD_MORE = 'ADS_ADD_MORE'

export const searchAds = (term, location) => async dispatch => {
  // Dispatch that sets loading state to true
  dispatch({
    type: ADS_REQUEST
  })

  dispatch({
    type: SEARCH_TERM,
    payload: term
  })

  const locationType = location.length > 2 ? 'kommun' : 'lan'
  let { data } = await fetchJobs(term, locationType, location)

  const processedList = processJobList(data.hits)
  const removedUnknownLocations = processedList.filter(item => item.location)

  const markers = await createMarkers(removedUnknownLocations)

  data = { ...data, processedList, markers }

  dispatch({
    type: SEARCH_LOCATION,
    payload: location
  })

  if (data.hits.length > 0) {
    dispatch({
      type: ADS_SUCCESS,
      payload: data
    })
  }

  if (!data.hits.length > 0) {
    dispatch({
      type: ADS_FAILURE
    })
  }
}

export const fetchMoreAds = (term, location, offset) => async dispatch => {
  const locationType = location.length > 2 ? 'kommun' : 'lan'
  let { data } = await fetchJobs(term, locationType, location, offset)

  const processedList = processJobList(data.hits)
  const removedUnknownLocations = processedList.filter(item => item.location)

  const markers = await createMarkers(removedUnknownLocations)

  data = { hits: data.hits, processedList, markers }

  if (data.hits.length > 0) {
    dispatch({
      type: ADS_ADD_MORE,
      payload: data
    })
  }
}
