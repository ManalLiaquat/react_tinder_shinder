import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    // save data in firebase databases
  }

  render() {
    const { step1 } = this.props
    console.log(step1, "submit.js");
    // console.log(step1);

    return (
      <div>
        <Button onClick={this.submit}>Submit</Button>
      </div>
    )
  }

}

export default Submit