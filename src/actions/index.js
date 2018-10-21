import getJobList from '../api/getJobList'

export const SEARCH_TERM = 'SEARCH_TERM'
export const SEARCH_LOCATION = 'SEARCH_LOCATION'
export const SEARCH_ADS = 'SEARCH_ADS'

export const searchAds = (term, location) => async dispatch => {
  let queryString = `${term} ${location}`
  let { data } = await getJobList(queryString)

  let sources = data.hits.map(item => item.source.site.name)
  let uniqueSources = [...new Set(sources)].length
  data = { ...data, uniqueSources }

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
      type: SEARCH_ADS,
      payload: data
    })
  }
}
