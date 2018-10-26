import React, { Component } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import firebase from "../../Config/firebase"
import * as CheckUser from "../../Constants/CheckUser";
import swal from "sweetalert2";
import $ from "jquery";

class DateAndTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingData: props.location.state,
      dateTime: ''
    }
    this.sendRequest = this.sendRequest.bind(this)
    this.prompt = this.prompt.bind(this)
  }

  sendRequest() {
    const { meetingData, dateTime } = this.state
    if (meetingData && dateTime) {
      meetingData.dateAndTime = dateTime.getTime()
      meetingData.isRequestAccepted = false

      firebase.database().ref(`/meetings/${meetingData.myProfileObj.uid}/${meetingData.friendProfileObj.uid}/`).set(meetingData)
        .then(() => {

          firebase.database().ref("fcmTokens").once("value", function (snapshot) {
            // console.log(snapshot);
            snapshot.forEach(function (token) {
              if (token.val() === meetingData.friendProfileObj.uid) { //Getting the token of the reciever using  if condition..!   
                console.log(token.key)
                $.ajax({
                  type: 'POST', url: "https://fcm.googleapis.com/fcm/send",
                  headers: { Authorization: 'key=AIzaSyAjIIjPScGE9DOhslt3VSt57hj4GpZvCXc' },
                  contentType: 'application/json',
                  dataType: 'json',
                  data: JSON.stringify({
                    "to": token.key, "notification": {
                      "title": `New Request From ${meetingData.myProfileObj.nickName}`,
                      "body": "You have a new meeting request",
                      "icon": "https://firebasestorage.googleapis.com/v0/b/tinder-shinder.appspot.com/o/Notifications.png?alt=media&token=76541c3b-4909-4d63-90d5-1fc00ff5fff4", //Photo of sender
                      "click_action": `https://tinder-shinder.firebaseapp.com/dashboard`
                    }
                  }),
                  success: function (response) {
                    console.log(response);
                    //Functions to run when notification is succesfully sent to reciever
                  },
                  error: function (xhr, status, error) {
                    //Functions To Run When There was an error While Sending Notification
                    console.log(xhr.error);
                  }
                });
              }
            });
          });
        })
    }
  }

  prompt() {
    const { meetingData: { friendProfileObj } } = this.state
    swal({
      text: `Do you want to send request to ${friendProfileObj.displayName}?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.sendRequest();
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/meetings')
      }
    })
  }

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        {
          user && <Paper style={{ minHeight: "550px" }}>
            <Typography variant="overline" color="textSecondary">...Date and Time...</Typography>
            <br />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDateTimePicker
                invalidLabel="Select data and time"
                value={this.state.dateTime}
                disablePast={true}
                onChange={(dateTime) => { this.setState({ dateTime: dateTime._d }) }}
              />
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <Button variant="raised" color="primary" onClick={this.prompt}>Send Request</Button>
            <br />
          </Paper>
        }
      </div>
    )
  }
}

export default DateAndTime;