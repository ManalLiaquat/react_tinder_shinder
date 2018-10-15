import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
import Arrow from "@material-ui/icons/ArrowForwardIosRounded";

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
    firebase.auth().signOut().then(() => {
      Toast({
        type: "success",
        title: "You are logged out"
      })
      myProps.history.replace('/');
      window.location.reload();
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


export default SignOut;
