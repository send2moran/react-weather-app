import { types as t } from "mobx-state-tree";

export const TemperatureUnit = t.model({
  Unit: t.maybe(t.string),
  Value: t.maybe(t.number),
  UnitType: t.maybe(t.number)
});
