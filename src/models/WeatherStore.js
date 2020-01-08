import {types as t, flow, getEnv} from "mobx-state-tree"
import {WeatherLocationStore} from "./WeatherLocation"
import {FavoritesStore} from "./FavoritesStore"
import {router, views} from "../models/RouteStore"
import {getMyLocation} from "../Services/GeoLocation"
import {
  getLocationByQuery,
  getLocationById,
  getLocationForcastById,
  getLocationByGeoPosition
} from "../Services/Weather"

const responseCheck = res => {
  return res !== "Failed to fetch" && res.code !== "undefined"
}

export const WeatherStoreBaseStore = t
  .model("WeatherStore", {
    isMetric: t.maybe(t.boolean, true),
    currentLocation: t.maybe(WeatherLocationStore),
    lookupString: t.maybe(t.string, ""),
    lookupId: t.maybe(t.string, ""),
    favorites: t.maybe(FavoritesStore),
    theme: t.maybe(t.string),
    isError: t.boolean,
    isOffline: t.maybe(t.boolean)
  })
  .views(self => ({}))
  .actions(self => ({
    updateCurrentLocation: flow(function* updateCurrentLocation(
      currentLocation
    ) {
      const locationById = yield getLocationById(currentLocation?.key)
      const locationForcastById = yield getLocationForcastById(currentLocation.key, self.isMetric)

      if (
        !self.isOffline &&
        (!responseCheck(locationById) || !responseCheck(locationForcastById) || self.isError)
      ) {
        self.isError = true
        router.setView(views.error)
      } else {
        const locationByIdLocal = getEnv(self).localData.getLocationById()
        const locationForcastByIdLocal = getEnv(self).localData.getLocationForcastById()
        const forcast = (self.isOffline ? locationForcastByIdLocal : locationForcastById).DailyForecasts.map(f => f)
        self.currentLocation = WeatherLocationStore.create(
          Object.assign(...(self.isOffline ? locationByIdLocal : locationById), {
            id: currentLocation.key,
            name: currentLocation.name,
            forcast: [...forcast]
          })
        )
        self.lookupString = currentLocation.name
        self.lookupId = currentLocation.key
      }
    }),
    search: flow(function* search(lookup) {
      self.lookupString = lookup
      const location = yield getLocationByQuery(lookup)
      if (!self.isOffline) {
        if (responseCheck(location)) {
          let unique = location.reduce((unique, item) => {
            return unique.some(e => e.LocalizedName === item.LocalizedName) ? unique : [...unique, item]
          },[])
          return unique
        } else {
          self.isError = true
          router.setView(views.error)
        }
      } else {
        return getEnv(self).localData.getLocationByQuery(lookup)
      }
    }),
    toggleMetric: async () => {
      self.isMetric = !self.isMetric
      await self.updateCurrentLocation({
        name: self.lookupString,
        key: self.lookupId
      })
    },
    afterCreate: async () => {
      let geoPosition = null;
      await self.updateCurrentLocation({name: "Tel Aviv", key: "215854"})
      try {
         geoPosition = await getMyLocation()
         if (geoPosition !== null) {
          const position = await getLocationByGeoPosition(geoPosition.latitude, geoPosition.longitude)
          await self.updateCurrentLocation({name: position.LocalizedName, key: position.Key})
        }
      }
      catch (e) {}
    },
    toggleTheme: theme => {
      self.theme = theme
    },
    goOffiine: () => {
      self.isOffline = true
      router.setView(views.search)
    }
  }))
