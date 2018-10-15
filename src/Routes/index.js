
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as CheckUser from "../Constants/CheckUser";
import AppBar from "../Components/MaterialUI/AppBar";
import Home from "../Components/Home";
import Profile from "../Components/Profile";


const CustomRoutes = () => (
  <Router>
    <div>
      <Route path="/" render={(props) => <AppBar {...props} user={CheckUser.User} />} />
      <Route path="/home" render={(props) => <Home {...props} user={CheckUser.User} />} />
      <Route path="/profile" render={(props) => <Profile {...props} user={CheckUser.User} />} />
    </div>
  </Router>
);

export default CustomRoutes;