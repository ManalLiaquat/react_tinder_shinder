import React, { Component } from "react";
// import firebase from "../../Config/firebase";
// import CardWrapper from "../UserCard";
import GoogleMap from "../GoogleMap";
import * as CheckUser from "../../Constants/CheckUser";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: CheckUser.User
    };
  }

  render() {
    const { user } = this.state;
    console.log(this.props, "****props home.js");

    return (
      <div >
        <h1>Home.js</h1>
      </div>
    );
  }
}

export default Home;
