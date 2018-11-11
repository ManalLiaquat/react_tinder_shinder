import React, { Component } from 'react';
import AppBar from '../MaterialUI/AppBar';
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
import { withStyles } from '@material-ui/core/styles';
import { Modal, Avatar, Typography, Button, IconButton } from "@material-ui/core";
import { green, indigo } from '@material-ui/core/colors/';
import CloseIcon from "@material-ui/icons/Close";
import Directions from "../Directions";
import moment from 'moment';
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    margin: "0px auto"
  },
  bigAvatar: {
    width: 130,
    height: 130,
    display: "inline-block",
    margin: "0px auto"
  },
  avatarContainer: {
    padding: '15px 0px',
    backgroundColor: "lightgreen",
    display: "inline-block",
    borderRadius: '100px',
  },
  green: {
    color: green[400]
  },
  customBtn: {
    width: '280px',
    margin: 5
  },
  textColor: {
    color: indigo[400]
  }
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      notificationObj: null,
      isDirections: true,
      placeLocation: {},
      user: null
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.showNotification = this.showNotification.bind(this)
    this.showDirections = this.showDirections.bind(this)
  }

  static getDerivedStateFromProps(props) {
    console.log('IsUser_REDUX ==>', props.user ? "YES" : "NO");
    return { user: props.user }
  }

  showNotification() {
    firebase.messaging().onMessage(payload => {
      for (const key in payload.data) {
        // console.log("object", JSON.parse(payload.data[key]));
        this.setState({ notificationObj: JSON.parse(payload.data[key]) })
      }
      this.handleOpen()
    })
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  showDirections(placeInfo) {
    let { placeLocation } = this.state
    placeLocation.latitude = placeInfo.location.lat
    placeLocation.longitude = placeInfo.location.lng
    this.setState({ placeLocation, isDirections: true })
  }

  handleStatus(meetingObj, status) {
    let { user } = this.state
    meetingObj.status = status
    firebase.database().ref(`/requests/${user.uid}/${meetingObj.friendProfileObj.uid}/`).set(meetingObj)
      .then(() => {
        let newObject = {
          dateAndTime: meetingObj.dateAndTime,
          friendProfileObj: meetingObj.myProfileObj,
          myProfileObj: meetingObj.friendProfileObj,
          placeInfo: meetingObj.placeInfo,
          status: meetingObj.status
        }
        firebase.database().ref(`/meetings/${meetingObj.friendProfileObj.uid}/${user.uid}/`).set(newObject)
          .then(() => {
            this.handleClose()
            Toast({
              type: "success",
              title: `Request has been ${status.toLowerCase()}`
            })
          })
      })
  }

  componentDidMount() {
    this.showNotification()
  }

  render() {
    const { classes } = this.props
    const { open, notificationObj, isDirections, placeLocation } = this.state
    notificationObj && console.log(notificationObj);

    return (
      <div>
        <AppBar {...this.props} />
        {/* Notification Modal */}
        <Modal
          aria-labelledby="Notification"
          aria-describedby="Notification popup"
          open={open}
          onClose={this.handleClose}
        >
          {
            notificationObj && (
              <div className={classes.paper}>
                <center>
                  <div className={classes.avatarContainer}>
                    <Avatar alt="user1" src={notificationObj.myProfileObj.images[0]} style={{ left: "10%" }} className={classes.bigAvatar} />
                    <Avatar alt="user2" src={notificationObj.friendProfileObj.images[0]} style={{ left: "-10%" }} className={classes.bigAvatar} />
                  </div>
                  <Typography component='p' variant="headline"><span className={classes.green}>{notificationObj.friendProfileObj.nickName}</span> wants to meet <span className={classes.green}>You</span></Typography>
                  <Typography component='p' variant="body1"><span className={classes.textColor}>Duration:</span> {notificationObj.friendProfileObj.time.map(item => <span>{item}, </span>)}</Typography>
                  <Typography component='p' variant="body1"><span className={classes.textColor}>Date:</span> {moment(notificationObj.dateAndTime).format('LLLL')}</Typography>
                  <Typography component='p' variant="body1"><span className={classes.textColor}>Location:</span> {notificationObj.placeInfo.name}, {notificationObj.placeInfo.location.address}</Typography>
                  <Typography component='p' variant="subheading"><span className={classes.textColor}>Drinks:</span> {notificationObj.friendProfileObj.beverages.map(item => <span>{item}, </span>)}</Typography>
                  <Button variant="extendedFab" className={classes.customBtn} onClick={() => { this.handleStatus(notificationObj, "ACCEPTED") }} style={{ backgroundColor: green[400], color: "white" }}>Confirm</Button>
                  <br />
                  <Button variant="extendedFab" className={classes.customBtn} onClick={() => { this.showDirections(notificationObj.placeInfo) }} color="primary">Directions</Button>
                  <br />
                  <Button variant="extendedFab" className={classes.customBtn} onClick={() => { this.handleStatus(notificationObj, "CANCELLED") }} color="secondary">Cancel</Button>
                </center>
              </div>
            )
          }
        </Modal>
        {
          notificationObj && placeLocation.latitude && (
            <Modal aria-labelledby="Notification"
              aria-describedby="Notification popup"
              open={isDirections}
              onClose={() => { this.setState({ isDirections: false }) }}
            >
              <div className={classes.paper} style={{ minHeight: "300px" }}>
                <IconButton style={{ float: 'right' }} color="secondary" onClick={() => { this.setState({ isDirections: false }) }}><CloseIcon /></IconButton>
                <br />
                <br />
                <br />
                <Directions placeLocation={placeLocation} userLocation={notificationObj.myProfileObj.location} />
              </div>

            </Modal>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log("state from component", state);
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  // console.log("dispatch from component", dispatch);
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));