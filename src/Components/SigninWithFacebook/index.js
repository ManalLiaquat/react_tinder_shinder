import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";

class SigninWithFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myProps: props
    }
    this.login = this.login.bind(this)
  }

  login() {
    const { myProps } = this.state
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // console.log(token);
        var user = result.user;
        Toast({
          type: "success",
          title: "Signed in successfully",
          onClose: () => {
            myProps.history.replace('/profile')
            // if (user.createdAt === user.lastLoginAt) {
            //   myProps.history.replace('/profile')
            // } else {
            //   myProps.history.replace('/Home')
            // }
          }
        });

        // The signed-in user info.
        // console.log(user, "loginbtn");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Toast({
          type: "error",
          title: `Error! ${errorCode}: ${errorMessage}`
        });

        // The email of the user's account used.
        var email = error.email;
        Toast({
          type: "warning",
          title: `Warning: ${email}`
        });
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        Toast({
          type: "error",
          title: `Credentials Error: ${credential}`
        });
        // ...
      });
  };

  render() {
    return (
      <Button variant="outlined" color="inherit" onClick={this.login}>
        Signin with Facebook
      </Button>
    );
  }
};

export default SigninWithFacebook;
