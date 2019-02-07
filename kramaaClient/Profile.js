import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ColleagueForm from './ColleagueForm';
import {Col, Card, CardBody, CardHeader, ListGroup, ListGroupItem, Button} from 'reactstrap';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      email: '',
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
    axios.post("/api/dashboard/getUserInfo", {clientToken:  sessionStorage.getItem("clientToken")})
    .then(res => {
      this.setState({
        user: res.data.user
      })
    })

    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, organization: res.data.organization})
      for(let i=0; i<res.data.projects.length; i++){
        this.setState({
          projectList: [...this.state.projectList, res.data.projects[i].name],
        })
      }
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
    const { projectList, colleagueForm, organization, user} = this.state;
    return(
      <div>
        <Col sm="12" xl="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Profile Info</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Organization Name: {organization.organizationName}</ListGroupItem>
                <ListGroupItem>Organization ID: {organization.uniqueId}</ListGroupItem>
                <ListGroupItem>First Name: {user.firstName}</ListGroupItem>
                <ListGroupItem>Last Name: {user.lastName}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Button className="primary" onClick= {this.renderColleagueForm}>Add your colleagues </Button>
        {colleagueForm} <br />
      </div>
    )
  }
}

export default Profile;
