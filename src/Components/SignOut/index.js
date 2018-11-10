import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
import Arrow from "@material-ui/icons/ArrowForwardIosRounded";
import { removeUser } from "../../Config/Redux/Actions/authActions";
import { connect } from "react-redux";

class SignOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myProps: props
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    const { myProps } = this.state
    myProps.removeUser();
    firebase.auth().signOut().then(() => {
      localStorage.setItem("user", null)
      Toast({
        type: "success",
        title: "You are logged out"
      })
      myProps.history.replace('/');
    }).catch((err) => {
      Toast({
        type: "error",
        title: `Error: ${err}`
      })
    })
  }

  render() {
    return (
      <Button variant="outlined" color="inherit" onClick={this.logout}>
        SignOut <Arrow />
      </Button>
    );
  }
}

const mapStateToProps = state => { // to connect the global state with component
  // console.log("state from component", state);
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => { // to connect the actions with component props | call the reducer to update store
  // console.log("dispatch from component", dispatch);
  return {
    removeUser: () => dispatch(removeUser())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
