import React, { Component } from "react";
import { Typography, Button, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Modal, IconButton, AppBar, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import TimeIcon from "@material-ui/icons/Timer";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import CloseIcon from '@material-ui/icons/Close';
import { yellow } from "@material-ui/core/colors";

import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";
import { Carousel } from "react-responsive-carousel";
import firebase from "firebase";
import MyMapComponent from "./map";
import Stepper from "../../Components/MaterialUI/Stepper";

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: yellow.A700,
    // color: "black"
  },
  bigAvatar: {
    width: 250,
    height: 250,
    margin: "0px auto",
  },
  paperDiv: {
    width: "250px",
    margin: "10px auto",
  },
  mainGrid: {
    marginBottom: "70px"
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "90%",
    margin: "0px auto",
    overflow: "scroll"
  },
});

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      myProfile: null,
      open: false,
    }
    this.getUserProfile = this.getUserProfile.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.user }
  }

  getUserProfile() {
    let { user } = this.state
    firebase.database().ref(`/user_data/${user.uid}/`).once("value", data => {
      this.setState({
        myProfile: data.val()
      })
    })
  }

  handleOpen() {
    this.setState({ open: true })

  }

  handleClose() {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.getUserProfile()
  }

  render() {
    const { classes } = this.props
    let { myProfile, open } = this.state

    return (
      <div>
        {
          myProfile && (
            <div>
              <Grid container direction="row" justify="center" alignItems="center" className={classes.mainGrid}>
                <Grid item xs={8}>
                  <Paper className={classes.paperDiv}>
                    <Carousel
                      showArrows={false}
                      showStatus={true}
                      showThumbs={false}
                      swipeable={true}
                      emulateTouch={true}
                      autoPlay={true}
                      infiniteLoop={true}
                      showIndicators={false}
                    >
                      {
                        myProfile.images.map(path => (
                          <div>
                            <img src={path} height="300px" alt="userImg" className={classes.bigAvatar} />
                          </div>
                        ))
                      }
                    </Carousel>
                    <Typography variant="h6" color="secondary" align="center">{myProfile.nickName}</Typography>
                    <Typography variant="body1" color="secondary" align="center">{myProfile.phone}</Typography>
                  </Paper>
                  <br />
                  <Divider />
                  <br />
                  <Paper>
                    <List dense
                      component="nav"
                      subheader={<ListSubheader component="div">Duration of Meeting</ListSubheader>}
                    >
                      {
                        myProfile.time.map(duration => {
                          return (
                            <ListItem >
                              <ListItemIcon><TimeIcon /></ListItemIcon>
                              <ListItemText primary={duration} />
                            </ListItem>
                          )
                        })
                      }
                    </List>
                  </Paper>
                  <Paper>
                    <List dense
                      component="nav"
                      subheader={<ListSubheader component="div">Beverages</ListSubheader>}
                    >
                      {
                        myProfile.beverages.map(item => {
                          return (
                            <ListItem >
                              <ListItemIcon><LocalBarIcon /></ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          )
                        })
                      }
                    </List>
                  </Paper>
                  <br />
                  <MyMapComponent
                    coords={myProfile.location}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Grid>
              </Grid>
              <Modal
                aria-labelledby="Notification"
                aria-describedby="Notification popup"
                open={open}
                onClose={this.handleClose}>
                <div className={classes.paper}>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" color="inherit" className={classes.flex}>
                        Edit Profile
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Stepper {...this.props} closeModal={true} handleClose={this.handleClose} />
                </div>
              </Modal>
            </div>
          )
        }
        <Button variant="extendedFab" aria-label="Add" size="large" color="default" className={classes.fab} onClick={this.handleOpen}>
          <EditIcon />
          Edit Profile
        </Button>

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Profile));