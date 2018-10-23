
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../Components/App";
import Dashboard from "../Components/Dashboard";
import Profile from "../Components/Profile";
import Meetings from "../Components/Meetings";
import Location from "../Components/Location";
import DateAndTime from "../Components/DateAndTime";


let user = JSON.parse(localStorage.getItem("user"))
const CustomRoutes = () => (
  <Router>
    <div>
      <Route path="/" render={(props) => <App {...props} />} />
      {
        user && <div>
          <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
          <Route path="/profile" render={(props) => <Profile {...props} />} />
          <Route exact path="/meetings" render={(props) => <Meetings {...props} />} />
          <Route path="/meetings/location" render={(props) => <Location {...props} />} />
          <Route path="/meetings/dateandtime" render={(props) => <DateAndTime {...props} />} />
        </div>
      }
    </div>
  </Router>
);

export default CustomRoutes;