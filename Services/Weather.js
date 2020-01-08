const API_KEY = "6uKBWRdw6Akkm62DTQip4pQHNYWH0IkZ"
const API_HOST = "https://dataservice.accuweather.com/"
const API_VERSION = "v1"

const WeatherUrl = key =>
  `${API_HOST}forecasts/${API_VERSION}/daily/1day/${key}?apikey=${API_KEY}`

const WeatherCitiesUrl = q =>
  `${API_HOST}locations/${API_VERSION}/cities/autocomplete?apikey=${API_KEY}&q=${q}`

const WeatherConditionsByIdUrl = locationId =>
  `${API_HOST}currentconditions/${API_VERSION}/${locationId}?apikey=${API_KEY}`

const WeatherConditionsByGeoPositionUrl = (latitude, longitude) =>
  `${API_HOST}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C${longitude}`

const WeatherLocationForcastUrl = (locationId, displayMetric = true) =>
  `${API_HOST}forecasts/${API_VERSION}/daily/5day/${locationId}?apikey=${API_KEY}&metric=${displayMetric}`

export async function getWeather(key) {
  try {
    const res = await fetch(WeatherUrl(key))
    return res.json()
  } catch (e) {
    return e.message
  }
}
export async function getLocationByQuery(q) {
  try {
    const res = await fetch(WeatherCitiesUrl(q))
    return res.json()
  } catch (e) {
    return e.message
  }
}
export async function getLocationByGeoPosition(latitude, longitude) {
  try {
    const res = await fetch(
      WeatherConditionsByGeoPositionUrl(latitude, longitude)
    )
    return res.json()
  } catch (e) {
    return e.message
  }
}
export async function getLocationById(locationId) {
  try {
    const res = await fetch(WeatherConditionsByIdUrl(locationId))
    return res.json()
  } catch (e) {
    return e.message
  }
}
export async function getLocationForcastById(locationId, isMetric) {
  try {
    const res = await fetch(WeatherLocationForcastUrl(locationId, isMetric))
    return res.json()
  } catch (e) {
    return e.message
  }
}
