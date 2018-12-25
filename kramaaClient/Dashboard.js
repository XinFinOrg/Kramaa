import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log("Session", sessionStorage.getItem("clientToken"));
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, projectList: res.data.projects})
    });
  }

  render(){
    const { email, projectList} = this.state;
    let projectRender;
    if(projectList.length>0){
      projectRender = <div> projectList </div>;
    }
    else{
      projectRender = <div> You have No Projects Yet </div>
    }
    return(
      <div>
        Hello {email} <br/> <br/>
        Welcome to Kramaa Dashboard <br/> <br/>
        {projectRender}
        Create a new project
      </div>
    )
  }
}

export default Dashboard;
