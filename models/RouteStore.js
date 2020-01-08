import React from "react"
import {RouterStore, View, startRouter} from "mobx-state-tree-router"
import {WeatherWrap, WeatherFavorites} from "../components/Weather"
import Error from "../components/Error.js"

export const views = {
  search: View.create({
    name: "search",
    path: "/",
    component: <WeatherWrap />
  }),
  favorites: View.create({
    name: "favorites",
    path: "/favorites",
    component: <WeatherFavorites />
  }),
  error: View.create({
    name: "error",
    path: "/error",
    component: <Error />
  })
}

export const router = RouterStore.create({
  views: views
})

startRouter(router)
