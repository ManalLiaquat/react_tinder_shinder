import React, { Component } from "react";
// import firebase from "../../Config/firebase";
// import GoogleMap from "../GoogleMap";
// import * as CheckUser from "../../Constants/CheckUser";
import { Typography } from "@material-ui/core";
import Stepper from "../MaterialUI/Stepper";

class Dashboard extends Component {
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
        <Typography variant="h5" align="center" >Fill all fields, upload all (3) images, select atleast one from two diffrent questions and turn on location (accept location access).</Typography>
        <Stepper {...this.props} />
      </div>
    );
  }
}

export default Dashboard;
