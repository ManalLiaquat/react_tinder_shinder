import React, { Component } from "react";
// import firebase from "../../Config/firebase";

// import { Button } from "@material-ui/core";
// import CardWrapper from "../UserCard";
import GoogleMap from "../GoogleMap";
import SigninWithFacebook from "../SigninWithFacebook";
import AppBar from "../MaterialUI/AppBar";

import * as CheckUser from "../../Constants/CheckUser";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    CheckUser.isUser()
    this.setState({ user: CheckUser.User });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <AppBar user={user}>
          {user ? (
            <div>
              {/* <GoogleMap /> */}
              Uncomment for usage
            {/* <CardWrapper /> */}
            </div>
          ) : (
              <SigninWithFacebook />
            )}
        </AppBar>
      </div>
    );
  }
}

export default App;
