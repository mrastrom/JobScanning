import fetchLocation from '../api/fetchLocation'

export default async list => {
  const groupedByLocation = groupByLocation(list)

  let markers = []
  for (const city in groupedByLocation) {
    try {
      const geocode = await fetchLocation(city)
      groupedByLocation[city].forEach(obj => {
        if (geocode) {
          markers = [
            ...markers,
            {
              ...obj,
              geocode
            }
          ]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return markers
}

const groupByLocation = list => {
  const groupedByLocation = list.reduce((acc, obj) => {
    const city = obj.location.translations['sv-SE']
    if (!acc[city]) {
      acc[city] = []
    }
    acc[city].push(obj)
    return acc
  }, {})
  return groupedByLocation
}
