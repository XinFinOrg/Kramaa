import React, {Component} from "react";
import axios from "axios";
class ProjectForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      tokenName: '',
      tokenSymbol: '',
      industry: '',
      subIndustry: ''
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
    this.props.parentHandler(this.state.name, this.state.industry, this.state.subIndustry, this.state.tokenName, this.state.tokenSymbol)
  }

  render(){
    const {name, industry, subIndustry, tokenName, tokenSymbol} = this.state;
    return(
      <div>
      <form name="form">
        <label htmlFor="username">Project Name</label>
        <input type="text" name="name" value= {name} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Industry</label>
        <input type="text" name="industry" value= {industry} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Sub Industry</label>
        <input type="text" name="subIndustry" value= {subIndustry} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Token Name</label>
        <input type="text" name="tokenName" value= {tokenName} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Token Symbol</label>
        <input type="text" name="tokenSymbol" value= {tokenSymbol} onChange={this.handleChange} /><br/>
        <button className="btn btn-primary" onClick = {this.onSubmitForm}>Add new Project</button>
      </form>
      </div>
    )
  }
}

export default ProjectForm;
