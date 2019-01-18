import React, { Component} from "react";
import {hot} from "react-hot-loader";
// import { connect } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import './App.scss';
import Invitation from "./Invitation";
import Layout from "./containers/Layout";
import '@coreui/icons/css/coreui-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css'

import { BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/dashboard" component={Layout}/>
            <Route path="/newProject" component={Layout}/>
            <Route exact path="/profile" component={Layout}/>
            <Route exact path="/settings" component={Layout}/>
            <Route exact path="/projects" component={Layout}/>
            <Route exact path="/devices" component={Layout}/>
            <Route exact path="/things" component={Layout}/>
            <Route exact path="/thing/:thingID" component={Layout}/>
            <Route exact path="/project/:projectID" component={Layout}/>
            <Route exact path="/invitation" component={Invitation}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default hot(module)(App);
