import React, { Component } from "react";
import { Typography, Button, Tooltip, AppBar, Tabs, Tab, Avatar, List, ListItemText, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Divider, Modal } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
import moment from "moment";
import Add from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/DoneOutline";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import InboxIcon from '@material-ui/icons/Inbox';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import green from '@material-ui/core/colors/green';
import AddToCalendar from "react-add-to-calendar";
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import SwipeableViews from 'react-swipeable-views';
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";
import StarRatingComponent from 'react-star-rating-component';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  listDisplayName: {
    marginLeft: 10,
    lineHeight: "60px"
  },
  addToCalendar: {
    '&:hover': {
      height: "180px"
    },
    height: '10px',
    transition: "height 0.2s ease-in",
    display: 'block'
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    margin: "0px auto",
    textAlign: "center"
  },
  bigAvatar2: {
    width: 80,
    height: 80,
    display: "inline-block",
    margin: "0px auto"
  },
  avatarContainer: {
    padding: '5px 0px',
    backgroundColor: "lightgreen",
    display: "inline-block",
    borderRadius: '100px',
  },
});

var currentTime = Date.now();
var counter = 0;
function getTime() {
  setInterval(() => {
    currentTime = Date.now();
    counter = counter + 1;
  }, 1000);
}
getTime();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      requests: [],
      tab: 0,
      user: null,
      timePopup: true,
      rate: 0
    };
    this.setMeeting = this.setMeeting.bind(this)
    this.tabChange = this.tabChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.showTimePopup = this.showTimePopup.bind(this)
    this.handlePopupStatus = this.handlePopupStatus.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.location.state ? props.location.state.user : props.user }
  }

  setMeeting() {
    this.props.history.push('/meetings')
  }

  getUserMeetings() {
    let { meetings, user } = this.state
    firebase.database().ref(`/meetings/${user.uid}`).on('value', data => {
      meetings = []
      let meetData = data.val()
      for(var key in meetData){
        meetings.push(meetData[key])
      }
      this.setState({ meetings })
    })
  }

  getUserRequests() {
    let { requests, user } = this.state
    firebase.database().ref(`/requests/${user.uid}`).on('value', data => {
      requests = []
      let reqData = data.val()
      for(var key in reqData){
        requests.push(reqData[key])
      }
      this.setState({ requests })
    })
  }

  tabChange(event, tab) {
    this.setState({ tab })
  }

  handleChangeIndex(tab) {
    this.setState({ tab })
  }

  handlePopupStatus(meetingObj, tempStatus, nodeName) {
    let { user, rate } = this.state
    meetingObj.myProfileObj.tempStatus = tempStatus
    var friendProfileObj = meetingObj.friendProfileObj;
    if(!friendProfileObj.ratings){
      friendProfileObj.ratings = []
      friendProfileObj.ratings.push({[user.uid]: rate})
    } else {
      friendProfileObj.ratings.map((v,i)=>{
        for(let key in v){
          if(key === user.uid){
            friendProfileObj.ratings[i][key] = rate
          } else {
            friendProfileObj.ratings.push({[user.uid]: rate})
          }
        }
      })
    }
    firebase.database().ref(`/user_data/${friendProfileObj.uid}/`).set(friendProfileObj)
    firebase.database().ref(`/${nodeName}/${user.uid}/${meetingObj.friendProfileObj.uid}/`).set(meetingObj)
      .then(() => {
        let newObject = {
          dateAndTime: meetingObj.dateAndTime,
          friendProfileObj: meetingObj.myProfileObj,
          myProfileObj: meetingObj.friendProfileObj,
          placeInfo: meetingObj.placeInfo,
          status: meetingObj.status
        }
        meetingObj.myProfileObj.tempStatus = tempStatus
        firebase.database().ref(`/${nodeName==='meetings'?'requests':'meetings'}/${meetingObj.friendProfileObj.uid}/${user.uid}/`).set(newObject)
        Toast({
          type: "success",
          title: `${nodeName} has been ${tempStatus.toLowerCase()}`
        })
        this.setState({ timePopup: false })
      })
  }

  showTimePopup(item, title) {
    let { timePopup,rate } = this.state
    let { classes } = this.props
    return (
      <Modal open={timePopup}>
        <div className={this.props.classes.paper}>
          <Typography variant="overline" color="error" >Was the meeting successful?</Typography>
          <div className={classes.avatarContainer}>
            <Tooltip title="You" placement="left">
              <Avatar alt="user1" src={item.myProfileObj.images[0]} style={{ left: "10%" }} className={classes.bigAvatar2} />
            </Tooltip>
            <Tooltip title={item.friendProfileObj.displayName} placement="right">
              <Avatar alt="user2" src={item.friendProfileObj.images[0]} style={{ left: "-10%" }} className={classes.bigAvatar2} />
            </Tooltip>
          </div>
          <Typography variant="subtitle1">Venue: {item.placeInfo.name}</Typography>
          <Typography variant="subtitle1">Place: {item.placeInfo.location.address}</Typography>
          <Typography variant="caption">Time/Days: {moment(item.dateAndTime).fromNow()}</Typography>
          <br />
          <Divider />
          <Typography variant="subtitle2">How much will you rate {item.friendProfileObj.displayName}</Typography>
          <StarRatingComponent 
            name="rate user" 
            value={rate}
            onStarClick={(nextValue, prevValue, name)=>{ this.setState({rate: nextValue}) }}
          />
          <Divider />
          <br />
          <Button variant="contained" disabled={rate>0?false:true} color="primary" onClick={() => { this.handlePopupStatus(item, "YES", title) }}>
            <ThumbUpIcon /> YES
          </Button>{' '}
          <Button variant="contained" disabled={rate>0?false:true} color="secondary" onClick={() => { this.handlePopupStatus(item, "NO", title) }}>
            NO <ThumbDownIcon />
          </Button>
        </div>
      </Modal>
    )
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
            Toast({
              type: "success",
              title: `Request has been ${status.toLowerCase()}`
            })
          })
      })
  }


  renderLists(array, showBtn, title) {
    const { classes } = this.props
    return (
      <List style={{ width: "90%", margin: "0px auto 200px auto" }}>
        {
          array.map((item, index) => {
            let event = {
              title: `Meeting with ${item.friendProfileObj.displayName}`,
              description: `I have a meeting with ${item.friendProfileObj.displayName} at ${item.placeInfo.name}, ${item.placeInfo.location.address}`,
              location: `${item.placeInfo.name}, ${item.placeInfo.location.address}, ${item.placeInfo.location.city}, ${item.placeInfo.location.state}, ${item.placeInfo.location.country}.`,
              startTime: moment(item.dateAndTime).format('LLLL'),
              endTime: moment(item.dateAndTime).format('LLLL')
            };
            let status = (item.myProfileObj.tempStatus && item.friendProfileObj.tempStatus)
              ?(item.myProfileObj.tempStatus === item.friendProfileObj.tempStatus) 
                ? (item.myProfileObj.tempStatus === 'YES' && item.friendProfileObj.tempStatus === 'YES')
                  ?'DONE'
                  :"CANCELLED" 
                : 'COMPLICATED'
              : item.status
              
            return (
              <ExpansionPanel key={item.friendProfileObj.uid}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar alt={item.friendProfileObj.nickName} src={item.friendProfileObj.images[0]} className={classes.bigAvatar} />
                  <Typography variant="subtitle2" className={classes.listDisplayName} >{item.friendProfileObj.displayName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ListItemText primary={`NickName: ${item.friendProfileObj.nickName}`} secondary={`Meeting Time: ${moment(item.dateAndTime).format('LLLL')}`} />
                  <hr />
                  <ListItemText primary={`Status: ${status}`} secondary={`Location: ${item.placeInfo.name}, ${item.placeInfo.location.address}`} />
                    {showBtn && <div>
                      <Tooltip title="Cancel" disableFocusListener placement="top">
                        <div>
                          <IconButton disabled={ status !== "PENDING" ? true:false } onClick={() => { this.handleStatus(item, "CANCELLED") }} color="secondary">
                            <CancelIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Tooltip title="Accept" disableFocusListener placement="top">
                        <div>
                          <IconButton disabled={ status !== "PENDING" ? true:false } onClick={() => { this.handleStatus(item, "ACCEPTED") }} style={{ color: status !== 'PENDING' ? 'grey' : green[800] }}>
                            <DoneIcon />
                          </IconButton>
                        </div>
                     </Tooltip>
                  </div>}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <div className={classes.addToCalendar}>
                    <AddToCalendar event={event} buttonLabel="Put on my calendar" />
                  </div>
                  <br /><br />
                </ExpansionPanelActions>
                {((currentTime >= item.dateAndTime) && (!item.myProfileObj.tempStatus && status === "PENDING")) && this.showTimePopup(item, title)}
              </ExpansionPanel>
            )
          })
        }
      </List>
    )
  }
  
  componentDidMount() {
    let { user } = this.state
    this.props.updateUser()
    if (user) {
      this.getUserMeetings()
      this.getUserRequests()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tab !== this.state.tab) {
      this.setState({ timePopup: true })
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { meetings, tab, requests, user } = this.state;
    return (
      <div>
        {user && (
          <div style={{ textAlign: "center" }}>
            <AppBar position='static' color='inherit'>
              <Tabs value={tab} onChange={this.tabChange} indicatorColor="primary" textColor="primary" fullWidth>
                <Tab icon={<LocalBarIcon />} label="Meetings" />
                <Tab icon={<InboxIcon />} label="Requests" />
              </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tab} onChangeIndex={this.handleChangeIndex}>
              {tab === 0 && <div>
                {!meetings.length
                  ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t set any meeting yet!</Typography>
                  : this.renderLists(meetings, false, 'meetings')
                }
              </div>}
              {tab === 1 && <div>
                {!requests.length
                  ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t any meeting request yet!</Typography>
                  : this.renderLists(requests, true, 'requests')
                }
              </div>}
            </SwipeableViews>
            <Button variant="extendedFab" aria-label="Add" color="primary" size="large" className={classes.fab} onClick={this.setMeeting}>
              <Add />
              Set a meeting!
            </Button>
          </div>

        )}
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard));
