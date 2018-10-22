import React, { Component } from "react";
import { Grid, Paper, Typography, TextField, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import PlaceIcon from '@material-ui/icons/Place';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import exploreApi from "../../APIs/Explore";
import searchApi from "../../APIs/Search";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendObj: props.location.state.friend,
      myLocation: props.location.state.myLocation,
      searchTerm: '',
      places: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
    this.getNearByPlaces = this.getNearByPlaces.bind(this)
  }

  chooseLocation(placeObj) {
    console.log(placeObj);

  }

  handleSearch() {
    let { myLocation, searchTerm } = this.state
    searchApi(myLocation, searchTerm).then(data => {
      this.setState({ places: data.response.venues })
    });
  }

  getNearByPlaces() {
    let { myLocation, places } = this.state
    places = []
    exploreApi(myLocation).then(data => {
      data.response.groups[0].items.map(place => {
        places.push(place.venue)
      })
      this.setState({ places })
    });
  }

  componentDidMount() {
    this.getNearByPlaces()
  }

  render() {
    const { places } = this.state
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <Grid container spacing={24} direction="row" justify="center" alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Search..."
              id="margin-none"
              fullWidth={true}
              helperText="Search other locations"
              onChange={e => { this.setState({ searchTerm: e.target.value }) }}
            />
          </Grid>
          <Grid xs={2}><Button onClick={this.handleSearch} variant="fab" color="primary"><SearchIcon></SearchIcon></Button></Grid>
        </Grid>
        <br />
        <Grid container spacing={24} direction="row" justify="center" alignItems="center">
          <Typography variant="overline" color="textSecondary" align="center">...Choose Location...</Typography>
          <Grid xs={10}>
            <Paper>
              <Button variant="flat" color="default" onClick={this.getNearByPlaces}>Near By Places</Button>
              <br />
              <List >
                {
                  places.map(place => {
                    return <ListItem key={place.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <PlaceIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={place.name}
                        secondary={`${place.location.address} (${place.location.distance}m)`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Meet here" onClick={() => { this.chooseLocation(place) }}>
                          <AddLocationIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  })
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Location;