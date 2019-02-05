import React, { Component, Suspense } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        forgotPassword: '',
        forgotPasswordEmail: '',
        errorMessage: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
      this.onSubmitResetForm = this.onSubmitResetForm.bind(this);
      this.forgotPassword = this.forgotPassword.bind(this);
    }

    loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }
    onSubmitForm(e) {
      e.preventDefault();
      axios.post("/api/users/userLogin", {email: this.state.email, password: this.state.password}).then(res=> {
        let statusMessage = res.data.status;
        console.log(res.data.status, "Direct");
        if(statusMessage=="Yay"){
          sessionStorage.setItem("clientToken", res.data.clientToken);
          this.props.history.push('/dashboard');
        }
        else{
          console.log(statusMessage);
          this.setState({
            errorMessage: <Alert color="danger">
                            {statusMessage}
                          </Alert>
          });
        }
      });
    }

    onSubmitResetForm(e) {
      e.preventDefault();
      axios.post("/api/users/userLogin", {email: this.state.email, password: this.state.password}).then(res=> {
        if(res.data.status=="Yay"){
          sessionStorage.setItem("clientToken", res.data.clientToken);
          this.props.history.push('/dashboard');
        }
      });
    }

    forgotPassword(e) {
      this.setState({
        forgotPassword: 'true'
      })
    }
    render() {
        const { email, password, forgotPassword, forgotPasswordEmail, errorMessage } = this.state;
        let render;
        if(forgotPassword=='true'){
          render =
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                <Form>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="email" placeholder="Email ID" name="forgotPasswordEmail" value= {forgotPasswordEmail} onChange={this.handleChange} autoComplete="email" />
                </InputGroup>
                <Row>
                  <Col xs="6">
                    <Button color="primary" className="px-4" onClick= {this.onSubmitResetForm}>Send Reset Password Link</Button>
                  </Col>
                </Row>
                </Form>
              </CardBody>
            </Card>
          </CardGroup>;
        }
        else{
          render =
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {errorMessage}
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
                        <Button color="link" className="px-0" onClick= {this.forgotPassword}>Forgot password?</Button>
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
            </CardGroup>;
        }
        return (
          <div className="app flex-row align-items-center">
            <Container>
            <Suspense fallback={this.loading()}>
            </Suspense>
              <Row className="justify-content-center">
                <Col md="8">
                {render}
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}

export default Login;
