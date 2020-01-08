import React from "react"
import {observer, inject} from "mobx-react"
import {makeStyles} from "@material-ui/core/styles"
import {Typography, Grid, Card,CardContent, Button, Box} from "@material-ui/core"
import {If, Then, Else} from "react-if"
import {router, views} from "../models/RouteStore"

function Favorites({WeatherStore}) {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center"
    },
    alignRight: {
      textAlign: "right"
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
      textAlign: "center",
      minWidth: 100
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 17,
      fontWeight: "bold"
    },
    titleEmoji: {
      textAlign: "center",
      color: "#cccccc"
    },
    pos: {
      marginBottom: 12
    },
    weatherTopText: {
      textAlign: "left"
    },
    cardContent: {
      minWidth: 200
    }
  }))
  const classes = useStyles()

  const navigateToPlace = async item => {
    router.setView(views.search)
    await WeatherStore.updateCurrentLocation({name: item.name, key: item.id})
  }

  return (
    <Grid spacing={3} container justify="center">
      <If condition={WeatherStore.favorites?.Items.length > 0}>
        <Then>
          {WeatherStore.favorites?.Items?.map((item, index) => (
            <Grid item key={index}>
              <Button onClick={() => navigateToPlace(item)} className={classes.card}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      component="div">
                      <Box mb={2}>{item.name}</Box>
                    </Typography>
                    <Typography variant="h4" component="h4">
                      <If condition={WeatherStore.isMetric}>
                        <Then>{item.Temperature.Metric.Value} C</Then>
                        <Else>{item.Temperature.Imperial.Value} F</Else>
                      </If>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" />
                    <Typography variant="h6">{item.WeatherText}</Typography>
                  </CardContent>
                </Card>
              </Button>
            </Grid>
          ))}
        </Then>
        <Else>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              component="div">
              No Favorites
            </Typography>
            <Typography
              className={classes.titleEmoji}
              color="textSecondary"
              gutterBottom
              variant="h4"
              component="h4">
              ☹︎
            </Typography>
          </Grid>
        </Else>
      </If>
    </Grid>
  )
}

export default inject("WeatherStore")(observer(Favorites))
