import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import CustomRoutes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import "./Config/firebase";
import { Provider } from "react-redux";
import { store, persistor } from "./Config/Redux/store";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <CustomRoutes />
      </Router>
    </PersistGate>
  </Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

if (module.hot) {
  module.hot.accept()
}