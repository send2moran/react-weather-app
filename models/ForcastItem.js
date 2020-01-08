import {types as t} from "mobx-state-tree"
import {Temperature} from "./Temperature"
import {ForcastMetadata} from "./ForcastMetadata"

export const ForcastItem = t.model({
  Day: t.maybe(ForcastMetadata, {}),
  Night: t.maybe(ForcastMetadata, {}),
  Temperature: t.maybe(Temperature, {}),
  Date: t.string,
  EpochDate: t.number,
  Link: t.maybe(t.string, ""),
  MobileLink: t.maybe(t.string, "")
})
