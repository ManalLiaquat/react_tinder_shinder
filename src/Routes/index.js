
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "../Components/MaterialUI/AppBar";
import * as CheckUser from "../Constants/CheckUser";
import Home from "../Components/Home";


const CustomRoutes = () => (
  <Router>
    <div>
      <Route path="/" render={(props) => <AppBar {...props} user={CheckUser.User} />} />
      <Route path="/home" render={(props) => <Home {...props} user={CheckUser.User} />} />
      {/* <Route path="/profile" component={bbb} /> */}
    </div>
  </Router>
);

export default CustomRoutes;