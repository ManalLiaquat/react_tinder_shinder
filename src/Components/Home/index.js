import React, { Component } from "react";
// import firebase from "../../Config/firebase";
// import CardWrapper from "../UserCard";
import GoogleMap from "../GoogleMap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const { user } = this.props;
    console.log(this.props, "****props home.js");

    return (
      <div >
        <h1>Home.js</h1>
      </div>
    );
  }
}

export default Home;
