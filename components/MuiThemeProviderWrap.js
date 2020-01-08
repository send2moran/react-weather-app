import React from "react"
import {ThemeProvider} from "@material-ui/styles"
import {observer, inject} from "mobx-react"
import {createMuiTheme} from "@material-ui/core/styles"

export default inject("WeatherStore")(
  observer(function MuiThemeProvider(props) {

    const theme = React.useMemo(() => {
      return createMuiTheme({
        palette: {
          type: props.WeatherStore.theme === "dark" ? "dark" : "light",
          primary: {
            main: props.WeatherStore.theme === "dark" ? "#000000" : "#81d4fa"
          }
        }
      })
    }, [props.WeatherStore.theme])

    return <ThemeProvider theme={theme} children={props.children} />
  })
)
