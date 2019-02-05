import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class ForgotPassword extends Component {
    constructor(props){
      super(props);
      this.state = {
        password: '',
        repeatPassword: '',
        submitted: '',
        resetId: '',
        errorMessage: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }

    componentDidMount() {
      this.setState({
        resetId: this.props.location.search.split('=')[1]
      })
    }

    onSubmitForm(e) {
      e.preventDefault();
      if(this.state.password == this.state.repeatPassword){
        axios.post('/api/users/resetPassword', {resetId: this.state.resetId, password: this.state.password})
        .then(res => {
          this.setState({
            submitted: 'true'
          })
        })
      }
      else{
        this.setState({
          errorMessage: <Alert color="danger">
                          Both Passwords need to match !!
                        </Alert>
        })
      }
    }

    render() {
        const { password, repeatPassword, submitted, errorMessage } = this.state;
        let render;
        if(submitted==''){
          render = <div>
          <h3>Please enter your new password here:</h3>
          {errorMessage}
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
          <Button color="success" onClick= {this.onSubmitForm} block>Change Password</Button>
            </div>;
        }
        else {
          render = <div>
            <h3>Your Password has been changed Successfully</h3>
              <Link to="/">
                <Button color="primary" className="mt-3" active tabIndex={-1}>Proceed to Login</Button>
              </Link>
            </div>;
        }
        return (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">

                      {render}

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
          </div>

        );
    }
}

export default ForgotPassword;
