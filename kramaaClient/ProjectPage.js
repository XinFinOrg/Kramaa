import React, {Component} from "react";
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
    this.renderNewDeviceForm = this.renderNewDeviceForm.bind(this);
    this.mintTokenFormHandler = this.mintTokenFormHandler.bind(this);
  }

  mintTokenFormHandler(from, to, tokenURI, deviceURN) {
    axios.post('/api/projects/mintNewToken', {projectAddress: this.state.projectAddress, tokenIDFrom: from, tokenIDTo: to, tokenURI: tokenURI, deviceURN: deviceURN, clientToken: sessionStorage.getItem("clientToken")})
    .then(res => {
      console.log(res);
    })
  }

  renderNewDeviceForm() {
    this.setState({'deviceForm': <MintTokenForm parentHandler = {this.mintTokenFormHandler} totalSupply= {parseInt(this.state.totalSupply)+1}/>});
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
          <RegisterDeviceModal parentHandler= {this.mintTokenFormHandler} totalSupply= {parseInt(this.state.totalSupply)+1} projectName = {projectName}/>
        </Col>
      </div>
    )
  }
}
export default ProjectPage;
