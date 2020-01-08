import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "mobx-react"
import {StateRouter} from "mobx-state-tree-router"

import MuiThemeProviderWrap from "../components/MuiThemeProviderWrap"
import {WeatherStoreBaseStore} from "../models/WeatherStore"
import LocalDataStore from "../models/LocalDataStab"
import {router} from "../models/RouteStore"
import {CssBaseline} from "@material-ui/core"
import Header from "../components/Header"

const App = () => {
  const WeatherStore = WeatherStoreBaseStore.create(
    {
      lookupString: "Tel Aviv",
      lookupId: "215854",
      isMetric: true,
      currentLocation: {id: "-1"},
      theme: "light",
      favorites: JSON.parse(localStorage.getItem("FAVLIST")) || {Items: []},
      locations: [{id: "0", name: "Tel Aviv"}],
      isError: false,
      isOffline: false
    },
    {
      localData: LocalDataStore
    }
  )
  return (
    <React.Fragment>
      <Provider WeatherStore={WeatherStore}>
        <MuiThemeProviderWrap>
          <CssBaseline />
          <Header />
          <StateRouter loading={<div />} router={router} />
        </MuiThemeProviderWrap>
      </Provider>
    </React.Fragment>
  )
}

const rootElement = document.querySelector("#root")
ReactDOM.render(<App />, rootElement)
