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
      myOptions: {},
      myProfileObj: null
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

        this.setState({ myLocation, myOptions, myProfileObj: { ...user } })
      }
    })

  }

  componentDidMount() {
    this.getMyLocation()
  }

  render() {
    let { myLocation, myOptions, myProfileObj } = this.state

    return (
      <div>
        {
          myLocation.length && <UserCard myLocation={myLocation} myOptions={myOptions} myProfileObj={myProfileObj} {...this.props} />
        }
      </div>
    );
  }
}

export default Meetings;
