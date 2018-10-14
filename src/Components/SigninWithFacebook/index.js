import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";

const login = (props) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // console.log(token);
      Toast({
        type: "success",
        title: "Signed in successfully",
        onClose: () => {
          window.location.pathname = '/';
        }
      });

      // The signed-in user info.
      var user = result.user;
      // console.log(user);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);

      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};

const SigninWithFacebook = () => {
  return (
    <Button variant="outlined" color="inherit" onClick={login}>
      Signin with Facebook
    </Button>
  );
};

export default SigninWithFacebook;
