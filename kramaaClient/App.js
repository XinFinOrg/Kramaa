import React, { Component} from "react";
import {hot} from "react-hot-loader";
// import { connect } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import './App.scss';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProjectPage from "./ProjectPage";
import Projects from "./Projects";
import Invitation from "./Invitation";
import Layout from "./containers/Layout";
// import DefaultLayout from "./containers/index.js";
// import DefaultHeader from "./containers/DefaultHeader.js";
import { BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/dashboard" component={Layout}/>
            <Route exact path="/profile" component={Layout}/>
            <Route exact path="/projects" component={Layout}/>
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
