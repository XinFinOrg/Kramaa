import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const SITEKEY = "6LcSQ5AUAAAAADkqQKiKrkM4_4xScRtChBrSjOwT";

const validationSchema = function (values) {
  return Yup.object().shape({
    firstName: Yup.string()
    .min(2, `First name has to be at least 2 characters`)
    .required('First name is required'),
    lastName: Yup.string()
    .min(1, `Last name has to be at least 1 character`)
    .required('Last name is required'),
    userName: Yup.string()
    .min(5, `Username has to be at least 5 characters`)
    .required('Username is required'),
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
    password: Yup.string()
    .min(6, `Password has to be at least ${6} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required'),
    repeatPassword: Yup.string()
    .oneOf([values.password], 'Passwords must match')
    .required('Password confirmation is required'),
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}


class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        userStatus: '',
        submittedOTP: '',
        otpVerified: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        userRegistered: '',
        organizationName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        errorMessage: '',
        registerButton: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmitOTP = this.onSubmitOTP.bind(this);
      this.onSubmitUserDetails = this.onSubmitUserDetails.bind(this);
    }

    onChange(recaptchaToken) {
      // Here you will get the final recaptchaToken!!!
      console.log(recaptchaToken, "<= your recaptcha token")
      this.setState({
        registerButton: <Button color="success" onClick= {this.onSubmitUserDetails} block>Create Account</Button>
      })
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }
    onSubmitForm(e) {
      e.preventDefault();
      axios.post('/api/users/userOnboarding', {email: this.state.email})
      .then(res => {
        this.setState({userStatus: res.data.status})
      })
    }

    onSubmitOTP(e) {
      e.preventDefault();
      axios.post('/api/users/verifyOTP', {'email': this.state.email, 'otp': this.state.submittedOTP})
      .then(res => {
        if(res.data.status == "true"){
          this.setState({otpVerified: "true"})
        }
      })
    }
    onSubmitUserDetails(e) {
      e.preventDefault();
      if(this.state.password == this.state.repeatPassword){
        axios.post('/api/users/userRegistration', {'email': this.state.email, 'firstName': this.state.firstName, 'lastName': this.state.lastName, 'password': this.state.password, 'organizationName': this.state.organizationName, 'addressLine1': this.state.addressLine1, 'addressLine2': this.state.addressLine2, 'addressLine3': this.state.addressLine3})
        .then(res => {
          if(res.data.status== "New User"){
            this.setState({userRegistered: "true"})
          }
        });
      }
      else {
        this.setState({
          errorMessage: <Alert> Passwords don't match </Alert>
        })
      }
    }

    findFirstError (formName, hasError) {
      const form = document.forms[formName]
      for (let i = 0; i < form.length; i++) {
        if (hasError(form[i].name)) {
          form[i].focus()
          break
        }
      }
    }

    validateForm (errors) {
      this.findFirstError('simpleForm', (fieldName) => {
        return Boolean(errors[fieldName])
      })
    }

    touchAll(setTouched, errors) {
      setTouched({
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
          password: true,
          confirmPassword: true,
          accept: true
        }
      )
      this.validateForm(errors)
    }

    render() {
        const { errorMessage, email, submittedOTP, otpVerified, firstName, lastName, organizationName, addressLine1, addressLine2, addressLine3, password, repeatPassword, userRegistered, registerButton } = this.state;
        let render;
        if(this.state.userStatus==""){
          render = <div>
            <h2>Register</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="email" value= {email} onChange={this.handleChange} placeholder="Enter email" autoComplete="username" />
            </InputGroup>
            <Button color="success" onClick= {this.onSubmitForm} block>Register</Button>
          </Form>
        </div>;
      }
      else if(this.state.userStatus=="User already exists"){
        render = <div>
          <h3>User Has already been Registered to the Kramaa platform</h3>
            <Link to="/">
              <Button color="primary" className="mt-3" active tabIndex={-1}>Proceed to Login</Button>
            </Link>
          </div>;
      }
      else if(otpVerified==""){
          render = <div>
            <h2>OTP</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="submittedOTP" value= {submittedOTP} onChange={this.handleChange} placeholder="Enter  OTP" autoComplete="username" />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button color="primary" className="px-4" onClick= {this.onSubmitOTP}>Submit OTP</Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" className="px-0" onClick= {this.onSubmitForm}>Resend OTP</Button>
              </Col>
            </Row>
          </Form>
        </div>;
        }
        else if(userRegistered==""){
        render =
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      {errorMessage}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="firstName" required value= {firstName} onChange={this.handleChange} placeholder="First Name" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="lastName" required value= {lastName} onChange={this.handleChange} placeholder="Last Name" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-people"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="organizationName" required value= {organizationName} onChange={this.handleChange} placeholder="Organization Name" autoComplete="Organization Name" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine1" required value= {addressLine1} onChange={this.handleChange} placeholder="AddressLine1" autoComplete="AddressLine1" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine2" value= {addressLine2} onChange={this.handleChange} placeholder="AddressLine2" autoComplete="AddressLine2" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine3" value= {addressLine3} onChange={this.handleChange} placeholder="AddressLine3" autoComplete="AddressLine3" />
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
                        <Input type="password" name="password" required value= {password} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" required placeholder="Repeat password" name="repeatPassword" value= {repeatPassword} onChange={this.handleChange} autoComplete="new-password" />
                      </InputGroup>
                      <ReCAPTCHA
                        sitekey={SITEKEY}
                        onChange={this.onChange}
                      />
                      {registerButton}
                    </Form>;
        }
        else {
          render = <div>
            <h3>User Has been Registered Successfully</h3>
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

export default Register;
