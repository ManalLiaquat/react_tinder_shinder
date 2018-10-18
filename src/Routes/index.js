
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as CheckUser from "../Constants/CheckUser";
import AppBar from "../Components/MaterialUI/AppBar";
import Dashboard from "../Components/Dashboard";
import Profile from "../Components/Profile";
import Meetings from "../Components/Meetings";

const CustomRoutes = () => (
  <Router>
    <div>
      <Route path="/" render={(props) => <AppBar {...props} user={CheckUser.User} />} />
      {
        CheckUser.User && <div>
          <Route path="/dashboard" render={(props) => <Dashboard {...props} user={CheckUser.User} />} />
          <Route path="/profile" render={(props) => <Profile {...props} user={CheckUser.User} />} />
          <Route path="/meetings" render={(props) => <Meetings {...props} user={CheckUser.User} />} />
        </div>
      }
    </div>
  </Router>
);

export default CustomRoutes;