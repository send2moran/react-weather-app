import React from "react"
import {inject} from "mobx-react"
import {makeStyles} from "@material-ui/core/styles"
import {Grid, Button} from "@material-ui/core"

function Error({WeatherStore}) {
  const useStyles = makeStyles(theme => ({
    error: {
      background: "url(https://i.imgur.com/76NZB7A.gif) no-repeat center center fixed",
      backgroundSize: "cover",
      height: "100vh",
      textAlign: "center",
      color: "red",
      width: "100%",
      margin: "0px"
    },
    errorText: {
      fontSize: "2vw",
      weight: "bold",
      color: "black",
      background: "white",
      padding: "20px"
    }
  }))
  const classes = useStyles()

  return (
    <Grid container className={classes.error} alignContent="center" justify="center">
      <Grid item className={classes.errorText}>
        Oops!
        <br />
        ... unable to reach server ...
        <br />
        <Button color="inherit" onClick={() => WeatherStore.goOffiine()}> {'>> Go Offline <<'} </Button>
      </Grid>
    </Grid>
  )
}

export default inject("WeatherStore")(Error)
