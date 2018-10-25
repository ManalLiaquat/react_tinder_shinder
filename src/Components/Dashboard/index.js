import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import * as CheckUser from "../../Constants/CheckUser";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push('/meetings')
  }

  getUserMeetings() {
    // firebase.database().ref('')
  }

  componentDidMount() {
    CheckUser.isUser();
  }
  componentDidUpdate() {
    CheckUser.isUser();
  }

  render() {
    // console.group("DASHBOARD")
    // console.log(this.props, "****props");
    // console.groupEnd()

    let user = JSON.parse(localStorage.getItem('user'))
    console.log('dashboard.js', user);

    return (
      <div >
        {user && <div style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ lineHeight: "100px" }}>You haven’t done any meeting yet!</Typography>
          <Button variant="raised" color="primary" onClick={this.handleClick}>Set a meeting!</Button>
        </div>}
      </div>
    );
  }
}

export default Dashboard;
