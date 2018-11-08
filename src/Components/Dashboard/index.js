import React, { Component } from "react";
import { Typography, Button, Tooltip, AppBar, Tabs, Tab, Avatar, List, ListItemText, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as CheckUser from "../../Constants/CheckUser";
import firebase from "../../Config/firebase";
import Toast from "../../Constants/Toast";
import moment from "moment";
import Add from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/DoneOutline";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import AddToCalendar from "react-add-to-calendar";
import 'react-add-to-calendar/dist/react-add-to-calendar.css'

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
  }
});

// var user = JSON.parse(localStorage.getItem('user'))


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      requests: [],
      tab: 0,
      user: JSON.parse(localStorage.getItem('user'))
    };
    this.setMeeting = this.setMeeting.bind(this)
    this.tabChange = this.tabChange.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.location.state ? props.location.state.user : JSON.parse(localStorage.getItem('user')) }
  }

  setMeeting() {
    this.props.history.push('/meetings')
  }

  getUserMeetings() {
    let { meetings, user } = this.state
    firebase.database().ref(`/meetings/${user.uid}`).on('child_added', data => {
      let meetData = data.val()
      meetings.push(meetData)
      this.setState({ meetings })
    })
  }

  getUserRequests() {
    let { requests, user } = this.state
    firebase.database().ref(`/requests/${user.uid}`).on('child_added', data => {
      let reqData = data.val()
      requests.push(reqData)
      this.setState({ requests })
    })
  }

  tabChange(event, tab) {
    this.setState({ tab })
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


  renderLists(array, showBtn) {
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
            return (
              <ExpansionPanel key={item.friendProfileObj.uid}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar alt={item.friendProfileObj.nickName} src={item.friendProfileObj.images[0]} className={classes.bigAvatar} />
                  <Typography variant="title" className={classes.listDisplayName} >{item.friendProfileObj.displayName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ListItemText primary={`NickName: ${item.friendProfileObj.nickName}`} secondary={`Meeting Time: ${moment(item.dateAndTime).format('LLLL')}`} />
                  <ListItemText primary={`Status: ${item.status}`} secondary={`Location: ${item.placeInfo.name}, ${item.placeInfo.location.address}`} />
                  {showBtn && <div>
                    <Tooltip title="Cancel" disableFocusListener placement="top">
                      <IconButton disabled={item.status !== 'PENDING' ? true : false} onClick={() => { this.handleStatus(item, "CANCELLED") }} color="secondary">
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Accept" disableFocusListener placement="top">
                      <IconButton disabled={item.status !== 'PENDING' ? true : false} onClick={() => { this.handleStatus(item, "ACCEPTED") }} style={{ color: item.status !== 'PENDING' ? 'grey' : green[800] }}>
                        <DoneIcon />
                      </IconButton>
                    </Tooltip>
                  </div>}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  <div className={classes.addToCalendar}>
                    <AddToCalendar event={event} buttonLabel="Put on my calendar" />
                  </div>
                  <br /><br />
                </ExpansionPanelActions>
              </ExpansionPanel>
            )
          })
        }
      </List>
    )
  }

  componentDidMount() {
    let { user } = this.state
    CheckUser.isUser();
    if (user) {
      this.getUserMeetings()
      this.getUserRequests()
    }
  }
  componentDidUpdate() {
    CheckUser.isUser();
  }

  render() {
    const { classes } = this.props;
    const { meetings, tab, requests, user } = this.state;
    return (
      <div>
        {user && (
          <div style={{ textAlign: "center" }}>
            <AppBar position='static' color='inherit'>
              <Tabs value={tab} onChange={this.tabChange} indicatorColor="primary" textColor="primary" centered>
                <Tab label="Meetings" />
                <Tab label="Requests" />
              </Tabs>
            </AppBar>
            {tab === 0 && <div>
              {!meetings.length
                ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t set any meeting yet!</Typography>
                : this.renderLists(meetings, false)
              }
            </div>}
            {tab === 1 && <div>
              {!requests.length
                ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t any meeting request yet!</Typography>
                : this.renderLists(requests, true)
              }
            </div>}
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

export default withStyles(styles)(Dashboard);
