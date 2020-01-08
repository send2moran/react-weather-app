import {types as t} from "mobx-state-tree"
import {ForcastItem} from "./ForcastItem"
import {TemperatureUnit} from "./TemperatureUnit"

export const Temp = t.model({
  Imperial: t.maybe(TemperatureUnit, {}),
  Metric: t.maybe(TemperatureUnit, {})
})

export const WeatherLocationStore = t
  .model({
    id: t.identifier,
    name: t.maybe(t.string, ""),
    Temperature: t.maybe(Temp, {}),
    conditions: t.maybe(t.string, ""),
    WeatherText: t.maybe(t.string, ""),
    WeatherIcon: t.maybe(t.number, ""),
    forcast: t.array(ForcastItem),
    MobileLink: t.maybe(t.string, ""),
    Link: t.maybe(t.string, "")
  })
  .views(self => ({}))
  .actions(self => ({}))
