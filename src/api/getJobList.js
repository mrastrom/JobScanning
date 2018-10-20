import axios from 'axios'

export default async queryString => {
  try {
    return await axios({
      method: 'get',
      baseURL: process.env.REACT_APP_DEV_API_URL,
      url: '/sok',
      headers: { 'api-key': process.env.REACT_APP_DEV_API_KEY },
      params: {
        q: queryString,
        offset: 0,
        limit: 10,
        'utan-erfarenhet': false,
        dataset: 'auranest'
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
