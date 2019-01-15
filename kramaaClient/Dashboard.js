import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ProjectForm from './ProjectForm';
import ProjectFormModal from './ProjectFormModal';
import RegisterDeviceModal from './RegisterDeviceModal';
import RegisterThingModal from './RegisterThingModal';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      projectForm: '',
      organization: '',
      deviceCount: '',
      projectCount: '',
      loading: true
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderProjectForm = this.renderProjectForm.bind(this);
    this.renderProjectFormModal = this.renderProjectFormModal.bind(this);
    this.projectFormHandler = this.projectFormHandler.bind(this);
    this.thingFormHandler = this.thingFormHandler.bind(this);
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

  thingFormHandler(name, industry, subIndustry, tokenName, tokenSymbol) {

    // axios.post("/api/dashboard/createThing", {name: name, industry: industry, subIndustry: subIndustry, tokenName: tokenName, tokenSymbol: tokenSymbol, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
    //   console.log(res.data.status);
    //   if(res.data.status=="Project created successsfully"){
    //     this.setState({
    //       projectList: [...this.state.projectList, res.data.project]
    //     })
    //   }
    // });
  }

  componentDidMount() {
    axios.post("/api/dashboard/getCounts", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({
        loading:false,
        organization: res.data.organization,
        deviceCount: res.data.deviceCount,
        projectCount: res.data.projectCount
      })
    });
  }

  renderProjectForm() {
    this.setState({'projectForm': <ProjectForm parentHandler= {this.projectFormHandler}/>});
  }
  renderProjectFormModal() {
    this.setState({'projectForm': <ProjectFormModal parentHandler= {this.projectFormHandler}/>});
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
    const { email, projectList, projectForm, organization, projectCount, deviceCount, loading} = this.state;
    let dashboardRender;
    if(loading){
      dashboardRender=  <Col>
            <div className="sk-double-bounce">
              <div className="sk-child sk-double-bounce1"></div>
              <div className="sk-child sk-double-bounce2"></div>
            </div>
      </Col>
    }
    else{
      dashboardRender= <div>
      <h2>Welcome to Kramaa Dashboard</h2> <br/>
      <h5>Organization: {organization.organizationName} </h5> <br/>
      <h5>Organization ID: {organization.uniqueId} </h5> <br/>
      <Row>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader>
              Project Count
            </CardHeader>
            <CardBody>
              {projectCount}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader>
              Device Count
            </CardHeader>
            <CardBody>
              {deviceCount}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col xs="12" sm="6" md="4">
        <ProjectFormModal parentHandler= {this.projectFormHandler}/>
      </Col>
      <Col xs="12" sm="6" md="4">
        <RegisterDeviceModal parentHandler= {this.projectFormHandler}/>
      </Col>
      <Col xs="12" sm="6" md="4">
          <RegisterThingModal parentHandler= {this.thingFormHandler}/>
      </Col>
      </Row>
      {projectForm}

      </div>;
    }
    return(

      <div>
        {dashboardRender}
      </div>
    )
  }
}

export default Dashboard
