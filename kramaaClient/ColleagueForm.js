import React, {Component} from "react";
import axios from "axios";
import {Form, FormGroup, FormText, Col, Button, Input} from 'reactstrap';

class ColleagueForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
  }
  onSubmitForm(e) {
    e.preventDefault();
    axios.post("/api/dashboard/inviteColleague", {clientToken: sessionStorage.getItem("clientToken"), inviteEmail: this.state.email}).then(res=> {
      console.log(res.data.status);
      if(res.data.status=="Invitation sent successsfully"){
        this.setState({
          email: ''
        })
      }
    });
  }

  render(){
    const {email} = this.state;
    return(
      <div>
      <Form className="form-horizontal">
        <FormGroup row>
          <Col xs="12" md="9">
            <Input type="email" name="email" value= {email} onChange={this.handleChange}  id="text-input" placeholder="Enter Colleague Email id" />
            <FormText color="muted">Your colleague will be sent an invitation link on his mail.</FormText>
          </Col>
          <Col md="3">
            <Button className="primary" onClick = {this.onSubmitForm}>Invite Colleague</Button>
          </Col>
        </FormGroup>

      </Form>
      </div>
    )
  }
}

export default ColleagueForm;
