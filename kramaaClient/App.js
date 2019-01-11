import React, { Component} from "react";
import {hot} from "react-hot-loader";
// import { connect } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import './App.scss';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProjectPage from "./ProjectPage";
import Invitation from "./Invitation";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
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
            <Route exact path="/layout" component={Layout}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default hot(module)(App);
