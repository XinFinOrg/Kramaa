import React, {Component, Suspense} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ProjectFormModal from './ProjectFormModal';
import RegisterDeviceModal from './RegisterDeviceModal';
import RegisterThingModal from './RegisterThingModal';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
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
      thingCount: '',
      loading: true,
    };

    this.projectFormHandler = this.projectFormHandler.bind(this);
    this.mintTokenFormHandler = this.mintTokenFormHandler.bind(this);
    this.thingFormHandler = this.thingFormHandler.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.projectModalToggler = React.createRef();
    this.deviceModalToggler = React.createRef();
    this.thingModalToggler = React.createRef();
    this.renderProjectModal = this.renderProjectModal.bind(this);
    this.renderDeviceModal = this.renderDeviceModal.bind(this);
    this.renderThingModal = this.renderThingModal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      if(res.data.status==false){
        this.props.history.push('/');
      }
      else{
        for(let i=0; i<res.data.projects.length; i++){
          this.setState({
            projectList: [...this.state.projectList, res.data.projects[i].name],
          })
        }
      }
    });
  }

  renderProjectModal(){
    this.projectModalToggler.current.toggle();
  }

  renderDeviceModal(){
    this.deviceModalToggler.current.toggle();
  }

  renderThingModal(){
    this.thingModalToggler.current.toggle();
  }

  projectFormHandler(name, industry, subIndustry, tokenName, tokenSymbol) {
    axios.post("/api/dashboard/createProject", {name: name, industry: industry, subIndustry: subIndustry, tokenName: tokenName, tokenSymbol: tokenSymbol, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
      if(res.data.status=="Project created successsfully"){
        this.renderProjectModal();
        this.setState({
          projectList: [...this.state.projectList, res.data.project.name],
          projectCount: parseInt(this.state.projectCount)+1
        })
      }
    });
  }

  mintTokenFormHandler(from, to, tokenURI, deviceURN, projectName) {
    this.renderDeviceModal();
    axios.post('/api/projects/mintNewToken', {tokenIDFrom: from, tokenIDTo: to, tokenURI: tokenURI, projectName: projectName, deviceURN: deviceURN, clientToken: sessionStorage.getItem("clientToken")})
    .then(res => {
      this.setState({
        deviceCount: parseInt(this.state.deviceCount)+ parseInt(to) - parseInt(from) +1
      })
    })
  }

  thingFormHandler(thingName, thingDescription, thingAttributes, thingBrand) {
    axios.post("/api/dashboard/createThing", {thingName: thingName, thingDescription: thingDescription, thingAttributes: thingAttributes, thingBrand: thingBrand, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
      if(res.data.status==true){
        this.setState({
          thingCount: parseInt(this.state.thingCount)+1
        })
      }
    });
  }

  componentDidMount() {
    axios.post("/api/dashboard/getCounts", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({
        loading:false,
        organization: res.data.organization,
        deviceCount: res.data.deviceCount,
        projectCount: res.data.projectCount,
        thingCount: res.data.thingsCount
      })
    });
  }

  goToProject(uniqueId) {
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
    const { email, projectList, projectForm, organization, projectCount, deviceCount, thingCount, loading} = this.state;
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
            <CardHeader className="text-center">
              Project Count
            </CardHeader>
            <CardBody className="text-center">
              {projectCount}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader className="text-center">
              Device Count
            </CardHeader>
            <CardBody className="text-center">
              {deviceCount}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader className="text-center">
              Thing Count
            </CardHeader>
            <CardBody className="text-center">
              {thingCount}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col xs="12" sm="6" md="4">
        <Card className="text-white bg-primary text-center">
          <CardBody onClick= {this.renderProjectModal}>
            <blockquote className="card-bodyquote">
              <p>Create new project</p>
              <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
            </blockquote>
          </CardBody>
        </Card>
        <ProjectFormModal ref= {this.projectModalToggler} isClosed= "true" parentHandler= {this.projectFormHandler}/>
      </Col>
      <Col xs="12" sm="6" md="4">
        <Card className="text-white bg-primary text-center">
          <CardBody onClick= {this.renderDeviceModal}>
            <blockquote className="card-bodyquote">
              <p>Add new device</p>
              <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
            </blockquote>
          </CardBody>
        </Card>
        <RegisterDeviceModal ref= {this.deviceModalToggler} parentHandler= {this.mintTokenFormHandler} projectList={projectList}/>
      </Col>
      <Col xs="12" sm="6" md="4">
      <Card className="text-white bg-primary text-center">
        <CardBody onClick= {this.renderThingModal}>
          <blockquote className="card-bodyquote">
            <p>Add new thing</p>
            <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
          </blockquote>
        </CardBody>
      </Card>
          <RegisterThingModal ref= {this.thingModalToggler} parentHandler= {this.thingFormHandler}/>
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
