
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as CheckUser from "../Constants/CheckUser";
// import AppBar from "../Components/MaterialUI/AppBar";
import App from "../Components/App";
import Dashboard from "../Components/Dashboard";
import Profile from "../Components/Profile";
import Meetings from "../Components/Meetings";

const CustomRoutes = () => (
  <Router>
    <div>
      <Route path="/" render={(props) => <App {...props} />} />
      {
        CheckUser.User && <div>
          <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
          <Route path="/profile" render={(props) => <Profile {...props} />} />
          <Route path="/meetings" render={(props) => <Meetings {...props} />} />
        </div>
      }
    </div>
  </Router>
);

export default CustomRoutes;