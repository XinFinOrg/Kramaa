import React, { Component} from "react";
import {hot} from "react-hot-loader";
// import { connect } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProjectPage from "./ProjectPage";
import Invitation from "./Invitation";
import { BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/invitation" component={Invitation}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/profile" component={Profile}/>
            <Route path="/project/:projectID" component={ProjectPage}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

class Homepage extends Component {
  render(){
    return(
      <div>
      <Link to="/login">Proceed to Login</Link> <br/> <br/>
      <Link to="/register">Proceed to Register</Link>
      </div>
    )
  }
}

export default hot(module)(App);
