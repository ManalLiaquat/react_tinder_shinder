
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "../Components/MaterialUI/AppBar";
import * as CheckUser from "../Constants/CheckUser";
import App from "../Components/App";

const CustomRoutes = () => (
  <Router>
    <div>
      <AppBar user={CheckUser.User} />

      <Route exact path="/" component={App} />
      {/* <Route path="/aaa" component={aaa} /> */}
      {/* <Route path="/bbb" component={bbb} /> */}
      {/* <Route path="/ccc" component={ccc} /> */}
    </div>
  </Router>
);

export default CustomRoutes;