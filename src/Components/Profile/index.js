import React, { Component } from "react";
// import firebase from "../../Config/firebase";
import GoogleMap from "../GoogleMap";
import * as CheckUser from "../../Constants/CheckUser";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { user } = this.props;
    console.log(this.props, "****props profile.js");

    return (
      <div >
        <h1>Profile.js</h1>
      </div>
    );
  }
}

export default Home;
