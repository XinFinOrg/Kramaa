import React, { Component} from "react";
import {hot} from "react-hot-loader";
// import { connect } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default hot(module)(App);
