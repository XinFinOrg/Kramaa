import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ProjectForm from './ProjectForm';
import ReactTable from "react-table";
import 'react-table/react-table.css';
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      projectForm: '',
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderProjectForm = this.renderProjectForm.bind(this);
    this.projectFormHandler = this.projectFormHandler.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.logout = this.logout.bind(this);
  }

  projectFormHandler(name, industry, subIndustry, tokenName, tokenSymbol) {
    axios.post("/api/dashboard/createProject", {name: name, industry: industry, subIndustry: subIndustry, tokenName: tokenName, tokenSymbol: tokenSymbol, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
      console.log(res.data.status);
      if(res.data.status=="Project created successsfully"){
        this.setState({
          projectList: [...this.state.projectList, res.data.project]
        })
      }
    });
  }

  componentDidMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, projectList: res.data.projects, organization: res.data.organization})
      console.log(res.data.projects[0].uniqueId);
    });
  }

  renderProjectForm() {
    this.setState({'projectForm': <ProjectForm parentHandler= {this.projectFormHandler}/>});
  }

  goToProject(uniqueId) {
    console.log(uniqueId);
    this.props.history.push('/project/'+uniqueId);
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const { email, projectList, projectForm, organization} = this.state;
    const columns = [{
      Header: 'Project ID',
      accessor: 'uniqueId'
    }, {
      Header: 'Project Name',
      accessor: 'name',
    }, {
      Header: 'Industry',
      accessor: 'industry'
    }, {
      Header: 'Sub Industry',
      accessor: 'subIndustry'
    }, {
      Header: 'Token Symbol',
      accessor: 'tokenSymbol'
    },  {
      Header: 'Token Name',
      accessor: 'tokenName'
    }];
    console.log(projectList);
    return(

      <div>
        <div>
        Welcome to Kramaa Dashboard <br/> <br/>
        <button onClick= {this.renderProjectForm}>Create a new project </button> <br/>
        {projectForm}
        Your organization {organization.organizationName} has the following projects: <br/> <br/>
        </div>
        <div>
        <ReactTable
          data={projectList}
          columns={columns}
          onFetchData={this.fetchData}
          noDataText="Not available"
          getTrProps ={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo.index,
                  })
                  this.goToProject(rowInfo.original.uniqueId)
                }
              }
            } else {
              return {}
            }
          }}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard
