import React, {Component} from "react";
import axios from "axios";
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
    });
  }

  render(){
    const {email} = this.state;
    return(
      <div>
      <form name="form">
        <label htmlFor="username">Enter Colleague Email id</label>
        <input type="text" name="email" value= {email} onChange={this.handleChange} />
        <button className="btn btn-primary" onClick = {this.onSubmitForm}>Invite Colleague</button>
      </form>
      </div>
    )
  }
}

export default ColleagueForm;
