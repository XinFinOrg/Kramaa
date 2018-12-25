import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        otp: '',
        submittedOTP: '',
        otpVerified: '',
        name: '',
        password: '',
        userRegistered: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
      this.onSubmitOTP = this.onSubmitOTP.bind(this);
      this.onSubmitUserDetails = this.onSubmitUserDetails.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }
    onSubmitForm(e) {
      e.preventDefault();
      console.log("Submitted");
      fetch('/api/users/userOnboarding')
      .then(res => res.json())
      .then(response => {
        this.setState({otp: response.otp})
        console.log("OTP is", this.state.otp);
      })
    }

    onSubmitOTP(e) {
      e.preventDefault();
      if(this.state.otp == this.state.submittedOTP){
        this.setState({otpVerified: "true"})
      }
    }
    onSubmitUserDetails(e) {
      e.preventDefault();
      axios.post('/api/users/userRegistration', {'email': this.state.email, 'name': this.state.name, 'password': this.state.password})
      .then(res => {
        if(res.data.status== "New User"){
          this.setState({userRegistered: "true"})
        }
      });
    }
    render() {
        const { email, submittedOTP, otpVerified, name, password, userRegistered } = this.state;
        let render;
        if(this.state.otp==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
            <form name="form">
                    <label htmlFor="email">Enter your email</label>
                    <input type="text" name="email" value= {email} onChange={this.handleChange} />
                    <button className="btn btn-primary" onClick= {this.onSubmitForm}>Register</button>
            </form>
        </div>;
      } else if(otpVerified==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>OTP</h2>
            <form name="form">
                    <label htmlFor="otp">Please Enter your OTP</label>
                    <input type="text" name="submittedOTP" value= {submittedOTP} onChange={this.handleChange} />
                    <button className="btn btn-primary" onClick= {this.onSubmitOTP}>Submit OTP</button>
            </form>
        </div>;
        }
        else if(userRegistered==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>User Details</h2>
            <form name="form">
                    <label htmlFor="name">Please Enter your Organization Name</label>
                    <input type="text" name="name" value= {name} onChange={this.handleChange} />
                    <label htmlFor="password">Please Enter a password</label>
                    <input type="password" name="password" value= {password} onChange={this.handleChange} />
                    <button className="btn btn-primary" onClick= {this.onSubmitUserDetails}>Submit Details</button>
            </form>
        </div>;
        }
        else {
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

export default Register;
