import React from "react"
import {observer, inject} from "mobx-react"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import {router, views} from "../models/RouteStore"
import {
  AppBar,
  Typography,
  Tooltip,
  Button,
  Switch,
  Box,
  IconButton,
  Grid,
  Divider,
  ButtonGroup,
  Toolbar
} from "@material-ui/core"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import HomeIcon from "@material-ui/icons/Home"
import FavoriteIcon from "@material-ui/icons/Favorite"

const Header = inject("WeatherStore")(
  observer(({WeatherStore}) => {
    const theme = useTheme()

    const useStyles = makeStyles(theme => ({
      root: {
        width: "fit-content",
        color: theme.palette.text.secondary,
        "& svg": {
          margin: theme.spacing(2)
        },
        "& hr": {
          margin: theme.spacing(0, 0.5)
        }
      },
      title: {
        flexGrow: 1
      },
      sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
          display: "flex"
        }
      },
      sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
          display: "none"
        }
      }
    }))

    const toggleChecked = () => {
      WeatherStore.toggleMetric()
    }

    const setView = (view) => {
      router.setView(view)
    }

    const handleTogglePaletteType = () => {
      theme.palette.type = theme.palette.type === "dark" ? "light" : "dark"
      WeatherStore.toggleTheme(theme.palette.type)
    }
    const classes = useStyles()
    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            <div className={classes.sectionMobile}>Herolo</div>
            <div className={classes.sectionDesktop}>Herolo Weather Task</div>
          </Typography>

          <div className={classes.sectionMobile}>
            <Grid container alignItems="center" className={classes.root}>
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => setView(views.search)}>
                <HomeIcon />
              </Button>
              <Divider orientation="vertical" />
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => setView(views.favorites)}>
                <FavoriteIcon />
              </Button>
            </Grid>
          </div>

          <div className={classes.sectionDesktop}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group">
              <Button onClick={() => setView(views.search)}>Home</Button>
              <Button onClick={() => setView(views.favorites)}>Favorites</Button>
            </ButtonGroup>
          </div>

          <Box ml={3}>
            <span>F</span>
            <Switch
              onChange={toggleChecked}
              defaultChecked
              value="checkedF"
              color="default"
              inputProps={{"aria-label": "checkbox with default color"}}/>
            <span>C</span>
          </Box>

          <Box ml={3}>
            <Tooltip title="Toggle Theme" enterDelay={300}>
              <IconButton
                color="inherit"
                onClick={handleTogglePaletteType}
                aria-label="Toggle Theme"
                data-ga-event-category="AppBar"
                data-ga-event-action="dark">
                {WeatherStore.theme === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    )
  })
)

export default Header
