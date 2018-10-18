import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Save from '@material-ui/icons/Save'
import firebase from "../../../../Config/firebase";
import * as CheckUser from "../../../../Constants/CheckUser";
import Toast from "../../../../Constants/Toast";

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
    firebase.database().ref(`/user_data/${CheckUser.User.uid}`).set(userData).then(() => {
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
    const props = this.props
    let { userData } = this.state

    for (let key1 in props.step1) {
      if (props.step1[key1]) {
        userData[key1] = props.step1[key1]
      }
    }

    if (props.step2.length === 3) {
      userData.images = props.step2
    }

    for (let key2 in props.step3) {
      if (props.step3[key2].length) {
        userData[key2] = props.step3[key2]
      }
    }

    if (props.step4) {
      userData.location = props.step4
    }

    userData.uid = CheckUser.User.uid

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