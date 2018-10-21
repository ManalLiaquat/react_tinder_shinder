import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import MUICard from "../MaterialUI/Card";
import firebase from "../../Config/firebase";
import * as CheckUser from "../../Constants/CheckUser";
import geofire from "geofire";

import img1 from "../../Images/img1.jpg";
import img2 from "../../Images/img2.jpg";
import img3 from "../../Images/img3.jpg";


const images = [img1, img2, img3];

const data = ["user one obj", " user two obj", "user three obj"];

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      myLocation: props.myLocation,
      myOptions: props.myOptions
    }
  }

  getAllUsers() {
    let { allUsers, myLocation, myOptions } = this.state

    firebase.database().ref('/user_data').on("child_added", data => {
      let user = data.val();

      if (user.uid !== CheckUser.User.uid) {
        let userLocation = [user.location.latitude, user.location.longitude];
        let distance = geofire.distance(myLocation, userLocation).toFixed(3);

        let compareBeverages = myOptions.beverages.some(value => user.beverages.includes(value))
        let compareTime = myOptions.time.some(value => user.time.includes(value))

        if (distance <= 5 && compareBeverages && compareTime) {
          allUsers.push(user)
          this.setState({ allUsers })
        }
      }
    })

  }

  componentDidMount() {
    this.getAllUsers()
  }

  action = msg => {
    // console.log(msg);
  };

  render() {
    let { allUsers } = this.state
    // console.log(allUsers);

    return (
      <Cards onEnd={this.action("end")} className="root-master">
        {allUsers.map(item => (
          <Card
            onSwipeLeft={() => { this.action("swipe left") }}
            onSwipeRight={() => { this.action("swipe right") }}
          >
            <MUICard images={item.images} nickName={item.nickName}>
              <p>{item.displayName}</p>
            </MUICard>
          </Card>
        ))}
      </Cards>
    );
  }
};

export default UserCard;
