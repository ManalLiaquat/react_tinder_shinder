import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Wrapper from "../UserCard";
// import { } from "react-c";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  getAllUsers() {
    firebase.database().ref('/user_data').on("child_added", data => {
      let users = data.val();
      console.log(users);
    })
  }

  componentDidMount() {
    this.getAllUsers()
  }

  render() {
    // const { user } = this.props;
    // console.group("MEETINGS")
    // console.log(this.props, "****props");
    // console.groupEnd()

    return (
      <div >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ lineHeight: "100px" }}>Show all users with card-swipe-deck | card-swing</Typography>
          <Wrapper></Wrapper>
        </div>
      </div>
    );
  }
}

export default Meetings;
