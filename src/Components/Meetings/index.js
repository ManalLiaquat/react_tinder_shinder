import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import * as CheckUser from "../../Constants/CheckUser";
import firebase from "../../Config/firebase";
import UserCard from "../UserCard";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: [],
      myOptions: {}
    };
    this.getMyLocation = this.getMyLocation.bind(this)
  }

  getMyLocation() {
    let { myLocation, myOptions } = this.state
    firebase.database().ref('/user_data').on("child_added", data => {
      var user = data.val();
      if (user.uid === CheckUser.User.uid) {
        myLocation.push(user.location.latitude);
        myLocation.push(user.location.longitude);

        myOptions.beverages = user.beverages;
        myOptions.time = user.time;

        this.setState({ myLocation, myOptions })
      }
    })

  }

  componentDidMount() {
    this.getMyLocation()
  }

  render() {
    // const { user } = this.props;
    // console.group("MEETINGS")
    // console.log(this.props, "****props");
    // console.groupEnd()
    let { myLocation, myOptions } = this.state

    return (
      < div >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ lineHeight: "100px" }}>Show all users with card-swipe-deck | card-swing</Typography>
        </div>
        {
          myLocation.length && <UserCard myLocation={myLocation} myOptions={myOptions} />
        }

      </div >
    );
  }
}

export default Meetings;
