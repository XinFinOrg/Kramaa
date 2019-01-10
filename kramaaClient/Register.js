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
        userRegistered: '',
        organizationName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: ''
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
      axios.post('/api/users/userOnboarding', {email: this.state.email})
      .then(res => {
        this.setState({otp: res.data.otp})
        console.log("OTP is", this.state.otp);
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
      axios.post('/api/users/userRegistration', {'email': this.state.email, 'name': this.state.name, 'password': this.state.password, 'organizationName': this.state.organizationName, 'addressLine1': this.state.addressLine1, 'addressLine2': this.state.addressLine2, 'addressLine3': this.state.addressLine3})
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
                    <input type="text" name="email" value= {email} onChange={this.handleChange} /> <br/>
                    <button className="btn btn-primary" onClick= {this.onSubmitForm}>Register</button>
            </form>
        </div>;
      } else if(otpVerified==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>OTP</h2>
            <form name="form">
                    <label htmlFor="otp">Please Enter your OTP</label> <br />
                    <input type="text" name="submittedOTP" value= {submittedOTP} onChange={this.handleChange} /> <br/>
                    <button className="btn btn-primary" onClick= {this.onSubmitOTP}>Submit OTP</button>
            </form>
        </div>;
        }
        else if(userRegistered==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>User Details</h2>
            <form name="form">
                    <label htmlFor="name">Please Enter your Name</label>
                    <input type="text" name="name" value= {name} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">Please Enter your Organization Name</label>
                    <input type="text" name="organizationName" value= {this.state.organizationName} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine1</label>
                    <input type="text" name="addressLine1" value= {this.state.addressLine1} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine2</label>
                    <input type="text" name="addressLine2" value= {this.state.addressLine2} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine3</label>
                    <input type="text" name="addressLine3" value= {this.state.addressLine3} onChange={this.handleChange} /><br/>
                    <label htmlFor="password">Please Enter a password</label>
                    <input type="password" name="password" value= {password} onChange={this.handleChange} /><br/>
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
