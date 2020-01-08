import { types as t } from "mobx-state-tree";

export const ForcastMetadata = t.model({
  Icon: t.maybe(t.number),
  IconPhrase: t.maybe(t.string),
  HasPrecipitation: t.maybe(t.boolean),
  PrecipitationType: t.maybe(t.string),
  PrecipitationIntensity: t.maybe(t.string)
});
