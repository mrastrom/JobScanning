import getJobList from '../../api/getJobList'
import processJobList from '../../utils/processJobList'
import fetchLocation from '../../api/fetchLocation'

export const SEARCH_TERM = 'SEARCH_TERM'
export const SEARCH_LOCATION = 'SEARCH_LOCATION'
export const ADS_REQUEST = 'ADS_REQUEST'
export const ADS_SUCCESS = 'ADS_SUCCESS'
export const ADS_FAILURE = 'ADS_FAILURE'
export const ADS_ADD_MORE = 'ADS_ADD_MORE'

export const searchAds = (term, location) => async dispatch => {
  // dispatch that sets loading to true
  dispatch({
    type: ADS_REQUEST
  })

  const locationType = location.length > 2 ? 'kommun' : 'lan'
  let { data } = await getJobList(term, locationType, location)
  const allSources = data.hits.map(item => item.source.site.name)
  const uniqueSources = [...new Set(allSources)].length
  const processedList = processJobList(data.hits)

  const removedUnknownLocations = processedList.filter(item => item.location)

  const groupedByLocation = removedUnknownLocations.reduce((acc, obj) => {
    const key = obj.location.translations['sv-SE']
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})

  for (const key in groupedByLocation) {
    const locationInfo = await fetchLocation(key)
    groupedByLocation[key].map(item => {
      item.geocode = locationInfo
      return item
    })
  }

  const markers = [].concat(...Object.values(groupedByLocation))

  data = { ...data, uniqueSources, processedList, markers }

  dispatch({
    type: SEARCH_TERM,
    payload: term
  })

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
  let { data } = await getJobList(term, locationType, location, offset)
  const processedList = processJobList(data.hits)

  const removedUnknownLocations = processedList.filter(item => item.location)

  const groupedByLocation = removedUnknownLocations.reduce((acc, obj) => {
    const key = obj.location.translations['sv-SE']
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})

  for (const key in groupedByLocation) {
    const locationInfo = await fetchLocation(key)
    groupedByLocation[key].map(item => {
      item.geocode = locationInfo
      return item
    })
  }

  const markers = [].concat(...Object.values(groupedByLocation))
  data = { hits: data.hits, processedList, markers }

  if (data.hits.length > 0) {
    dispatch({
      type: ADS_ADD_MORE,
      payload: data
    })
  }
}
