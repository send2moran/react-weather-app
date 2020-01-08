import React from "react"
import Moment from "react-moment"
import {observer, inject} from "mobx-react"
import {If, Then, Else} from "react-if"
import {makeStyles} from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Box,
  CardContent,
  IconButton,
  Card,
  Paper
} from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"

import FavoritesBox from "../components/Favorites"
import SearchBox from "../components/SearchBox"

export const Weather = inject("WeatherStore")(
  observer(({WeatherStore}) => {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      paper: {
        textAlign: "center"
      },
      paperBox: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 700
      },
      img: {
        width: 150
      },
      card: {
        textAlign: "center"
      },
      title: {
        fontSize: 17,
        fontWeight: "bold"
      },
      pos: {
        marginBottom: 12
      },
      weatherTopText: {
        textAlign: "left"
      }
    }))
    const classes = useStyles()

    return (
      <React.Fragment>
        <If condition={WeatherStore.currentLocation.id !== "-1"}>
          <Then>
            <Paper className={classes.paperBox}>
              <div className="container">
                <Grid container spacing={2}>
                  <Grid item>
                    <img className={classes.img} alt="" 
                    src={`https://developer.accuweather.com/sites/default/files/${WeatherStore.currentLocation.WeatherIcon?.toLocaleString(
                      "en-US",{minimumIntegerDigits: 2, useGrouping: false} )}-s.png`} />
                  </Grid>
                  <Grid item xs className={classes.weatherTopText}>
                    <Typography variant="h5" component="h5">
                      {WeatherStore.currentLocation.name}
                    </Typography>

                    <If condition={WeatherStore.isMetric}>
                      <Then>
                        {WeatherStore.currentLocation.Temperature?.Metric.Value}
                        {WeatherStore.currentLocation.Temperature?.Metric.Unit}
                      </Then>
                      <Else>
                        {WeatherStore.currentLocation.Temperature?.Imperial.Value}
                        {WeatherStore.currentLocation.Temperature?.Imperial.Unit}
                      </Else>
                    </If>
                  </Grid>
                  <Grid container item xs={2} justify="flex-end" alignItems="flex-start">
                    <Grid item>
                      <If condition={WeatherStore.favorites?.isInFavorites(WeatherStore.currentLocation.id)}>
                        <Then>
                          <IconButton
                            onClick={() => WeatherStore.favorites?.getFavItem(WeatherStore.currentLocation.id).remove()}
                            aria-label="favorite"
                            color="primary">
                            <FavoriteIcon />
                          </IconButton>
                        </Then>
                        <Else>
                          <IconButton onClick={() => WeatherStore.favorites.add(WeatherStore.currentLocation)} aria-label="favorite">
                            <FavoriteIcon />
                          </IconButton>
                        </Else>
                      </If>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.paper} m={4}>
                    <Typography variant="h2" component="h2">
                      {WeatherStore.currentLocation.WeatherText}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Grid container spacing={3}>
                      {WeatherStore.currentLocation.forcast.map(
                        (day, index) => (
                          <Grid item xs key={index}>
                            <Card className={classes.card}>
                              <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  <Moment format="ddd" local>
                                    {day.Date}
                                  </Moment>
                                </Typography>
                                <Typography variant="h5" component="h2" />
                                <Typography className={classes.pos} color="textSecondary">
                                  <Moment format="MM/DD" local>
                                    {day.Date}
                                  </Moment>
                                </Typography>
                                <Typography variant="body2" component="div">
                                  <Box mt={3} mb={2}>
                                    <img
                                      alt=""
                                      src={`https://developer.accuweather.com/sites/default/files/${day.Night.Icon?.toLocaleString(
                                        "en-US", { minimumIntegerDigits: 2, useGrouping: false} )}-s.png`}
                                    />

                                    <span>
                                      {day.Temperature.Minimum.Value}
                                      {day.Temperature.Minimum.Unit}
                                    </span>
                                  </Box>
                                  <Box mt={2}>
                                    <img
                                      alt=""
                                      src={`https://developer.accuweather.com/sites/default/files/${day.Day.Icon?.toLocaleString(
                                        "en-US", { minimumIntegerDigits: 2, useGrouping: false} )}-s.png`}
                                    />
                                    <span>
                                      {day.Temperature.Maximum.Value}
                                      {day.Temperature.Maximum.Unit}
                                    </span>
                                  </Box>
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Then>
          <Else>
            <span className="not-ok" />
          </Else>
        </If>
      </React.Fragment>
    )
  })
)

export const WeatherWrap = inject("WeatherStore")(
  observer(({WeatherStore}) => {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 700
      },
      paperTop: {
        marginTop: "20px"
      },
      searchBox: {
        maxWidth: 500
      },
      errorText: {
        fontSize: "14px",
        weight: "bold",
        color: "red",
        padding: "20px",
        textAlign: "center"
      }
    }))
    const classes = useStyles()
    return (
      <Grid container>
        <Grid item xs={12}>
          <If condition={WeatherStore.isOffline}>
            <Then>
              <div className={classes.errorText}>Offline Mode Active</div>
            </Then>
            <Else />
          </If>
          <Paper className={`${classes.paper} ${classes.paperTop} ${classes.searchBox}`}>
            <SearchBox />
          </Paper>
        </Grid>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>
          <Weather />
        </Grid>
      </Grid>
    )
  })
)

export const WeatherFavorites = inject("WeatherStore")(
  observer(({WeatherStore}) => {
    return (
      <Grid container alignContent="center" justify="center">
        <Box m={5}>
          <FavoritesBox />
        </Box>
      </Grid>
    )
  })
)
