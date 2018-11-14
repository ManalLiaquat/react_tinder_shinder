import React from "react";
import { Route, withRouter } from "react-router-dom";
import App from "../../Screens/App";
import Dashboard from "../../Screens/Dashboard";
import CreateProfile from "../../Screens/CreateProfile";
import Meetings from "../../Screens/Meetings";
import Location from "../../Screens/Location";
import DateAndTime from "../../Screens/DateAndTime";
import Profile from "../../Screens/Profile";

const CustomRoutes = (props) => (
  <div>
    <Route path="/" render={(props) => <App {...props} />} />
    <Route path="/profile" render={(props) => <Profile {...props} />} />
    <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
    <Route path="/createProfile" render={(props) => <CreateProfile {...props} />} />
    <Route exact path="/meetings" render={(props) => <Meetings {...props} />} />
    <Route path="/meetings/location" render={(props) => <Location {...props} />} />
    <Route path="/meetings/dateandtime" render={(props) => <DateAndTime {...props} />} />
  </div>
)

export default withRouter(CustomRoutes);