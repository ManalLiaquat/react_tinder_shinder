import React, { Component } from "react";
// import firebase from "../../Config/firebase";
// import CardWrapper from "../UserCard";
import GoogleMap from "../GoogleMap";
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
        {user ? (
          <div>
            {/* <GoogleMap /> */}
            Uncomment for usage
            {/* <CardWrapper /> */}
          </div>
        ) : (
            <div>user not logged in</div>
          )}
      </div>
    );
  }
}

export default App;
