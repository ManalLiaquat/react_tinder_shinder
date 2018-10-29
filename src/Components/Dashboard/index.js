import React, { Component } from "react";
import { Typography, Button, Paper, AppBar, Tabs, Tab, Avatar, List, ListItemText, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as CheckUser from "../../Constants/CheckUser";
import firebase from "../../Config/firebase";
import Add from "@material-ui/icons/Add";
import moment from "moment";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/DoneOutline";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';

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
      requests: [],
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
    firebase.database().ref(`/meetings/${CheckUser.User.uid}`).on('child_added', data => {
      let meetData = data.val()
      meetings.push(meetData)
      console.log(meetData);

      this.setState({ meetings })
    })
  }

  getUserRequests() {
    let { requests } = this.state
    firebase.database().ref(`/requests/${CheckUser.User.uid}`).on('child_added', data => {
      let reqData = data.val()
      requests.push(reqData)
      console.log(reqData);

      this.setState({ requests })
    })
  }

  tabChange(event, tab) {
    this.setState({ tab })
  }

  renderLists(array, showBtn) {
    return (
      <List style={{ width: "90%", margin: "0px auto" }}>
        {
          array.map((item, index) => {
            return (
              <ExpansionPanel key={item.friendProfileObj.uid}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar alt={item.friendProfileObj.nickName} src={item.friendProfileObj.images[0]} />
                  <Typography variant="headline" style={{ marginLeft: "10px" }}>{item.friendProfileObj.displayName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ListItemText primary={`NickName: ${item.friendProfileObj.nickName}`} secondary={`Meeting Time: ${moment(item.dateAndTime).format('LLLL')}`} />
                  <ListItemText primary={`Status: ${item.status}`} secondary={`Location: ${item.placeInfo.name}, ${item.placeInfo.location.address}`} />
                  {showBtn && <div>
                    <IconButton onClick={() => { console.log('Hello Icon') }} color="secondary">
                      <CancelIcon />
                    </IconButton>
                    <IconButton onClick={() => { console.log('Hello Icon') }} style={{ color: green[800] }}>
                      <DoneIcon />
                    </IconButton>
                  </div>}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </List>
    )
  }

  componentDidMount() {
    CheckUser.isUser();
    this.getUserMeetings()
    this.getUserRequests()
  }
  componentDidUpdate() {
    CheckUser.isUser();
  }

  render() {
    const { classes } = this.props;
    const { meetings, tab, requests } = this.state;
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
              : this.renderLists(meetings, false)
            }
          </div>}
          {tab === 1 && <div>
            {!requests.length
              ? <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t done any meeting yet!</Typography>
              : this.renderLists(requests, true)
            }
          </div>}

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
