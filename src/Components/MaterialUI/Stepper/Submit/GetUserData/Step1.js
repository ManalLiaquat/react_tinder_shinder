import React, { Component } from "react";
import { TextField } from "@material-ui/core";

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
    getNameAndPhone(nickName, phone)
  }

  render() {

    return (
      <div>
        <TextField
          required
          id="standard-required"
          label="NickName"
          margin="normal"
          onChange={e => { this.setState({ nickName: e.target.value }) }}
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Phone Number"
          type="number"
          margin="normal"
          onChange={e => { this.setState({ phone: e.target.value }) }}
        />
      </div>
    )
  }

}

export default Step1;