/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"

class Directions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: ""
    }
    this.getDirections = this.getDirections.bind(this)
  }

  getDirections() {
    const { userLocation, placeLocation } = this.props
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(userLocation.latitude, userLocation.longitude),
      destination: new google.maps.LatLng(placeLocation.latitude, placeLocation.longitude),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        this.setState({
          err: "Sorry! Can't calculate directions!"
        })
      }
    });
  }

  componentDidMount(){
    this.getDirections()
  }

  render() {
    const { directions, err } = this.state
    const { userLocation, placeLocation } = this.props

    return (
      <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrrOsrvThKXpEt-1ZoAP9DhpwRs1B5l4E&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          directions={directions}
          userLocation={userLocation}
          placeLocation={placeLocation}
        />
        <br />
        <Typography variant="caption" color="secondary" align="left">{err}</Typography>
      </div>
    )
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.userLocation.latitude, lng: props.userLocation.longitude }}
  >

    <Marker position={{ lat: props.userLocation.latitude, lng: props.userLocation.longitude }} />
    <Marker position={{ lat: props.placeLocation.latitude, lng: props.placeLocation.longitude }} />

    {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))

export default Directions