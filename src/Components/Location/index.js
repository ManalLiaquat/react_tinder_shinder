import React, { Component } from "react";
import { Grid, Paper, Typography, TextField, Button, Tooltip, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton, Modal } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import PlaceIcon from '@material-ui/icons/Place';
import ForwardIcon from '@material-ui/icons/ArrowRight';
import DirectionsIcon from '@material-ui/icons/Directions';
import Directions from "../Directions";

import exploreApi from "../../APIs/Explore";
import searchApi from "../../APIs/Search";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendProfileObj: props.location.state.friendProfileObj,
      myLocation: props.location.state.myLocation,
      myProfileObj: props.location.state.myProfileObj,
      searchTerm: '',
      places: []
    }
    this.getNearByPlaces = this.getNearByPlaces.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  chooseLocation(placeObj) {
    const { friendProfileObj, myProfileObj } = this.state
    let placeInfo = {
      name: placeObj.name,
      location: placeObj.location,
      id: placeObj.id
    }
    this.props.history.push('/meetings/dateandtime', { myProfileObj, friendProfileObj, placeInfo })
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
        return places.push(place.venue)
      })
      this.setState({ places })
    });
  }

  showDirections(placeObj) {
    this.setState({
      placeLocation: {
        latitude: placeObj.location.lat, longitude: placeObj.location.lng
      },
      open: true
    })
  }
  closeModal() {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.getNearByPlaces()
  }

  render() {
    const { places, placeLocation, myProfileObj } = this.state
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
          <Grid xs={10}>
            <Typography variant="overline" color="textSecondary" align="center">...Choose Location...</Typography>
            <Paper>
              <Button variant="text" color="default" onClick={this.getNearByPlaces}>Near By Places</Button>
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
                        <Tooltip title="Show Directions" placement="top">
                          <IconButton aria-label="Show directions" onClick={() => { this.showDirections(place) }}>
                            <DirectionsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Choose Location" placement="top">
                          <IconButton aria-label="Meet here" onClick={() => { this.chooseLocation(place) }}>
                            <ForwardIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  })
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.closeModal}
        >
          <div style={{ padding: "10px", left: '50%', top: "50%", backgroundColor: "white", width: "90%", margin: "0px auto" }}>
            <Directions placeLocation={placeLocation} userLocation={myProfileObj.location} />
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </Modal>
      </div >
    )
  }
}

export default Location;