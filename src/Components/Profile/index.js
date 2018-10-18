import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import Stepper from "../MaterialUI/Stepper";

const Profile = () => {
  return (
    <div>
      <Typography variant="h5" align="center" >Fill all fields, upload all (3) images, select atleast one from two diffrent questions and turn on location (accept location access).</Typography>
      <Stepper {...this.props} />
    </div>
  );
}

export default Profile;
