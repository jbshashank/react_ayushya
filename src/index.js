import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Provider} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";
import './index.css';
import * as firebase from "firebase";
import store from "./store";
import Admin from "layouts/Admin.jsx";
import Login from "./views/Login/LoginPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";

import "assets/css/material-dashboard-react.css?v=1.6.0";
var config = {
    apiKey: 'AIzaSyDmpq3QDVYiBQmX8tQlgSA0fzyEazPdhHc',
    authDomain: 'authentication-2bea4.firebaseapp.com',
    databaseURL: 'https://authentication-2bea4.firebaseio.com',
    projectId: 'authentication-2bea4',
    storageBucket: 'authentication-2bea4.appspot.com',
    messagingSenderId: '407633924465'
  };
   firebase.initializeApp(config)
require('dotenv').config();
const hist = createBrowserHistory();
ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/" component={Admin}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
