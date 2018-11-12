import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Save from '@material-ui/icons/Save'
import firebase from "../../../../Config/firebase";
import Toast from "../../../../Constants/Toast";
import { connect } from "react-redux";
import { updateUser } from "../../../../Config/Redux/Actions/authActions";

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {},
      user: null
    }
    this.submit = this.submit.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.user }
  }

  submit() {
    const { userData, user } = this.state
    firebase.database().ref(`/user_data/${user.uid}`).set(userData).then(() => {
      Toast({
        type: 'success',
        title: "Successfully submitted your profile",
        onClose: () => {
          this.props.closeModal ? this.props.handleClose() : this.props.history.replace('/dashboard')
        }
      })
    })
  }

  componentDidMount() {
    let { step1, step2, step3, step4 } = this.props
    let { userData, user } = this.state

    userData.displayName = user.displayName

    for (let key1 in step1) {
      userData[key1] = step1[key1]
    }

    userData.images = step2

    for (let key2 in step3) {
      userData[key2] = step3[key2]
    }

    userData.location = step4

    userData.uid = user.uid

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

export default connect(mapStateToProps, mapDispatchToProps)(Submit)