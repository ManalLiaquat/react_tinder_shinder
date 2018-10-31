import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Save from '@material-ui/icons/Save'
import firebase from "../../../../Config/firebase";
import Toast from "../../../../Constants/Toast";

var currentUser = JSON.parse(localStorage.getItem("user"))

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    const { userData } = this.state
    firebase.database().ref(`/user_data/${currentUser.uid}`).set(userData).then(() => {
      Toast({
        type: 'success',
        title: "Successfully submitted your profile",
        onClose: () => {
          this.props.history.replace('/dashboard')
        }
      })
    })
  }

  componentDidMount() {
    let { step1, step2, step3, step4 } = this.props
    let { userData } = this.state

    userData.displayName = currentUser.displayName

    for (let key1 in step1) {
      userData[key1] = step1[key1]
    }

    userData.images = step2

    for (let key2 in step3) {
      userData[key2] = step3[key2]
    }

    userData.location = step4

    userData.uid = currentUser.uid

    this.setState({ userData })
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.submit}><Save /> Submit</Button>
      </div>
    )
  }

}

export default Submit