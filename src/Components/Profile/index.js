import React, { Component } from "react";
// import firebase from "../../Config/firebase";
// import GoogleMap from "../GoogleMap";
// import * as CheckUser from "../../Constants/CheckUser";
import Stepper from "../MaterialUI/Stepper";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // const { user } = this.props;
    console.group("PROFILE")
    console.log("{props}\n", this.props);
    console.groupEnd()
    return (
      <div >
        <h1>Profile.js</h1>
        <Stepper></Stepper>
      </div>
    );
  }
}

export default Home;
