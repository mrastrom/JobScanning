import _ from 'lodash'
import getJobList from '../api/getJobList'
import processJobList from '../helpers/processJobList'

export const SEARCH_TERM = 'SEARCH_TERM'
export const SEARCH_LOCATION = 'SEARCH_LOCATION'
export const ADS_REQUEST = 'ADS_REQUEST'
export const ADS_SUCCESS = 'ADS_SUCCESS'
export const ADS_FAILURE = 'ADS_FAILURE'

export const searchAds = (term, location) => async dispatch => {
  dispatch({
    type: ADS_REQUEST
  })
  let queryString = `${term} ${location}`
  let { data } = await getJobList(queryString)

  const sources = data.hits.map(item => item.source.site.name)
  const uniqueSources = [...new Set(sources)].length

  const processedList = processJobList(data.hits)

  data = { ...data, uniqueSources, processedList }

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
