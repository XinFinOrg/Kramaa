import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
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
      axios.post("/api/users/userLogin", {email: this.state.email, password: this.state.password}).then(res=> {
        if(res.data.status=="Yay"){
          sessionStorage.setItem("clientToken", res.data.clientToken);
          this.props.history.push('/dashboard');
        }
      });
    }
    render() {
        const { email, password } = this.state;
        return (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="email" placeholder="Email ID" name="email" value= {email} onChange={this.handleChange} autoComplete="email" />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" name="password" onChange={this.handleChange} autoComplete="current-password" />
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button color="primary" className="px-4" onClick= {this.onSubmitForm}>Login</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                      <CardBody className="text-center">
                        <div>
                          <h2>Sign up</h2> <br/>
                          <p>Access the platform by registering your organization.</p>
                          <Link to="/register">
                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}

export default Login;
