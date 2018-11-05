import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import MUICard from "../MaterialUI/Card";
import firebase from "../../Config/firebase";
import geofire from "geofire";
import swal from "sweetalert2";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      myLocation: props.myLocation,
      myOptions: props.myOptions,
      myProfileObj: props.myProfileObj,
      currentUser: JSON.parse(localStorage.getItem("user"))
    }
    this.onSwipeRight = this.onSwipeRight.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  action = msg => {
    console.log(msg);
  };

  onSwipeRight(friendProfileObj) {
    let { myLocation, myProfileObj, currentUser } = this.state
    swal({
      html: `<img src=${friendProfileObj.images[0]} style="border-radius:100px; border:thick solid lightgreen; box-shadow:0px 0px 50px grey" height="100px" width="100px" />
      <br/><h3>Hey ${currentUser.displayName}!</h3><p>Do you want to meet <b>${friendProfileObj.displayName}</b></p>`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.props.history.push('/meetings/location', { friendProfileObj, myLocation, myProfileObj })
      } else {
        // this.getAllUsers()
        this.props.history.push('/meetings')
      }
    })
  }

  getAllUsers() {
    let { allUsers, myLocation, myOptions, currentUser } = this.state
    this.setState({ allUsers: [] })
    firebase.database().ref('/user_data').on("child_added", data => {
      let user = data.val();

      if (user.uid !== currentUser.uid) {
        let userLocation = [Number(user.location.latitude), Number(user.location.longitude)];
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

  removeCard(index) {
    let { allUsers } = this.state
    allUsers.splice(index, 1)
    this.setState({ allUsers })
  }

  componentDidMount() {
    this.getAllUsers()
  }

  render() {
    let { allUsers } = this.state

    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "8%" }}>
        <Cards onEnd={this.action("end")} className="root-master" /* cardSize={[500, 500]} size={[500, 500]} */>
          {allUsers.map((item, index) => (
            <Card
              onSwipeLeft={() => { this.removeCard(index) }}
              onSwipeRight={() => { this.onSwipeRight(item) }}
            >
              <MUICard item={item} index={index} onSwipeRight={this.onSwipeRight} removeCard={this.removeCard} >
                <p>{item.displayName}</p>
              </MUICard>
            </Card>
          ))}
        </Cards>
      </div>
    );
  }
};

export default UserCard;
