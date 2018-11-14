import React, { Component } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import firebase from "../../Config/firebase"
import swal from "sweetalert2";
import Toast from "../../Constants/Toast";
import $ from "jquery";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class DateAndTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingData: props.location.state,
      dateTime: new Date(),
      user: null
    }
    this.sendRequest = this.sendRequest.bind(this)
    this.prompt = this.prompt.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.user }
  }

  sendRequest() {
    const { meetingData, dateTime } = this.state
    if (meetingData && dateTime) {
      meetingData.dateAndTime = dateTime.getTime()
      meetingData.status = "PENDING"

      firebase.database().ref(`/meetings/${meetingData.myProfileObj.uid}/${meetingData.friendProfileObj.uid}/`).set(meetingData)
        .then(() => {

          let meetingData2 = {
            dateAndTime: meetingData.dateAndTime,
            status: meetingData.status,
            placeInfo: meetingData.placeInfo,
            myProfileObj: meetingData.friendProfileObj,
            friendProfileObj: meetingData.myProfileObj
          }
          firebase.database().ref(`/requests/${meetingData.friendProfileObj.uid}/${meetingData.myProfileObj.uid}/`).set(meetingData2)

          firebase.database().ref("fcmTokens").once("value", function (snapshot) {
            // console.log(snapshot);
            snapshot.forEach(function (token) {
              if (token.val() === meetingData.friendProfileObj.uid) { //Getting the token of the reciever using  if condition..!   
                console.log(token.key)
                $.ajax({
                  type: 'POST', url: "https://fcm.googleapis.com/fcm/send",
                  headers: { Authorization: 'key=AIzaSyBrrOsrvThKXpEt-1ZoAP9DhpwRs1B5l4E' },
                  contentType: 'application/json',
                  dataType: 'json',
                  data: JSON.stringify({
                    "to": token.key, "notification": {
                      "title": `New Request From ${meetingData.myProfileObj.nickName}`,
                      "body": "You have a new meeting request",
                      "icon": "https://firebasestorage.googleapis.com/v0/b/tinder-shinder-2.appspot.com/o/Notifications.png?alt=media&token=b4c86061-9644-4faa-a316-6461be0fe421", //Photo of sender
                      "click_action": `https://tinder-shinder-2.firebaseapp.com/dashboard`,
                      "myObject": JSON.stringify(meetingData2)
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
    } else {
      Toast({ type: "error", title: "Please select date and time" })
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
    let { user } = this.state;
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
                autoSubmit={true}
                autoOk={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(DateAndTime);