import React, {Component, Suspense} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import RegisterDeviceModal from "./RegisterDeviceModal";
import { Col, Button, Card, CardHeader, CardBody, ListGroupItem, ListGroup } from 'reactstrap';

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectID: '',
      projectIndustry: '',
      projectAddress: '',
      totalSupply: '',
      deviceForm: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.mintTokenFormHandler = this.mintTokenFormHandler.bind(this);
    this.deviceModalToggler = React.createRef();
    this.renderDeviceModal = this.renderDeviceModal.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  renderDeviceModal(){
    this.deviceModalToggler.current.toggle();
  }

  mintTokenFormHandler(from, to, tokenURI, deviceURN, projectName) {
    axios.post('/api/projects/mintNewToken', {projectAddress: projectName, tokenIDFrom: from, tokenIDTo: to, tokenURI: tokenURI, projectName: projectName, deviceURN: deviceURN, clientToken: sessionStorage.getItem("clientToken")})
    .then(res => {
      console.log(res);
    })
  }

  componentDidMount() {
    axios.post('/api/projects/getProjectInfo', {'projectID': this.props.match.params.projectID, clientToken: sessionStorage.getItem("clientToken")}).then(res => {
      this.setState({
        projectName: res.data.project.name,
        projectID: res.data.project.uniqueId,
        projectIndustry: res.data.project.industry,
        projectSubIndustry: res.data.project.subIndustry,
        projectAddress: res.data.project.tokenContractAddress,
        totalSupply: res.data.totalSupply
      })
    })
  }
  render(){
    const {projectName, projectID, projectIndustry, projectSubIndustry, projectAddress, deviceForm, totalSupply} = this.state;
    return(
      <div>
      <Suspense fallback={this.loading()}>
        <Link to="/projects"><Button color="primary">Back to Projects</Button></Link><br /><br/>
        <Col sm="12" xl="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Project Name: {projectName}</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Project ID: {projectID}</ListGroupItem>
                <ListGroupItem>Project Address: {projectAddress}</ListGroupItem>
                <ListGroupItem>Total Devices Registered: {totalSupply}</ListGroupItem>
                <ListGroupItem>Project Industry: {projectIndustry}</ListGroupItem>
                <ListGroupItem>Project Sub Industry: {projectSubIndustry}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
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
        <RegisterDeviceModal ref= {this.deviceModalToggler} parentHandler= {this.mintTokenFormHandler}  projectList = {[projectName]} />
        </Col>
      </Suspense>
      </div>
    )
  }
}
export default ProjectPage;
