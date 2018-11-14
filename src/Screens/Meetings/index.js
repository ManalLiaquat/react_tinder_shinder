import React, { Component } from "react";
import firebase from "../../Config/firebase";
import UserCard from "../../Components/UserCard";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: [],
      myOptions: {},
      myProfileObj: null,
      currentUser: null
    };
    this.getMyLocation = this.getMyLocation.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { currentUser: props.user }
  }

  getMyLocation() {
    let { myLocation, myOptions, currentUser } = this.state

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

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
