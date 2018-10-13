import React, { Component } from "react";
// import firebase from "../../Config/firebase";

// import { Button } from "@material-ui/core";
// import CardWrapper from "../UserCard";
import GoogleMap from "../GoogleMap";
import SigninWithFacebook from "../SigninWithFacebook";

import CheckUser from "../../Constants/CheckUser";
import User from "../../Constants/GetUser";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    CheckUser();
    this.setState({ user: User });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {user ? (
          <div>
            <GoogleMap />
            {/* <CardWrapper /> */}
          </div>
        ) : (
          <SigninWithFacebook />
        )}
      </div>
    );
  }
}

export default App;
