import React, { Component } from "react";
import { Button } from "@material-ui/core";
import MyMapComponent from "../GoogleMap";
import firebase from "../../Config/firebase";
// import CardWrapper from "../UserCard";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      coords: { latitude: 24.8830931, longitude: 67.0685517 },
      user: null
    };
    this.updateCoords = this.updateCoords.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.isUser = this.isUser.bind(this);
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(res => {
      this.setState({ coords: res.coords });
    });
  }

  updateCoords(latitude, longitude) {
    this.setState({ coords: { latitude, longitude } });
  }

  signWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // console.log(token);

        // The signed-in user info.
        var user = result.user;
        // console.log(user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  isUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        console.log(user.displayName + " | " + user.email);
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.getPosition();
    this.isUser();
  }

  render() {
    const { coords, user } = this.state;
    return (
      <div className="App">
        {user ? (
          <div>
            <MyMapComponent
              updateCoords={this.updateCoords}
              coords={coords}
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            {/* <CardWrapper /> */}
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={this.signWithFacebook}
          >
            Signin with Facebook
          </Button>
        )}
      </div>
    );
  }
}

export default App;
