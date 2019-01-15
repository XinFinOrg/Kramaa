import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ColleagueForm from './ColleagueForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      colleagueForm: '',
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderColleagueForm = this.renderColleagueForm.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, projectList: res.data.projects, organization: res.data.organization})
    });
  }

  renderColleagueForm() {
    this.setState({'colleagueForm': <ColleagueForm/>});
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const { email, projectList, colleagueForm, organization} = this.state;

    let projectRender;
    if(projectList.length>0){
      projectRender = <BootstrapTable data={projectList} striped hover>
          <TableHeaderColumn isKey dataField="name">Project Name </TableHeaderColumn>
          <TableHeaderColumn dataField="tokenName">Token Name </TableHeaderColumn>
          <TableHeaderColumn dataField="tokenSymbol">Token Symbol </TableHeaderColumn>
      </BootstrapTable>;
    }
    else{
      projectRender = <div> No Projects Yet </div>
    }
    return(
      <div>
        Welcome to Kramaa Dashboard <br/> <br/>
        Your organization: {organization.organizationName} <br/>
        <button onClick= {this.renderColleagueForm}>Add your colleagues </button>
        {colleagueForm} <br />
        Your projects: {projectRender} <br/>
      </div>
    )
  }
}

export default Profile;
