import React from "react"
import {observer, inject} from "mobx-react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {TextField, CircularProgress} from "@material-ui/core"
import {useDebounce} from "../utils/useDebounce"

function SearchBox({WeatherStore}) {
  const [searchTerm, setSearchTerm] = React.useState("Tel Aviv")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [helperTextDisplay, seHelperTextDisplay] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [valid, setValid] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0
  const regex = /^[a-zA-Z$@$!%*?&#^-_. +]+$/

  React.useEffect(() => {
    const isValid = regex.test(searchTerm)
    setError(!isValid)
    seHelperTextDisplay(!isValid)
    setValid(isValid)
  }, [searchTerm])

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      if (!debouncedSearchTerm || !valid) {
        return
      }
      const response = await WeatherStore.search(debouncedSearchTerm)
      if (active && response) {
        setOptions(
          Object.keys(response).map(item => {
            return {
              name: response[item].LocalizedName,
              key: response[item].Key
            }
          })
        )
      }
    })()

    return () => {
      active = false
    }
  }, [debouncedSearchTerm])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <div>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(e, v) => {
          if (v) {
            WeatherStore.updateCurrentLocation(v)
          }
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={option => option.name}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            error={error}
            helperText={ helperTextDisplay ? "Search supports english letters only :)." : ""}
            {...params}
            onChange={e => setSearchTerm(e.target.value)}
            label="Search"
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (<CircularProgress color="inherit" size={20} />) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </div>
  )
}

export default inject("WeatherStore")(observer(SearchBox))
