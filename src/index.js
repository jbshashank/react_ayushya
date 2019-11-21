import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import * as firebase from "firebase";
import store from "./store";
import Admin from "layouts/Admin.jsx";
import Login from "./views/Login/LoginPage.jsx";
import PasswordReset from "./views/Login/ResetPasswordPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";
// import PrivateRoutes from "./privateRoutes";
// import PublicRoutes from "./publicRoutes";
import "assets/css/material-dashboard-react.css?v=1.6.0";
// var firebaseConfig = {
//   apiKey: "AIzaSyBkMSRB6zQp1HCBLb34XYuEv0sLxWlYVqs",
//   authDomain: "ayushya-80c68.firebaseapp.com",
//   databaseURL: "https://ayushya-80c68.firebaseio.com",
//   projectId: "ayushya-80c68",
//   storageBucket: "",
//   messagingSenderId: "957929579433",
//   appId: "1:33784723413:android:999fb2a3cc5ac02e"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// require('dotenv').config();
const hist = createBrowserHistory();
// const authentication = () =>
//   JSON.parse(localStorage.getItem('roles')) ? (
//     <Redirect to="/login" />
//   ) : (
//       <PublicRoutes />
//     );
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* <Route path="/login" component={LoginPage} />
        {/* <Route path="" render={authentication} /> */}
        {/* <Route exact path="/account/passwordReset" component={PasswordReset} /> */}
        {/* <ProtectedRoute path="/" component={Admin} /> */} */}
         <Route path="/login" component={Login} />
        <ProtectedRoute path="/" component={Admin} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
