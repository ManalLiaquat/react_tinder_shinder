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
    this.getData = this.getData.bind(this)
  }

  getData() {
    const { getNameAndPhone, handleChangeState } = this.props
    const { nickName, phone } = this.state
    if (nickName) {
      if (phone.length === 11) {
        getNameAndPhone(nickName, phone)
        handleChangeState(1)
      }
    } else {
      handleChangeState(0)
      Toast({
        type: "warning",
        title: "Please fill both fields"
      })
    }
  }

  componentDidUpdate() {
    this.getData()
  }
  componentDidMount() {
    this.getData()
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
          placeholder="Enter 11 digits number"
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