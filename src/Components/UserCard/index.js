import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import MUICard from "../MaterialUI/Card";
import firebase from "../../Config/firebase";
import * as CheckUser from "../../Constants/CheckUser";
import geofire from "geofire";
import swal from "sweetalert2";

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
    console.log(msg);
  };

  onSwipeRight(friend) {
    swal({
      title: `Hey ${CheckUser.User.displayName}!`,
      html: `<img src=${friend.images[0]} height="100px" width="100px" />
              <br/>Do you want to meet <i>${friend.displayName}</i>`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.props.history.push('/meetings/location', { friend, myLocation: this.state.myLocation })
      } else {
        this.getAllUsers()
      }
    })
  }

  render() {
    let { allUsers } = this.state

    return (
      <Cards onEnd={this.action("end")} className="root-master">
        {allUsers.map(item => (
          <Card
            onSwipeLeft={() => { this.action("swipe left") }}
            onSwipeRight={() => { this.onSwipeRight(item) }}
          >
            <MUICard images={item.images} nickName={item.nickName} >
              <p>{item.displayName}</p>
            </MUICard>
          </Card>
        ))}
      </Cards>
    );
  }
};

export default UserCard;
