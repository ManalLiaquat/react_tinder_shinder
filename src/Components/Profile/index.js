import React from "react";
import { Typography } from "@material-ui/core";
import Stepper from "../MaterialUI/Stepper";

const Profile = (props) => {
  return (
    <div>
      <Typography variant="body1" align="center" >Fill all fields, upload all (3) images, select atleast one from two diffrent questions and turn on location (accept location access).</Typography>
      <Stepper {...props} />
    </div>
  );
}

export default Profile;
