import React, { Component } from "react";
import { Typography, Button, Paper, AppBar, Tabs, Tab, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as CheckUser from "../../Constants/CheckUser";
import firebase from "../../Config/firebase";
import Add from "@material-ui/icons/Add";
import moment from "moment";

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});
var user = JSON.parse(localStorage.getItem('user'))


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      tab: 0
    };
    this.handleClick = this.handleClick.bind(this)
    this.tabChange = this.tabChange.bind(this)
  }

  handleClick() {
    this.props.history.push('/meetings')
  }

  getUserMeetings() {
    let { meetings } = this.state
    firebase.database().ref(`/meetings/${CheckUser.User.uid}`).once('value', data => {
      let meetData = data.val()
      for (const key in meetData) {
        meetings.push(meetData[key])
      }
      this.setState({ meetings })
    })
  }

  tabChange(event, tab) {
    this.setState({ tab })
  }

  componentDidMount() {
    CheckUser.isUser();
    this.getUserMeetings()
  }
  componentDidUpdate() {
    CheckUser.isUser();
    firebase.messaging().onMessage(payload => {
      console.log("payload", payload)
    })
  }

  render() {
    const { classes } = this.props;
    const { meetings, tab } = this.state;
    return (
      <div >
        <AppBar position='static' color='inherit'>
          <Tabs value={tab} onChange={this.tabChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Meetings" />
            <Tab label="Requests" />
          </Tabs>
        </AppBar>

        {user && <div style={{ textAlign: "center" }}>
          {tab === 0 && <div>
            {!meetings.length
              ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t done any meeting yet!</Typography>
              : <List style={{ width: "90%", margin: "0px auto" }}>
                {
                  meetings.map((item, index) => {
                    return (
                      <ListItem key={item.friendProfileObj.uid}>
                        <Avatar alt={item.friendProfileObj.nickName} src={item.friendProfileObj.images[0]} />
                        <ListItemText primary={item.friendProfileObj.displayName} secondary={`Meeting Time: ${moment(item.dateAndTime).format('LLLL')}`} />
                        <ListItemText primary={`Status: ${item.status}`} secondary={`Location: ${item.placeInfo.name}, ${item.placeInfo.location.address}`} />
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })
                }
              </List>}

          </div>}
          {tab === 1 && <Typography>Item Two</Typography>}

          <Button variant="extendedFab" aria-label="Add" color="primary" size="large" className={classes.fab} onClick={this.handleClick}>
            <Add />
            Set a meeting!
          </Button>
        </div>}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
