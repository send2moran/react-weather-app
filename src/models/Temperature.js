import { types as t } from "mobx-state-tree";
import { TemperatureUnit } from "./TemperatureUnit";

export const Temperature = t.model({
  Minimum: t.maybe(TemperatureUnit, {}),
  Maximum: t.maybe(TemperatureUnit, {})
});
