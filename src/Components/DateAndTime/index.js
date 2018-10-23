import React, { Component } from "react";

class DateAndTime extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.log(this.props.location, 'date and time');

    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default DateAndTime