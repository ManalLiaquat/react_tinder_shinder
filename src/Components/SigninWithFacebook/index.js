import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";

class SigninWithFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.login = this.login.bind(this)
  }

  login() {
    // console.log(myProps);
    const props = this.props
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // console.log(token);
        // The signed-in user info.
        var user = result.user;
        // console.log(user, "loginbtn");
        Toast({
          type: "success",
          title: "Signed in successfully",
          onClose: () => {
            // props.history.push('/profile')
            // window.location.reload();

            /* UNCOMMENT BELOW LINES AFTER FINSHING THE PROFILE WORK */
            if (user.toJSON().createdAt === user.toJSON().lastLoginAt) {
              props.history.replace('/profile')
              // window.location.reload();
              console.log(props);

            } else {
              props.history.replace('/dashboard')
              // window.location.reload();
              console.log(props);
            }
          }
        });
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
        // var credential = error.credential;
        Toast({
          type: "error",
          title: `Someting went wrong`
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
