import React, { Component } from "react";
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
    let currentUser = JSON.parse(localStorage.getItem("user"));
    firebase.database().ref('/user_data').on("child_added", data => {
      var user = data.val();
      if (user.uid === currentUser.uid) {
        myLocation.push(Number(user.location.latitude));
        myLocation.push(Number(user.location.longitude));

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
