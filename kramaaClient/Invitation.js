import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

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
        addressLine3: ''
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
        const { email, name, password, userRegistered } = this.state;
        let render;
        if(userRegistered==""){
          render = <div className="col-md-6 col-md-offset-3">
            <h2>User Details</h2>
            Hello {email}, Please complete your registration:
            <form name="form">
                    <label htmlFor="name">Please Enter your Name</label>
                    <input type="text" name="name" value= {name} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">Your Organization Name</label>
                    <input readOnly type="text" name="organizationName" value= {this.state.organizationName} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine1</label>
                    <input readOnly type="text" name="addressLine1" value= {this.state.addressLine1} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine2</label>
                    <input readOnly type="text" name="addressLine2" value= {this.state.addressLine2} onChange={this.handleChange} /><br/>
                    <label htmlFor="name">AddressLine3</label>
                    <input readOnly type="text" name="addressLine3" value= {this.state.addressLine3} onChange={this.handleChange} /><br/>
                    <label htmlFor="password">Please Enter a password</label>
                    <input type="password" name="password" value= {password} onChange={this.handleChange} /><br/>
                    <button className="btn btn-primary" onClick= {this.onSubmitUserDetails}>Submit Details</button>
            </form>
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
