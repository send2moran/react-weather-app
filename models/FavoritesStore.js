import {
  types as t,
  onSnapshot,
  getSnapshot,
  applySnapshot,
  getParent,
  destroy,
  flow
} from "mobx-state-tree"
import {getLocationById} from "../Services/Weather"
import {Temp} from "./WeatherLocation"

const FavoriteStore = t
  .model({
    id: t.maybe(t.string),
    name: t.maybe(t.string),
    WeatherText: t.maybe(t.string),
    Temperature: t.maybe(Temp)
  })
  .actions(self => ({
    remove: () => {
      getParent(self, 2).removeChild(self)
    },
    update: flow(function* update() {
      const locationById = yield getLocationById(self.id)
      if (locationById !== "Failed to fetch" && locationById.length) {
        applySnapshot(self, {
          ...self,
          WeatherText: locationById[0].WeatherText,
          Temperature: {
            Imperial: {Value: locationById[0].Temperature.Imperial.Value},
            Metric: {Value: locationById[0].Temperature.Metric.Value}
          }
        })
      }
    }),
    afterCreate() {
      self.update()
    }
  }))

export const FavoritesStore = t
  .model({
    Items: t.array(FavoriteStore)
  })
  .views(self => ({
    isInFavorites: id => {
      return self.Items.findIndex(f => f.id === id) > -1
    },
    getFavItem: id => {
      return self.Items.find(f => f.id === id)
    }
  }))
  .actions(self => ({
    add: item => {
      const {id, name, WeatherText, Temperature} = item
      self.Items = self.Items.concat({
        id,
        name,
        WeatherText,
        Temperature: {
          Imperial: {Value: Temperature.Imperial.Value},
          Metric: {Value: Temperature.Metric.Value}
        }
      })
    },
    removeChild: item => {
      destroy(item)
    },
    save: () => {
      localStorage.setItem("FAVLIST", JSON.stringify(getSnapshot(self)))
    },
    afterCreate() {
      onSnapshot(self, self.save)
    }
  }))
