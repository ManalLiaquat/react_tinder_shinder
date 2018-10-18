import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer, List, Divider, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import SigninWithFacebook from "../../SigninWithFacebook";
import SignOut from "../../SignOut";
import img from '../../../Images/bgImage.png'
import * as CheckUser from "../../../Constants/CheckUser";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    width: 60,
    height: 60,
    top: 60,
    left: 10
  },
  drawerText: {
    paddingLeft: '10px',
    // backgroundColor: '#e0f2f111',
    color: "white"
  }
};

class SwipeableTemporaryDrawer extends React.Component {
  constructor() {
    super()
    this.state = {
      left: false,
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  componentDidMount() {
    CheckUser.isUser();
  }

  render() {
    const { classes, user } = this.props;
    // console.log(user, '****user');
    // console.log(this.props, '****props');

    const sideList = (
      <div className={classes.list}>
        <div style={{ width: "100%", height: "200px", backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
          {user && <span>
            <Avatar src={user.photoURL} className={classes.avatar} alt="Profile Picture" />
            <br />
            <br />
            <br />
            <Typography className={classes.drawerText} variant='overline'>{user.displayName}</Typography>
            <Typography className={classes.drawerText} variant='body2'>{user.email}</Typography>
          </span>}
        </div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              {
                user && <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                  <MenuIcon />
                </IconButton>
              }
              <Typography variant="h6" color="inherit" align="left" className={classes.grow}>
                Tinder Shinder
              </Typography>
              {
                !user ? <SigninWithFacebook {...this.props} /> : <SignOut {...this.props} />
              }
            </Toolbar>
          </AppBar>
        </div>

        {
          user && <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </SwipeableDrawer>
        }
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);