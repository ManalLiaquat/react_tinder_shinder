import React from 'react';
import AppBar from '../MaterialUI/AppBar';
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
// let user = JSON.parse(localStorage.getItem('user'))
firebase.messaging().onMessage(payload => {
  // console.log(payload);

  for (const key in payload.data) {
    console.log("object", JSON.parse(payload.data[key]));
  }

  Toast({
    type: "info",
    title: payload.notification.title,
    timer: 5000,
    allowOutsideClick: false
  })
})

const App = (props) => {
  return (
    <span>
      <AppBar {...props} />
    </span>
  )
}

export default App;