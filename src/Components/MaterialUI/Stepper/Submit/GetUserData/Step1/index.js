import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Toast from '../../../../../../Constants/Toast'

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickName: '',
      phone: ''
    }
  }

  componentDidUpdate() {
    const { getNameAndPhone } = this.props
    const { nickName, phone } = this.state
    if (nickName && phone) {
      getNameAndPhone(nickName, phone)
    }
  }

  render() {

    return (
      <div>
        <TextField
          required
          id="standard-required"
          label="Nickname"
          margin="normal"
          onChange={e => { this.setState({ nickName: e.target.value }) }}
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Phone Number"
          type="number"
          value={this.state.phone}
          margin="normal"
          onChange={e => { e.target.value.length < 12 ? this.setState({ phone: e.target.value }) : Toast({ type: 'warning', title: "Digits limit is 11" }) }}
        />
      </div>
    )
  }

}

export default Step1;