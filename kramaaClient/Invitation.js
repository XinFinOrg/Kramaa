import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Invitation extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        name: '',
        password: '',
        userRegistered: '',
        organizationName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        repeatPassword: ''
      };

      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.onSubmitUserDetails = this.onSubmitUserDetails.bind(this);
    }

    componentDidMount() {
      let urlParams = new URLSearchParams(this.props.location.search);
      const inviteEmail = urlParams.get('inviteEmail');
      if(inviteEmail){
        this.setState({'email': inviteEmail});
        axios.post('/api/users/invitedUserInfo', {'email': inviteEmail})
        .then(res => {
          console.log(res);
          this.setState({
            organizationName : res.data.organizationName,
            addressLine1: res.data.addressLine1,
            addressLine2: res.data.addressLine2,
            addressLine3: res.data.addressLine3,
          })
        });
      }
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }

    onSubmitUserDetails(e) {
      e.preventDefault();
      axios.post('/api/users/inviteUserRegistration', {'email': this.state.email, name: this.state.name, 'password': this.state.password})
      .then(res => {
        if(res.data.status== "User registered"){
          this.setState({userRegistered: "true"})
        }
      });
    }
    render() {
        const { email, name, password, userRegistered, repeatPassword } = this.state;
        let render;
        if(userRegistered==""){
          render = <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                      Hello {email}, Please complete your registration:
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name" value= {name} onChange={this.handleChange} placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="organizationName" value= {this.state.organizationName} onChange={this.handleChange} placeholder="Organization Name" autoComplete="Organization Name" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine1" value= {this.state.addressLine1} onChange={this.handleChange} placeholder="AddressLine1" autoComplete="AddressLine1" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine2" value= {this.state.addressLine2} onChange={this.handleChange} placeholder="AddressLine2" autoComplete="AddressLine2" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine3" value= {this.state.addressLine3} onChange={this.handleChange} placeholder="AddressLine3" autoComplete="AddressLine3" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" readOnly name="email" value= {email} placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" value= {password} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" name="repeatPassword" value= {repeatPassword} onChange={this.handleChange} autoComplete="new-password" />
                      </InputGroup>
                      <Button color="success" onClick= {this.onSubmitUserDetails} block>Create Account</Button>
                    </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
        </div>;
        } else {
          render = <div className="col-md-6 col-md-offset-3">
            <h2>User Has been Registered Successfully</h2>
             <Link to="/login">Proceed to Login</Link>
            </div>;
        }
        return (
          <div>
            {render}
          </div>

        );
    }
}

export default Invitation;
