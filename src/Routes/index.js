
import React from "react";
import { Route, withRouter } from "react-router-dom";
import App from "../Components/App";
import Dashboard from "../Components/Dashboard";
import Profile from "../Components/Profile";
import Meetings from "../Components/Meetings";
import Location from "../Components/Location";
import DateAndTime from "../Components/DateAndTime";

const CustomRoutes = (props) => (
  <div>
    <Route path="/" render={(props) => <App {...props} />} />
    <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
    <Route path="/profile" render={(props) => <Profile {...props} />} />
    <Route exact path="/meetings" render={(props) => <Meetings {...props} />} />
    <Route path="/meetings/location" render={(props) => <Location {...props} />} />
    <Route path="/meetings/dateandtime" render={(props) => <DateAndTime {...props} />} />
  </div>
)

export default withRouter(CustomRoutes);